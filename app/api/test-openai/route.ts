import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      hasApiKey: !!process.env.AZURE_OPENAI_API_KEY,
      hasEndpoint: !!process.env.AZURE_OPENAI_ENDPOINT,
      deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION,
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    };

    console.log("Environment check:", envCheck);

    // Try to create client and make a simple call
    const client = new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "o4-mini"}`,
      defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION || "2025-01-01-preview" },
      defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
    });

    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "o4-mini",
      messages: [{ role: "user", content: "Say 'Hello, this is a test!'" }],
      max_tokens: 50,
    });

    return NextResponse.json({
      success: true,
      envCheck,
      response: response.choices[0]?.message?.content,
    });
  } catch (error: any) {
    console.error("Test endpoint error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      status: error.status,
      details: error.response?.data || error.toString(),
    }, { status: 500 });
  }
}
