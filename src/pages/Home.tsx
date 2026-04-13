import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ImpactNumbers from "@/components/ImpactNumbers";
import { useLanguage } from "@/i18n/LanguageContext";
import { default as IMG_VISION } from "@/assets/tajdo-vision.jpeg";
import { default as IMG_COMMUNITY } from "@/assets/tajdo-community.jpeg";

import { default as IMG_EDUCATION } from "@/assets/tajdo-education.jpeg";
import { IMG_RESCUE} from "@/lib/images";
import { default as IMG_SHELTER} from "@/assets/tajdo-shelter.jpeg";
import { IMG_TAJANA } from "@/lib/images";

const missionImages = [IMG_SHELTER, IMG_VISION, IMG_EDUCATION];

const Index = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img
          src={IMG_RESCUE}
          alt="TAJDO Rescue dogs"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        <div className="relative h-full flex items-center section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="label-caps text-primary-foreground/70 mb-4">{t.index.heroLabel}</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-primary-foreground leading-[1.1] mb-6">
              {t.index.heroTitle1}<br />{t.index.heroTitle2}
            </h1>
            <p className="font-body text-base text-primary-foreground/80 font-light leading-relaxed mb-10 max-w-md">
              {t.index.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="btn-primary bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                {t.index.donateNow}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-secondary border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                {t.index.ourStory}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Together for each other */}
      <section className="section-padding py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={IMG_TAJANA}
              alt="Tajana holding a rescued puppy"
              className="w-full aspect-[4/5] object-cover object-[center_20%]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* <p className="label-caps mb-4">{t.index.aboutLabel}</p> */}
            <h2 className="heading-section mb-6">{t.index.aboutTitle}</h2>
            <div className="space-y-5">
              <p className="body-text">{t.index.aboutP1}</p>
              <p className="body-text">{t.index.aboutP2}</p>
              <p className="body-text">{t.index.aboutP3}</p>
            </div>
            <Link to="/about" className="btn-secondary mt-8 inline-flex">
              {t.index.readStory}
            </Link>
          </motion.div>
        </div>
      </section>

       {/* Mission Preview */}
<section className="bg-secondary section-padding py-24">
  <div className="max-w-6xl mx-auto">
    <h2 className="heading-section text-center mb-16">{t.index.missionTitle}</h2>

    {/* Tab Buttons Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">
      {t.index.missionItems.map((item, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
          className={`w-full text-left px-6 py-5 transition-all duration-300 border-b-2 ${
            activeTab === index
              ? "border-foreground bg-primary-foreground text-foreground shadow-md"
              : "border-transparent bg-primary-foreground/10 text-foreground/50 hover:bg-primary-foreground/20 hover:text-foreground/70"
          }`}
          onClick={() => setActiveTab(index)}
        >
          <h3 className={`heading-card transition-all duration-300 ${
            activeTab === index ? "text-foreground text-lg" : "text-foreground/50 text-base"
          }`}>
            {item.title}
          </h3>
        </motion.button>
      ))}
    </div>

    {/* Active Tab Content — full width below tabs */}
    {t.index.missionItems.map((item, index) => (
      activeTab === index && (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={missionImages[index]}
              alt={item.title}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h3 className="heading-section">{item.title}</h3>
            <p className="body-text leading-relaxed">{item.description}</p>
            <Link 
              to="/mission" 
              state={{ activeSection: index }}
              className="btn-secondary inline-flex"
            >
              {t.index.learnMore}
            </Link>
          </div>
        </motion.div>
      )
    ))}
  </div>
</section>

      {/* Impact Numbers */}
      <ImpactNumbers />

      {/* Donate CTA */}
      <section className="section-padding py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-caps mb-4">{t.index.ctaLabel}</p>
          <h2 className="heading-display mb-6">{t.index.ctaTitle}</h2>
          <p className="body-text max-w-xl mx-auto mb-10">{t.index.ctaDesc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/donate" className="btn-primary">
              {t.index.donateNow}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://www.tajdo.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {t.index.shopSupport}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};


export default Index;
