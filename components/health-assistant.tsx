"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Upload } from "lucide-react";
import { HealthForm } from "@/components/health-form";
import { HealthResults } from "@/components/health-results";
import { FileUpload } from "@/components/file-upload";
import { analyzeHealthWithGemini, UserHealthData } from "@/lib/gemini";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type HealthAssessment = {
  diabetesRisk: number;
  hypertensionRisk: number;
  depressionRisk: number;
  recommendations: string[];
  explanation: string;
};

export function HealthAssistant() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSubmit = async (data: UserHealthData) => {
    try {
      setIsProcessing(true);
      const results = await analyzeHealthWithGemini({
        ...data,
        medicalDocuments: uploadedFiles
      });
      setAssessment(results);
      setShowResults(true);
    } catch (error) {
      console.error("Error processing health data:", error);
      toast({
        title: "Error",
        description: "There was a problem analyzing your health data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (files: string[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    toast({
      title: "Files uploaded",
      description: `Successfully uploaded ${files.length} medical document(s)`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">AI Health Assessment</h1>
        <p className="text-muted-foreground">
          Get personalized health insights by providing your symptoms and medical information.
          Our AI will analyze your data and provide risk assessments for common conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Health Assessment</CardTitle>
              <CardDescription>
                Fill out the form below or upload medical documents for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="form" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="form">Manual Entry</TabsTrigger>
                  <TabsTrigger value="upload">Document Upload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="form">
                  <HealthForm onSubmit={handleSubmit} isLoading={isProcessing} />
                </TabsContent>
                
                <TabsContent value="upload">
                  <div className="space-y-4">
                    <FileUpload onUpload={handleFileUpload} />
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Uploaded Documents</h4>
                        <ul className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {file}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5 lg:col-span-4">
          <AnimatePresence>
            {showResults && assessment && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <HealthResults assessment={assessment} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {!showResults && (
            <Card className="h-[600px] flex items-center justify-center text-center">
              <CardContent>
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your Health Assessment</h3>
                <p className="text-muted-foreground">
                  Complete the form or upload medical documents to receive a personalized health assessment powered by AI.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}