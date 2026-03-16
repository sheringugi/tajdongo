import { motion } from "framer-motion";
import { Heart, Mail, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import ImpactNumbers from "@/components/ImpactNumbers";
import { useLanguage } from "@/i18n/LanguageContext";
import { IMG_NATURE } from "@/lib/images";

const Donate = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={IMG_NATURE}
          alt="Dogs in nature"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
        <div className="relative h-full flex items-end section-padding pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="label-caps text-primary-foreground/70 mb-4">{t.donate.heroLabel}</p>
            <h1 className="font-display text-5xl md:text-6xl font-light text-primary-foreground leading-[1.1] mb-4">
              {t.donate.heroTitle}
            </h1>
            <p className="font-body text-primary-foreground/80 font-light">{t.donate.heroDesc}</p>
          </motion.div>
        </div>
      </section>

      {/* Donation options */}
      <section className="section-padding py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary p-10"
            >
              <Heart className="w-8 h-8 text-accent mb-6" />
              <h2 className="heading-card mb-4">{t.donate.bankTitle}</h2>
              <p className="body-text mb-8">{t.donate.bankDesc}</p>
              <div className="space-y-3">
                <a
                  href="mailto:info@tajdo.ch?subject=Donation%20-%20Bank%20Transfer%20Details"
                  className="btn-primary w-full justify-center"
                >
                  <Mail className="w-4 h-4" />
                  {t.donate.requestBank}
                </a>
                <a
                  href="https://wa.me/+41799583979?text=Hi%20TAJDO%2C%20I%20would%20like%20to%20make%20a%20donation.%20Could%20you%20please%20share%20the%20bank%20transfer%20details%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.donate.whatsapp}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-secondary p-10"
            >
              <Heart className="w-8 h-8 text-accent mb-6" />
              <h2 className="heading-card mb-4">{t.donate.shopTitle}</h2>
              <p className="body-text mb-8">{t.donate.shopDesc}</p>
              <a
                href="https://tadjo-frontend-draft.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                {t.donate.visitStore}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What your donation funds */}
      <section className="bg-secondary section-padding py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-caps mb-4">{t.donate.fundsLabel}</p>
          <h2 className="heading-section mb-12">{t.donate.fundsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.donate.fundsItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <h3 className="heading-card text-lg mb-2">{item.title}</h3>
                <p className="body-text text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <ImpactNumbers />
    </Layout>
  );
};

export default Donate;
