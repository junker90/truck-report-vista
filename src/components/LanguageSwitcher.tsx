import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      {language === 'pl' ? 'EN' : 'PL'}
    </Button>
  );
};

export default LanguageSwitcher;