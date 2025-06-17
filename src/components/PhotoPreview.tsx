
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, FileImage } from "lucide-react";

interface PhotoWithDescription {
  file: File;
  description: string;
  preview: string;
}

interface PhotoPreviewProps {
  photo: PhotoWithDescription;
  index: number;
  onRemove: (index: number) => void;
  onDescriptionChange: (index: number, description: string) => void;
  isLoading: boolean;
}

const PhotoPreview = ({ 
  photo, 
  index, 
  onRemove, 
  onDescriptionChange, 
  isLoading 
}: PhotoPreviewProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img
            src={photo.preview}
            alt={`Preview ${index + 1}`}
            className="w-full h-32 object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 w-6 h-6 p-0"
            disabled={isLoading}
          >
            <X className="w-3 h-3" />
          </Button>
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            <FileImage className="w-3 h-3 inline mr-1" />
            {photo.file.name}
          </div>
        </div>
        <Textarea
          placeholder="Opis zdjęcia..."
          value={photo.description}
          onChange={(e) => onDescriptionChange(index, e.target.value)}
          disabled={isLoading}
          className="resize-none h-20 bg-background/50"
        />
      </CardContent>
    </Card>
  );
};

export default PhotoPreview;
