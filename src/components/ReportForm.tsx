
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReportForm } from "@/hooks/useReportForm";
import { getFormTitle, getPlaceholder } from "@/utils/reportFormUtils";
import PhotoUpload from "./PhotoUpload";
import PhotoPreview from "./PhotoPreview";

interface ReportFormProps {
  type: "vehicle" | "trailer" | "forklift" | "damage";
}

const ReportForm = ({ type }: ReportFormProps) => {
  const { t } = useLanguage();
  const {
    number,
    setNumber,
    photos,
    setPhotos,
    isLoading,
    removePhoto,
    updateDescription,
    handleSubmit
  } = useReportForm({ type });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Number Input */}
      <div className="space-y-2">
        <Label htmlFor="number">
          {type === "damage" ? t('report.damage.description') : t(`report.${type}.number`)}
        </Label>
        <Input
          id="number"
          type="text"
          placeholder={getPlaceholder(type)}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          disabled={isLoading}
          className="bg-background/50"
        />
      </div>

      {/* Photo Upload */}
      <PhotoUpload
        photos={photos}
        onPhotosChange={setPhotos}
        isLoading={isLoading}
      />

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo, index) => (
            <PhotoPreview
              key={index}
              photo={photo}
              index={index}
              onRemove={removePhoto}
              onDescriptionChange={updateDescription}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full animate-pulse-green"
        disabled={isLoading || photos.length === 0}
      >
        {isLoading ? (
          t('report.sending')
        ) : (
          <>
            <Check className="w-4 h-4 mr-2" />
            {t('report.submit')}
          </>
        )}
      </Button>
    </form>
  );
};

export default ReportForm;
