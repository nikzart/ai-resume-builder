"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Upload, File, X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type UploadStep =
  | "idle"
  | "uploading"
  | "parsing"
  | "extracting"
  | "structuring"
  | "finalizing"
  | "complete";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  currentStep?: UploadStep;
  progress?: number;
}

const stepMessages = {
  idle: { text: "Ready to upload", emoji: "📄" },
  uploading: { text: "Uploading your CV", emoji: "🚀" },
  parsing: { text: "Reading your document", emoji: "📖" },
  extracting: { text: "Extracting your information", emoji: "🔍" },
  structuring: { text: "Organizing your data", emoji: "🧩" },
  finalizing: { text: "Polishing everything up", emoji: "✨" },
  complete: { text: "All done!", emoji: "🎉" },
};

export default function FileUploader({ onFileUpload, currentStep = "idle", progress = 0 }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isProcessing = currentStep !== "idle" && currentStep !== "complete";

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];
    return validTypes.includes(file.type);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed transition-all duration-300 ${
              dragActive
                ? "border-primary bg-primary/5 scale-105"
                : "border-gray-300 hover:border-primary/50"
            }`}
          >
            <div className="p-12 text-center">
              <motion.div
                animate={{
                  y: dragActive ? -10 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  Drop your CV here, or browse
                </h3>

                <p className="text-sm text-gray-500 mb-6">
                  Supports PDF, DOCX, DOC, and TXT files
                </p>

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleChange}
                />

                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </label>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <File className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              {!isProcessing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            {isProcessing ? (
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Step indicator */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center py-2"
                >
                  <motion.span
                    className="text-3xl mr-3"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    {stepMessages[currentStep].emoji}
                  </motion.span>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">
                      {stepMessages[currentStep].text}
                    </span>
                    <span className="text-xs text-gray-500">{Math.round(progress)}% complete</span>
                  </div>
                </motion.div>

                {/* Fun loading dots */}
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  File ready to upload
                </div>
                <Button onClick={handleUpload} className="w-full" size="lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Process CV
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
