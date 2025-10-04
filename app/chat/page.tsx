"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/ChatInterface";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();

  const handleComplete = (cvData: any) => {
    // Store CV data and navigate to preview
    localStorage.setItem("cvData", JSON.stringify(cvData));
    router.push("/preview");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Chat with AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let&apos;s build your professional resume together. I&apos;ll guide you through each step.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ChatInterface onComplete={handleComplete} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-2">💬 Tips for a great conversation:</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Be specific about your achievements and responsibilities</li>
              <li>• Include quantifiable results when possible (e.g., &quot;increased sales by 30%&quot;)</li>
              <li>• Take your time - you can always edit later</li>
              <li>• The AI will ask follow-up questions to help you elaborate</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
