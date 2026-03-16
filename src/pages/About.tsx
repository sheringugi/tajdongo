import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { IMG_TAJANA, IMG_NATURE, IMG_RESCUE } from "@/lib/images";

const About = () => {
  const { t } = useLanguage();

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
            <p className="label-caps mb-4">{t.about.storyLabel}</p>
            <h1 className="heading-display mb-6">{t.about.title}</h1>
            <p className="body-text max-w-2xl mx-auto text-lg">{t.about.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Origin story */}
      <section className="section-padding pb-24">
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
              className="w-full aspect-[3/4] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="label-caps">{t.about.beginningLabel}</p>
            <h2 className="heading-section">{t.about.beginningTitle}</h2>
            <p className="body-text">{t.about.beginningP1}</p>
            <p className="body-text">{t.about.beginningP2}</p>
            <p className="body-text">{t.about.beginningP3}</p>
          </motion.div>
        </div>
      </section>

      {/* Full narrative */}
      <section className="bg-secondary section-padding py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <p className="label-caps">{t.about.communityLabel}</p>
            <h2 className="heading-section">{t.about.communityTitle}</h2>
            <p className="body-text">{t.about.communityP1}</p>
            <p className="body-text">{t.about.communityP2}</p>
            <p className="body-text">{t.about.communityP3}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <img
              src={IMG_NATURE}
              alt="Dogs in nature"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Team photo + closing */}
      <section className="section-padding py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={IMG_RESCUE}
              alt="TAJDO rescue dogs"
              className="w-full aspect-video object-cover mb-12"
            />
            <p className="font-display text-2xl md:text-3xl font-light italic text-foreground/80 leading-relaxed">
              {t.about.quote}
            </p>
            <p className="label-caps mt-6">{t.about.quoteAuthor}</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
