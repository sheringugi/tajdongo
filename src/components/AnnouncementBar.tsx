import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const AnnouncementBar = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-announcement-bg text-announcement-fg py-2.5 text-center">
      <a
        href="https://www.tajdo.shop"
        target="_blank"
        rel="noopener noreferrer"
        className="label-caps text-[10px] inline-flex items-center gap-2 text-announcement-fg hover:opacity-80 transition-opacity"
      >
        {t.announcement}
        <ArrowRight className="w-3 h-3" />
      </a>
    </div>
  );
};

export default AnnouncementBar;
