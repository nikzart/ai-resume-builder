"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, MessageSquare, FileText, Sparkles, Zap, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-16 h-16 text-primary" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes in minutes. Upload your existing CV or chat with our AI assistant to build one from scratch.
          </p>
        </motion.div>

        {/* Main Action Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
        >
          <motion.div variants={fadeIn}>
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Upload Your CV</CardTitle>
                <CardDescription className="text-base">
                  Already have a resume? Upload it and let our AI optimize it for ATS systems.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Supports PDF, DOCX, and TXT formats
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    AI-powered content extraction
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Instant ATS optimization
                  </li>
                </ul>
                <Button
                  onClick={() => router.push("/upload")}
                  className="w-full group-hover:scale-105 transition-transform"
                  size="lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CV
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Chat with AI</CardTitle>
                <CardDescription className="text-base">
                  Start from scratch? Our AI assistant will guide you through creating your perfect resume.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Conversational CV building
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Guided step-by-step process
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    AI-powered suggestions
                  </li>
                </ul>
                <Button
                  onClick={() => router.push("/chat")}
                  className="w-full group-hover:scale-105 transition-transform"
                  size="lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our AI Resume Builder?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-lg bg-white shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">
                Generate professional resumes in minutes, not hours
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-lg bg-white shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">ATS-Friendly</h3>
              <p className="text-sm text-gray-600">
                Optimized to pass Applicant Tracking Systems
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-lg bg-white shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">
                Smart suggestions and content optimization
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
