
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { FileSpreadsheet, Upload, XCircle } from "lucide-react";

interface FileUploadProps {
  onFileUploaded: (file: File) => void;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUploaded,
  isLoading = false,
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (file && !isLoading) {
      const timer = setTimeout(() => {
        if (uploadProgress < 100) {
          setUploadProgress((prev) => Math.min(prev + 10, 100));
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [uploadProgress, file, isLoading]);

  React.useEffect(() => {
    if (uploadProgress === 100 && file) {
      onFileUploaded(file);
    }
  }, [uploadProgress, file, onFileUploaded]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    
    const selectedFile = fileList[0];
    
    // Check if file is Excel or Google Sheets
    const validExts = ['.xlsx', '.xls', '.csv', '.gsheet'];
    const fileExt = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExts.includes(fileExt)) {
      toast({
        title: "Неподдерживаемый формат файла",
        description: "Пожалуйста, загрузите файл Excel или Google Sheets",
        variant: "destructive"
      });
      return;
    }
    
    setFile(selectedFile);
    setUploadProgress(10); // Start progress
  };

  const resetFileUpload = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card
      className={`border-2 border-dashed p-8 text-center ${
        dragActive ? "border-primary bg-accent/50" : "border-muted"
      } ${isLoading ? "opacity-70 pointer-events-none" : ""}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      {!file ? (
        <>
          <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium">Загрузите финансовые данные</h3>
          <p className="text-sm text-muted-foreground mt-2 mb-6">
            Перетащите файл Excel или Google Sheets сюда, или нажмите на кнопку ниже
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".xlsx,.xls,.csv,.gsheet"
            onChange={handleFileInput}
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="mx-auto"
          >
            <Upload className="h-4 w-4 mr-2" />
            Выбрать файл
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <FileSpreadsheet className="h-8 w-8 mr-3 text-primary" />
            <div className="text-left">
              <p className="font-medium truncate max-w-[200px]">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            {!isLoading && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={resetFileUpload}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Прогресс</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
          
          {isLoading && (
            <p className="text-sm text-muted-foreground animate-pulse-light">
              Анализ данных...
            </p>
          )}
        </div>
      )}
    </Card>
  );
};
