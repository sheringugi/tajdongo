import { motion } from "framer-motion";
import { Heart, Eye, BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import ImpactNumbers from "@/components/ImpactNumbers";
import { useLanguage } from "@/i18n/LanguageContext";
import { IMG_RESCUE, IMG_TAJANA, IMG_NATURE } from "@/lib/images";
import { default as IMG_VISION } from "@/assets/tajdo-vision.jpeg";
import { PartnerAd } from "@/components/tajdo-ads";
import { default as IMG_COMMUNITY } from "@/assets/tajdo-community.jpeg";
import { default as IMG_SHELTER} from "@/assets/tajdo-shelter.jpeg";

import { default as IMG_EDUCATION } from "@/assets/tajdo-education.jpeg";





const icons = [Heart, Eye, BookOpen];
// const images = [IMG_RESCUE, IMG_TAJANA, IMG_NATURE];
const images = [IMG_SHELTER, IMG_VISION, IMG_EDUCATION, IMG_COMMUNITY];
const Mission = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const activeSection = location.state?.activeSection;
    if (activeSection !== undefined && sectionRefs.current[activeSection]) {
      setTimeout(() => {
        sectionRefs.current[activeSection]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // slight delay to let page render first
    }
  }, [location.state]);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="heading-display mb-6">{t.mission.title}</h1>
            <p className="body-text max-w-2xl mx-auto text-lg">{t.mission.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission sections */}
      {t.mission.sections.map((section, index) => {
        const Icon = icons[index];
        const isThirdPillar = index === 2;
        
        return (
          <>
          {/* Inject Ad between Pillar 2 and 3 */}
          {isThirdPillar && (
            <section className="section-padding py-12">
              <div className="max-w-6xl mx-auto">
                <PartnerAd
                  brandName={t.partners.welfare.brand}
                  description={t.partners.welfare.description}
                  ctaUrl={t.partners.welfare.url}
                  logoUrl={IMG_NATURE}
                />
              </div>
            </section>
          )}
          
          <section
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`section-padding py-24 ${index % 2 === 1 ? "bg-secondary" : ""}`}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={index % 2 === 1 ? "order-2 lg:order-2" : ""}
              >
                <img
                  src={images[index]}
                  alt={section.title}
                  className="w-full aspect-[4/3] object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={index % 2 === 1 ? "order-1 lg:order-1" : ""}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                  <p className="label-caps">{section.label}</p>
                </div>
                <h2 className="heading-section mb-6">{section.title}</h2>
                <div className="space-y-5">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="body-text">{p}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
          </>
        );
      })}

      {/* Impact */}
      <ImpactNumbers />
    </Layout>
  );
};

export default Mission;