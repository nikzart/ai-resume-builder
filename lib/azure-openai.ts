import OpenAI from "openai";

if (!process.env.AZURE_OPENAI_API_KEY) {
  throw new Error("AZURE_OPENAI_API_KEY is not set");
}

if (!process.env.AZURE_OPENAI_ENDPOINT) {
  throw new Error("AZURE_OPENAI_ENDPOINT is not set");
}

export const openaiClient = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "o4-mini"}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION || "2025-01-01-preview" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
});

export const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "o4-mini";

export async function extractCVData(text: string) {
  const tools = [
    {
      type: "function" as const,
      function: {
        name: "extract_cv_data",
        description: "Extract structured CV data from resume text",
        parameters: {
          type: "object",
          properties: {
            personalInfo: {
              type: "object",
              properties: {
                fullName: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                location: { type: "string" },
                linkedin: { type: "string" },
                portfolio: { type: "string" },
                github: { type: "string" },
              },
              required: ["fullName", "email", "phone", "location"],
            },
            summary: { type: "string" },
            experience: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  company: { type: "string" },
                  position: { type: "string" },
                  location: { type: "string" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                  current: { type: "boolean" },
                  description: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
            education: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  institution: { type: "string" },
                  degree: { type: "string" },
                  field: { type: "string" },
                  location: { type: "string" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                  gpa: { type: "string" },
                },
              },
            },
            skills: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  category: { type: "string" },
                  items: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  description: { type: "string" },
                  technologies: {
                    type: "array",
                    items: { type: "string" },
                  },
                  link: { type: "string" },
                },
              },
            },
            certificates: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  issuer: { type: "string" },
                  date: { type: "string" },
                  link: { type: "string" },
                },
              },
            },
          },
          required: ["personalInfo", "experience", "education", "skills"],
        },
      },
    },
  ];

  const response = await openaiClient.chat.completions.create({
    model: deploymentName,
    messages: [
      {
        role: "system",
        content: "You are an expert CV parser. Extract all relevant information from the resume text and structure it according to the provided schema. Generate unique IDs for each item.",
      },
      {
        role: "user",
        content: `Parse the following resume and extract all information:\n\n${text}`,
      },
    ],
    tools,
    tool_choice: { type: "function", function: { name: "extract_cv_data" } },
  });

  const toolCall = response.choices[0]?.message?.tool_calls?.[0];
  if (toolCall && 'function' in toolCall && toolCall.function.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }

  throw new Error("Failed to extract CV data");
}

export async function chatWithAssistant(messages: Array<{ role: string; content: string }>, systemPrompt: string) {
  try {
    const response = await openaiClient.chat.completions.create({
      model: deploymentName,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages as any,
      ],
    });

    return response.choices[0]?.message?.content || "";
  } catch (error: any) {
    console.error("Azure OpenAI Error:", error);
    console.error("Error code:", error?.code);
    console.error("Error message:", error?.message);
    console.error("Error response:", error?.response?.data);
    throw error;
  }
}

export async function extractCVDataFromConversation(messages: Array<{ role: string; content: string }>) {
  const tools = [
    {
      type: "function" as const,
      function: {
        name: "extract_cv_from_conversation",
        description: "Extract structured CV data from conversation history",
        parameters: {
          type: "object",
          properties: {
            personalInfo: {
              type: "object",
              properties: {
                fullName: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                location: { type: "string" },
                linkedin: { type: "string" },
                portfolio: { type: "string" },
                github: { type: "string" },
              },
              required: ["fullName", "email", "phone", "location"],
            },
            summary: { type: "string" },
            experience: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  company: { type: "string" },
                  position: { type: "string" },
                  location: { type: "string" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                  current: { type: "boolean" },
                  description: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
            education: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  institution: { type: "string" },
                  degree: { type: "string" },
                  field: { type: "string" },
                  location: { type: "string" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                  gpa: { type: "string" },
                },
              },
            },
            skills: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  category: { type: "string" },
                  items: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  description: { type: "string" },
                  technologies: {
                    type: "array",
                    items: { type: "string" },
                  },
                  link: { type: "string" },
                },
              },
            },
            certificates: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  issuer: { type: "string" },
                  date: { type: "string" },
                  link: { type: "string" },
                },
              },
            },
          },
          required: ["personalInfo", "experience", "education", "skills"],
        },
      },
    },
  ];

  const conversationText = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n\n");

  const response = await openaiClient.chat.completions.create({
    model: deploymentName,
    messages: [
      {
        role: "system",
        content: `You are an expert at extracting structured CV data from conversational text. Analyze the conversation and extract all CV information. Generate unique IDs for each item. Use "Month Year" format for dates. For current positions, set current: true and endDate: "Present".`,
      },
      {
        role: "user",
        content: `Extract all CV information from this conversation:\n\n${conversationText}`,
      },
    ],
    tools,
    tool_choice: { type: "function", function: { name: "extract_cv_from_conversation" } },
  });

  const toolCall = response.choices[0]?.message?.tool_calls?.[0];
  if (toolCall && 'function' in toolCall && toolCall.function.arguments) {
    return JSON.parse(toolCall.function.arguments);
  }

  throw new Error("Failed to extract CV data from conversation");
}
