import { ArrowRight } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-announcement-bg text-announcement-fg py-2.5 text-center">
      <a
        href="https://tadjo-frontend-draft.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="label-caps text-[10px] inline-flex items-center gap-2 text-announcement-fg hover:opacity-80 transition-opacity"
      >
        Every purchase on our online store supports the rescue and rehabilitation of street dogs in Zanzibar
        <ArrowRight className="w-3 h-3" />
      </a>
    </div>
  );
};

export default AnnouncementBar;
