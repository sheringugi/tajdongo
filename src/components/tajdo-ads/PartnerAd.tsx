import { useLanguage } from "@/i18n/LanguageContext";

interface PartnerAdProps {
  logoUrl?: string;
  brandName: string;
  description: string;
  ctaText?: string;
  ctaUrl: string;
  variant?: 'leaderboard' | 'card';
}

export default function PartnerAd({
  logoUrl,
  brandName,
  description,
  ctaText,
  ctaUrl,
  variant = 'leaderboard'
}: PartnerAdProps) {
  const { t } = useLanguage();

  // Vertical Magazine Card Style
  if (variant === 'card') {
    return (
      <div className="w-full bg-[#FDF8F2] border border-[#DDD5C8] rounded-sm overflow-hidden flex flex-col group h-full">
        <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden aspect-[4/3] bg-[#EDE5D8]">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-[#9A8878] uppercase tracking-widest">{t.ads.logo}</div>
          )}
        </a>
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-[10px] tracking-[0.12em] uppercase text-[#9A8878] mb-2 font-sans">{t.ads.sponsored}</p>
          <h3 className="text-xl text-[#3D2F2A] font-serif mb-3 leading-tight">{brandName}</h3>
          <p className="text-sm text-[#7A6A5A] font-serif leading-relaxed mb-6 flex-grow">{description}</p>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.12em] uppercase text-[#3D2F2A] border-b border-[#3D2F2A] w-fit pb-1 hover:text-[#8B6240] hover:border-[#8B6240] transition-all">
            {ctaText || t.ads.learnMore} →
          </a>
        </div>
      </div>
    );
  }

  // Original Horizontal Leaderboard Style
  return (
    <div className="w-full border border-[#DDD5C8] rounded-sm bg-[#FDF8F2] flex items-center justify-between px-6 py-4 gap-4 min-h-[90px]">
      {/* Left: Logo + Text */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Logo */}
        <a 
          href={ctaUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-14 h-14 rounded-sm bg-[#EDE5D8] border border-[#DDD5C8] flex items-center justify-center flex-shrink-0 overflow-hidden hover:opacity-80 transition-opacity"
        >
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-[10px] text-[#9A8878] uppercase tracking-widest">{t.ads.logo}</span>
          )}
        </a>

        {/* Text */}
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.12em] uppercase text-[#9A8878] mb-0.5 font-sans">
            {t.ads.sponsored}
          </p>
          <p className="text-base text-[#3D2F2A] font-serif truncate mb-0.5">
            {brandName}
          </p>
          <p className="text-[13px] text-[#7A6A5A] font-serif truncate">
            {description}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <a
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 text-[11px] tracking-[0.12em] uppercase text-[#3D2F2A] border border-[#3D2F2A] px-5 py-2.5 hover:bg-[#3D2F2A] hover:text-[#F5F0E8] transition-colors duration-200 font-sans"
      >
        {ctaText || t.ads.learnMore} →
      </a>
    </div>
  );
}