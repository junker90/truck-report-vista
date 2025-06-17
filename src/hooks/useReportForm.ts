
import { useState } from "react";
import { toast } from "sonner";
import { getTypeLabel } from "@/utils/reportFormUtils";

interface PhotoWithDescription {
  file: File;
  description: string;
  preview: string;
}

interface UseReportFormProps {
  type: "vehicle" | "trailer" | "forklift" | "damage";
}

export const useReportForm = ({ type }: UseReportFormProps) => {
  const [number, setNumber] = useState("");
  const [photos, setPhotos] = useState<PhotoWithDescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    
    if (!number.trim()) {
      toast.error("Wprowadź numer " + getTypeLabel(type));
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

  return {
    number,
    setNumber,
    photos,
    setPhotos,
    isLoading,
    removePhoto,
    updateDescription,
    handleSubmit
  };
};
