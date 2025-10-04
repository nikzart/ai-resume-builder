import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { CVDocument } from "@/lib/cv-generator";

export async function POST(request: NextRequest) {
  try {
    const { cvData, template = "classic" } = await request.json();

    if (!cvData) {
      return NextResponse.json(
        { error: "No CV data provided" },
        { status: 400 }
      );
    }

    // Generate PDF from CV data using React.createElement with template
    const doc = React.createElement(CVDocument, { data: cvData, template }) as any;
    const stream = await renderToStream(doc);

    // Convert stream to buffer
    const chunks: any[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Return PDF as response
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
