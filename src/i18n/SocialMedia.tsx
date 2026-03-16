import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const SocialMedia = () => {
  const { t } = useLanguage();

  const instagramUrl = "https://www.instagram.com/_tajdo_";
  const tiktokUrl = "https://www.tiktok.com/@tajdo_ngo";

  // A curated list of Instagram post IDs to display.
  const instagramPostIds = [
    "DT2vIZMjEFt",
    "DV3M4-qiPLE",
    "DS7YlIsiM55",
    "DPvWgM2CLoo",
    "DPjuJHCiEAK",
    "DV2_CMWjVLe",
  ];

  return (
    <section className="section-padding py-24 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-section mb-4">{t.projects.socialMedia.title}</h2>
          <p className="body-text mb-12">{t.projects.socialMedia.subtitle}</p>
        </div>

        {/* Social Media Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPostIds.map((postId, index) => (
            <motion.div
              key={postId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="rounded-lg overflow-hidden"
            >
              <iframe
                src={`https://www.instagram.com/p/${postId}/embed`}
                className="w-full h-[540px] border-0"
                scrolling="no"
                allowTransparency
                title={`Instagram post ${postId}`}
              ></iframe>
            </motion.div>
          ))}
        </div>

        {/* "View More" and "Follow Us" links */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {t.projects.socialMedia.viewMore}
          </a>
          {/* <div className="flex items-center gap-4">
            <p className="body-text font-medium">{t.projects.socialMedia.followUs}:</p>
            <div className="flex gap-4">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">
                TikTok
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;