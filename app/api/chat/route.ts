import { NextRequest, NextResponse } from "next/server";
import { chatWithAssistant, extractCVDataFromConversation } from "@/lib/azure-openai";
import { CV_BUILDER_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { messages, extractData } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // If extractData flag is set, extract CV data from conversation
    if (extractData) {
      const cvData = await extractCVDataFromConversation(messages);
      return NextResponse.json({
        message: "CV data extracted successfully",
        complete: true,
        cvData,
      });
    }

    // Get AI response
    const response = await chatWithAssistant(messages, CV_BUILDER_SYSTEM_PROMPT);

    // Check if the conversation is complete
    const isComplete = response.toLowerCase().includes("generate your professional resume") ||
                      response.toLowerCase().includes("generate your resume") ||
                      response.toLowerCase().includes("let me generate");

    return NextResponse.json({
      message: response,
      complete: isComplete,
      cvData: null,
    });
  } catch (error: any) {
    console.error("Error in chat:", error);
    console.error("Error details:", error?.message, error?.stack);
    return NextResponse.json(
      { error: "Failed to process chat message", details: error?.message },
      { status: 500 }
    );
  }
}
