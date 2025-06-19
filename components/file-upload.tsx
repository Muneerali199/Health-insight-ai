"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onUpload: (files: string[]) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const simulateUpload = async (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Faster upload simulation
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setUploadProgress(i);
    }

    const fileNames = Array.from(files).map(file => file.name);
    onUpload(fileNames);
    
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      await simulateUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await simulateUpload(e.target.files);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? 'border-primary bg-primary/5' : 'border-border'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />
      
      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
      
      <h3 className="text-lg font-semibold mb-2">
        Upload Medical Documents
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4">
        Drop files here or click to upload
      </p>
      
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        Select Files
      </Button>
      
      {isUploading && (
        <div className="mt-4">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}
      
      <div className="mt-4 text-sm text-muted-foreground">
        Supported: PDF, JPG, PNG, DOC
      </div>
    </div>
  );
}