import { NextRequest, NextResponse } from "next/server";
import { parseFile } from "@/lib/cv-parser";
import { extractCVData } from "@/lib/azure-openai";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Parse the file to extract text
    const text = await parseFile(file);

    console.log("Extracted text type:", typeof text);
    console.log("Extracted text length:", text?.length);

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from file" },
        { status: 400 }
      );
    }

    // Use Azure OpenAI to extract structured CV data
    const cvData = await extractCVData(text);

    return NextResponse.json({
      success: true,
      cvData,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
