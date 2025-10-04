import { extractText } from "unpdf";
import mammoth from "mammoth";

export async function parseFile(file: File): Promise<string> {
  const fileType = file.type;
  const arrayBuffer = await file.arrayBuffer();

  try {
    if (fileType === "application/pdf") {
      // Use unpdf to extract text from PDF - it expects Uint8Array
      const uint8Array = new Uint8Array(arrayBuffer);
      const result = await extractText(uint8Array);

      // unpdf returns an object with text property, but text might be an array or object
      // Extract and join all text content
      let extractedText = "";
      if (typeof result.text === "string") {
        extractedText = result.text;
      } else if (Array.isArray(result.text)) {
        extractedText = result.text.join(" ");
      } else if (result.text && typeof result.text === "object") {
        // If it's an object, try to extract text from pages
        extractedText = JSON.stringify(result.text);
      }

      return extractedText || "";
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      // mammoth needs a Buffer
      const buffer = Buffer.from(arrayBuffer);
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else if (fileType === "text/plain") {
      // Convert to string for text files
      const buffer = Buffer.from(arrayBuffer);
      return buffer.toString("utf-8");
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    console.error("Error parsing file:", error);
    throw new Error("Failed to parse file");
  }
}
