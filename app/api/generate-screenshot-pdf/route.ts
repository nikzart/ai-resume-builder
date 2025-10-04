import { NextRequest, NextResponse } from "next/server";
import { browserPool } from "@/lib/browser-pool";

// Simple in-memory cache for PDFs (5-minute TTL)
interface CacheEntry {
  pdf: Buffer;
  timestamp: number;
}

const pdfCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(cvData: any, template: string): string {
  return JSON.stringify({ cvData, template });
}

function getCachedPDF(key: string): Buffer | null {
  const entry = pdfCache.get(key);
  if (!entry) return null;

  // Check if cache is still valid
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    pdfCache.delete(key);
    return null;
  }

  return entry.pdf;
}

function cachePDF(key: string, pdf: Buffer): void {
  pdfCache.set(key, {
    pdf,
    timestamp: Date.now(),
  });

  // Clean up old cache entries (simple cleanup)
  if (pdfCache.size > 50) {
    const oldestKey = Array.from(pdfCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
    pdfCache.delete(oldestKey);
  }
}

export async function POST(request: NextRequest) {
  let page = null;

  try {
    const { cvData, template = "classic" } = await request.json();

    // Check cache first
    const cacheKey = getCacheKey(cvData, template);
    const cachedPDF = getCachedPDF(cacheKey);

    if (cachedPDF) {
      console.log("Returning cached PDF");
      return new NextResponse(new Uint8Array(cachedPDF), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="resume-${template}.pdf"`,
        },
      });
    }

    // Get browser from pool
    const browser = await browserPool.getBrowser();
    page = await browser.newPage();

    // Enable JavaScript
    await page.setJavaScriptEnabled(true);

    // Set viewport for A4 size at high DPI
    await page.setViewport({
      width: 794,  // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      deviceScaleFactor: 3, // Higher resolution for crisp text
    });

    // Determine the base URL (use localhost for dev, actual host for production)
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    console.log(`Navigating to: ${baseUrl}/pdf-preview`);

    // First navigate to the page
    await page.goto(`${baseUrl}/pdf-preview?template=${template}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Then inject the CV data directly into the page
    await page.evaluate((data) => {
      // Store data in window object for the React component to access
      (window as any).__cvData = data;
      // Dispatch custom event to notify component
      window.dispatchEvent(new CustomEvent('cvDataReady', { detail: data }));
    }, cvData);

    // Wait for the pdf-ready signal (ensures React has finished rendering)
    console.log("Waiting for #pdf-ready selector...");

    try {
      await page.waitForSelector('#pdf-ready', {
        timeout: 10000, // 10 second timeout for rendering
      });
      console.log("✓ #pdf-ready found - page is ready");
    } catch (error) {
      // If selector not found, log page content for debugging
      console.error("Failed to find #pdf-ready selector");
      const pageContent = await page.content();
      console.log("Page HTML (first 1000 chars):", pageContent.substring(0, 1000));
      throw error;
    }

    // Small additional delay to ensure all CSS/fonts are loaded
    await new Promise(resolve => setTimeout(resolve, 200));

    // Generate PDF with high quality settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    // Close the page (but keep browser alive in pool)
    await page.close();
    page = null;

    // Convert to Buffer and cache
    const pdfBufferNode = Buffer.from(pdfBuffer);
    cachePDF(cacheKey, pdfBufferNode);

    // Return PDF
    return new NextResponse(new Uint8Array(pdfBufferNode), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume-${template}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    // Clean up page if it exists
    if (page) {
      try {
        await page.close();
      } catch (closeError) {
        console.error("Error closing page:", closeError);
      }
    }

    // Return detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: errorMessage,
        hint: "Make sure the application is running and accessible"
      },
      { status: 500 }
    );
  }
}
