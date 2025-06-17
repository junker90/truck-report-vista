
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface PhotoWithDescription {
  file: File;
  description: string;
  preview: string;
}

interface PhotoUploadProps {
  photos: PhotoWithDescription[];
  onPhotosChange: (photos: PhotoWithDescription[]) => void;
  isLoading: boolean;
}

const PhotoUpload = ({ photos, onPhotosChange, isLoading }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onPhotosChange([...photos, {
            file,
            description: "",
            preview: e.target?.result as string
          }]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Zdjęcia</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Dodaj zdjęcia
        </Button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {photos.length === 0 && (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-2">
            Nie wybrano żadnych zdjęć
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            Wybierz zdjęcia
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
