"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CVPreview from "@/components/CVPreview";
import { CVData } from "@/types/cv";

function PDFPreviewContent() {
  const searchParams = useSearchParams();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [template, setTemplate] = useState<"classic" | "modern" | "minimal">("classic");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get template from URL params
    const templateParam = searchParams.get("template") as "classic" | "modern" | "minimal";

    console.log("PDF Preview - template:", templateParam);

    if (templateParam) {
      setTemplate(templateParam);
    }

    // Check if CV data was injected by Puppeteer
    if ((window as any).__cvData) {
      console.log("PDF Preview - Using injected CV data from Puppeteer");
      setCvData((window as any).__cvData);
      return;
    }

    // Otherwise, try to get from URL params (for direct browser access)
    const dataParam = searchParams.get("data");
    console.log("PDF Preview - dataParam length:", dataParam?.length || 0);

    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        console.log("PDF Preview - Successfully parsed CV data from URL");
        setCvData(decodedData);
      } catch (error) {
        console.error("Error parsing CV data:", error);
        setError(`Failed to parse CV data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      console.log("PDF Preview - Waiting for CV data injection...");
    }

    // Listen for data injection from Puppeteer
    const handleDataReady = (event: any) => {
      console.log("PDF Preview - Received cvDataReady event");
      setCvData(event.detail);
    };

    window.addEventListener('cvDataReady', handleDataReady);

    return () => {
      window.removeEventListener('cvDataReady', handleDataReady);
    };
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-red-600">
          <p className="font-bold">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
        {/* Still add pdf-ready so Puppeteer doesn't hang */}
        <div id="pdf-ready" style={{ display: 'none' }} aria-hidden="true">Error</div>
      </div>
    );
  }

  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-600">Loading CV data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-0">
      <style jsx global>{`
        /* Ensure proper PDF rendering */
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Prevent page breaks inside sections */
          .mb-6, .mb-8 {
            page-break-inside: avoid;
          }

          /* Remove shadows for PDF */
          .shadow-lg {
            box-shadow: none !important;
          }
        }

        /* Remove shadows and adjust for clean PDF output */
        body {
          margin: 0;
          padding: 0;
          background: white;
        }

        /* Override card shadows */
        .shadow-lg {
          box-shadow: none !important;
        }
      `}</style>

      <CVPreview data={cvData} template={template} />

      {/* Signal to Puppeteer that rendering is complete */}
      <div id="pdf-ready" style={{ display: 'none' }} aria-hidden="true">Ready</div>
    </div>
  );
}

export default function PDFPreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <PDFPreviewContent />
    </Suspense>
  );
}
