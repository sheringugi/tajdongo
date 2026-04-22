import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
// import { IMG_TAJANA } from "@/lib/images";
import { default as IMG_RESCUE} from "@/assets/dollar.jpeg";
import { default as IMG_TAJANA} from "@/assets/tajdo-origin-1.jpg";
import { PartnerAd } from "@/components/tajdo-ads";
import { default as IMG_SHELTER } from "@/assets/tajdo-shelter.jpeg";

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
            {/* <p className="label-caps mb-4">{t.about.storyLabel}</p> */}
            <h1 className="heading-display mb-6">{t.about.title}</h1>
            <p className="body-text max-w-2xl mx-auto text-lg">{t.about.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Partner Ad - Placed at the top for early visibility */}
      <section className="section-padding py-12">
        <div className="max-w-6xl mx-auto">
          <PartnerAd
            brandName={t.partners.vets.brand}
            description={t.partners.vets.description}
            ctaUrl={t.partners.vets.url}
            logoUrl={IMG_SHELTER}
          />
        </div>
      </section>

      {t.about.team.map((member, index) => {
        const isEven = index % 2 === 0;
        const imageSrc = member.image === "IMG_TAJANA" ? IMG_TAJANA : IMG_RESCUE;
        return (
          <section
            key={member.name}
            className={`section-padding py-24 ${!isEven ? "bg-secondary" : ""}`}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={!isEven ? "lg:order-2" : ""}
              >
                <img
                  src={imageSrc}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={`space-y-6 ${!isEven ? "lg:order-1" : ""}`}
              >
                {/* <p className="label-caps">{t.about.beginningLabel}</p> */}
                <h2 className="heading-section">{member.name}</h2>
                <p className="body-text font-semibold">{member.role}</p>
                {member.bio.map((paragraph, pIndex) => (
                  <p key={pIndex} className="body-text">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}
    </Layout>
  );
};

export default About;
