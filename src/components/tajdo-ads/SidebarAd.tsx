import { useLanguage } from "@/i18n/LanguageContext";

interface SidebarAdProps {
  imageUrl?: string;
  brandName: string;
  tagline: string;
  ctaText?: string;
  ctaUrl: string;
}

export default function SidebarAd({
  imageUrl,
  brandName,
  tagline,
  ctaText,
  ctaUrl,
}: SidebarAdProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-[#FDF8F2] border border-[#DDD5C8] rounded-sm overflow-hidden">
      {/* Image */}
      <div className="w-full h-36 bg-[#EDE5D8] flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={brandName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[11px] text-[#9A8878] uppercase tracking-widest font-sans">
            Ad Image
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[10px] tracking-[0.12em] uppercase text-[#9A8878] mb-1 font-sans">
          {t.ads.sponsored}
        </p>
        <p className="text-[15px] text-[#3D2F2A] font-serif mb-1.5">
          {brandName}
        </p>
        <p className="text-xs text-[#7A6A5A] font-serif leading-relaxed mb-4">
          {tagline}
        </p>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[10px] tracking-[0.12em] uppercase text-[#3D2F2A] border border-[#3D2F2A] px-4 py-2 hover:bg-[#3D2F2A] hover:text-[#F5F0E8] transition-colors duration-200 font-sans"
        >
          {ctaText || t.ads.learnMore} →
        </a>
      </div>
    </div>
  );
}