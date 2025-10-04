"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUploader, { UploadStep } from "@/components/FileUploader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UploadPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<UploadStep>("idle");
  const [progress, setProgress] = useState(0);

  const simulateProgress = (step: UploadStep, duration: number, startProgress: number, endProgress: number) => {
    return new Promise<void>((resolve) => {
      setCurrentStep(step);
      const steps = 20;
      const increment = (endProgress - startProgress) / steps;
      let current = startProgress;

      const interval = setInterval(() => {
        current += increment;
        if (current >= endProgress) {
          setProgress(endProgress);
          clearInterval(interval);
          resolve();
        } else {
          setProgress(current);
        }
      }, duration / steps);
    });
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Step 1: Uploading (0-20%)
      await simulateProgress("uploading", 800, 0, 20);

      const formData = new FormData();
      formData.append("file", file);

      // Step 2: Parsing (20-40%)
      const parsePromise = simulateProgress("parsing", 1200, 20, 40);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      await parsePromise;

      if (!response.ok) {
        throw new Error("Failed to process file");
      }

      // Step 3: Extracting (40-70%)
      await simulateProgress("extracting", 1500, 40, 70);

      const data = await response.json();

      // Step 4: Structuring (70-90%)
      await simulateProgress("structuring", 1000, 70, 90);

      // Step 5: Finalizing (90-100%)
      await simulateProgress("finalizing", 500, 90, 100);

      // Store CV data in localStorage
      localStorage.setItem("cvData", JSON.stringify(data.cvData));

      // Step 6: Complete
      setCurrentStep("complete");

      // Navigate after a brief moment to show completion
      setTimeout(() => {
        router.push("/preview");
      }, 800);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to process your CV", {
        description: "Please try again or use a different file format.",
      });
      setCurrentStep("idle");
      setProgress(0);
    }
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Upload Your CV
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your existing resume and let our AI optimize it for ATS systems and modern job applications.
          </p>
        </motion.div>

        <FileUploader onFileUpload={handleFileUpload} currentStep={currentStep} progress={progress} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 What happens next?</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Our AI will extract and analyze your CV content</li>
              <li>• We&apos;ll structure it into an ATS-friendly format</li>
              <li>• You&apos;ll be able to review and edit before downloading</li>
              <li>• Choose from multiple professional templates</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
