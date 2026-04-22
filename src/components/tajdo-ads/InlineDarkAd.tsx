import { useLanguage } from "@/i18n/LanguageContext";

interface InlineDarkAdProps {
  imageUrl?: string;
  brandName: string;
  tagline: string;
  description: string;
  ctaText?: string;
  ctaUrl: string;
}

export default function InlineDarkAd({
  imageUrl,
  brandName,
  tagline,
  description,
  ctaText,
  ctaUrl,
}: InlineDarkAdProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-[#3D2F2A] rounded-sm flex items-center justify-between px-8 py-6 gap-6">
      {/* Left: Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#9A8878] mb-1.5 font-sans">
          {t.ads.spotlight}
        </p>
        <p className="text-xl text-[#F5F0E8] font-serif mb-1.5">
          {brandName}
        </p>
        <p className="text-sm text-[#BDB0A4] font-serif leading-relaxed">
          {description}
        </p>
      </div>

      {/* Right: Image + CTA */}
      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        {/* Ad Image */}
        <div className="w-24 h-16 bg-[#4E3D35] border border-[#5E4D45] rounded-sm overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={brandName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[9px] text-[#9A8878] uppercase tracking-wider">Image</span>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.12em] uppercase text-[#F5F0E8] border border-[#F5F0E8] px-4 py-2 hover:bg-[#F5F0E8] hover:text-[#3D2F2A] transition-colors duration-200 font-sans whitespace-nowrap"
        >
          {ctaText || t.ads.visitSite} →
        </a>
      </div>
    </div>
  );
}