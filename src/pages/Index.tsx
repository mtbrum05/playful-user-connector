import { useState } from "react";
import { Upload, File } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload only PNG or PDF files");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size should be less than 5MB");
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      toast.success("File uploaded successfully!");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      toast.success("File uploaded successfully!");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Upload your PNG or PDF document (max 5MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".png,.pdf"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {file ? (
                  <File className="w-12 h-12 text-blue-500" />
                ) : (
                  <Upload className="w-12 h-12 text-gray-400" />
                )}
                <div className="mt-2 text-sm text-gray-600">
                  {file ? (
                    <span className="text-blue-500">{file.name}</span>
                  ) : (
                    <span>
                      Drag and drop your file here, or{" "}
                      <span className="text-blue-500">browse</span>
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Supported formats: PNG, PDF
                </div>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;