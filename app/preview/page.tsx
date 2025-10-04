"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Loader2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import CVPreview from "@/components/CVPreview";
import CVEditDialog from "@/components/CVEditDialog";
import { useRouter } from "next/navigation";
import { CVData } from "@/types/cv";
import { toast } from "sonner";

export default function PreviewPage() {
  const router = useRouter();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<"classic" | "modern" | "minimal">("classic");

  useEffect(() => {
    // Load CV data from localStorage
    const storedData = localStorage.getItem("cvData");
    if (storedData) {
      try {
        setCvData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing CV data:", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const handleSave = (updatedData: CVData) => {
    setCvData(updatedData);
    localStorage.setItem("cvData", JSON.stringify(updatedData));
  };

  const handleDownload = async () => {
    if (!cvData) return;

    setIsDownloading(true);

    // Show loading toast
    const loadingToast = toast.loading("Generating your PDF...", {
      description: "This may take a few seconds. Please wait.",
    });

    try {
      const response = await fetch("/api/generate-screenshot-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cvData, template: selectedTemplate }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Resume downloaded successfully!", {
        description: "Your PDF has been saved to your downloads folder.",
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error("Failed to download PDF", {
        description: error instanceof Error ? error.message : "Please try again or contact support if the issue persists.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              size="lg"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Resume Preview
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your ATS-friendly resume. Download it when you&apos;re ready!
          </p>
        </motion.div>

        {/* Template Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white shadow-sm">
            <button
              onClick={() => setSelectedTemplate("classic")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                selectedTemplate === "classic"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => setSelectedTemplate("modern")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                selectedTemplate === "modern"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Modern
            </button>
            <button
              onClick={() => setSelectedTemplate("minimal")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                selectedTemplate === "minimal"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Minimal
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <CVPreview data={cvData} template={selectedTemplate} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-2">✅ Your resume is ready!</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Formatted for Applicant Tracking Systems (ATS)</li>
              <li>• Clean, professional layout</li>
              <li>• Optimized for readability</li>
              <li>• Ready to download as PDF</li>
            </ul>
          </div>
        </motion.div>

        {/* Edit Dialog */}
        <CVEditDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          cvData={cvData}
          onSave={handleSave}
        />
      </div>
    </main>
  );
}
