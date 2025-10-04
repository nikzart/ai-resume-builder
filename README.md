# AI Resume Builder

A modern, AI-powered web application for creating professional, ATS-friendly resumes. Built with Next.js 14, TypeScript, Tailwind CSS, and Azure OpenAI.

## Features

- 🤖 **AI-Powered**: Uses Azure OpenAI (o4-mini) for intelligent CV parsing and conversational resume building
- 📄 **Multiple Input Methods**: Upload existing CV (PDF, DOCX, TXT) or chat with AI to build from scratch
- ✨ **Modern UI/UX**: Beautiful, minimalistic design with smooth animations powered by Framer Motion
- 📋 **ATS-Friendly**: Generates resumes optimized for Applicant Tracking Systems
- 🎨 **Professional Templates**: Clean, modern resume layouts
- 💬 **Conversational AI**: Guided step-by-step resume creation through natural conversation
- 📥 **Instant Download**: Generate and download professional PDFs

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Framer Motion
- **AI**: Azure OpenAI (o4-mini deployment)
- **PDF Generation**: @react-pdf/renderer
- **File Parsing**: pdf-parse, mammoth
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Azure OpenAI API access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```env
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_ENDPOINT=https://xandar.cognitiveservices.azure.com
AZURE_OPENAI_DEPLOYMENT_NAME=o4-mini
AZURE_OPENAI_API_VERSION=2025-01-01-preview
AZURE_OPENAI_EMBEDDING_DEPLOYMENT=text-embedding-3-large
AZURE_OPENAI_EMBEDDING_API_VERSION=2023-05-15
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── chat/          # Chatbot API endpoint
│   │   ├── upload/        # CV upload handler
│   │   └── generate/      # PDF generation
│   ├── chat/              # Chat interface page
│   ├── upload/            # Upload flow page
│   ├── preview/           # CV preview & download
│   ├── layout.tsx
│   ├── page.tsx           # Landing page
│   └── globals.css
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── ChatInterface.tsx  # Chat component
│   ├── FileUploader.tsx   # File upload component
│   └── CVPreview.tsx      # Resume preview component
├── lib/
│   ├── azure-openai.ts    # OpenAI client & functions
│   ├── cv-parser.ts       # File parsing utilities
│   ├── cv-generator.tsx   # PDF generation template
│   └── utils.ts           # Utility functions
├── types/
│   └── cv.ts              # TypeScript interfaces
└── public/
    └── templates/         # Resume templates
```

## Usage

### Upload Existing CV

1. Click "Upload CV" on the homepage
2. Drag and drop or browse for your resume file (PDF, DOCX, or TXT)
3. AI will extract and structure your information
4. Preview and download your optimized resume

### Chat with AI

1. Click "Chat with AI" on the homepage
2. Answer the AI assistant's questions about your:
   - Personal information
   - Professional experience
   - Education
   - Skills
   - Projects and certifications
3. Preview and download your generated resume

## API Endpoints

- `POST /api/upload` - Upload and parse CV files
- `POST /api/chat` - Chat with AI assistant
- `POST /api/generate` - Generate PDF from CV data

## Features in Detail

### AI-Powered CV Parsing

Uses Azure OpenAI function calling to extract structured data from uploaded resumes:
- Personal information (name, contact details, links)
- Work experience with dates and descriptions
- Education history
- Skills categorization
- Projects and certifications

### Conversational Resume Building

AI assistant guides users through creating a resume:
- Natural, friendly conversation flow
- Contextual follow-up questions
- Helps articulate experiences effectively
- Provides suggestions for improvement

### ATS Optimization

Generated resumes are optimized for Applicant Tracking Systems:
- Clean, parseable formatting
- Proper section headers
- Standard date formats
- No complex graphics or tables that confuse ATS

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## License

MIT

## Support

For issues or questions, please open an issue on the GitHub repository.
