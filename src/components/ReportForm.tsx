import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, FileImage, Check } from "lucide-react";
import { toast } from "sonner";

interface ReportFormProps {
  type: "vehicle" | "trailer" | "forklift" | "damage";
}

interface PhotoWithDescription {
  file: File;
  description: string;
  preview: string;
}

const ReportForm = ({ type }: ReportFormProps) => {
  const [number, setNumber] = useState("");
  const [photos, setPhotos] = useState<PhotoWithDescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotos(prev => [...prev, {
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

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const updateDescription = (index: number, description: string) => {
    setPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, description } : photo
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const getTypeLabel = () => {
      switch (type) {
        case "vehicle": return "pojazdu";
        case "trailer": return "naczepy";
        case "forklift": return "wózka widłowego";
        case "damage": return "szkody";
        default: return "elementu";
      }
    };
    
    if (!number.trim()) {
      toast.error("Wprowadź numer " + getTypeLabel());
      return;
    }

    if (photos.length === 0) {
      toast.error("Dodaj co najmniej jedno zdjęcie");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock successful submission
    const reports = JSON.parse(localStorage.getItem('truck_reports') || '[]');
    const newReport = {
      id: Date.now(),
      type,
      number,
      photos: photos.map(p => ({
        name: p.file.name,
        description: p.description,
        preview: p.preview
      })),
      createdAt: new Date().toISOString(),
      driverId: localStorage.getItem('driver_id')
    };
    
    reports.unshift(newReport);
    localStorage.setItem('truck_reports', JSON.stringify(reports));

    toast.success("Raport wysłany pomyślnie!", {
      description: `${photos.length} zdjęć zostało przesłanych`
    });

    // Reset form
    setNumber("");
    setPhotos([]);
    setIsLoading(false);
  };

  const getFormTitle = () => {
    switch (type) {
      case "vehicle": return "pojazdu";
      case "trailer": return "naczepy";
      case "forklift": return "wózka widłowego";
      case "damage": return "szkody";
      default: return "elementu";
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case "vehicle": return "Wprowadź numer pojazdu";
      case "trailer": return "Wprowadź numer naczepy";
      case "forklift": return "Wprowadź numer wózka widłowego";
      case "damage": return "Wprowadź opis szkody";
      default: return "Wprowadź numer";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Number Input */}
      <div className="space-y-2">
        <Label htmlFor="number">
          {type === "damage" ? "Opis szkody" : `Numer ${getFormTitle()}`}
        </Label>
        <Input
          id="number"
          type="text"
          placeholder={getPlaceholder()}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          disabled={isLoading}
          className="bg-background/50"
        />
      </div>

      {/* Photo Upload */}
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

        {/* Photo Previews */}
        {photos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <Card key={index} className="overflow-hidden">
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
                      onClick={() => removePhoto(index)}
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
                    onChange={(e) => updateDescription(index, e.target.value)}
                    disabled={isLoading}
                    className="resize-none h-20 bg-background/50"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full animate-pulse-green"
        disabled={isLoading || photos.length === 0}
      >
        {isLoading ? (
          "Wysyłanie..."
        ) : (
          <>
            <Check className="w-4 h-4 mr-2" />
            Wyślij raport
          </>
        )}
      </Button>
    </form>
  );
};

export default ReportForm;
