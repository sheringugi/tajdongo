import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ImpactNumbers = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-foreground text-primary-foreground py-20 section-padding">
      <div className="max-w-6xl mx-auto">
        <p className="label-caps text-primary-foreground/40 text-center mb-12">{t.impact.label}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {t.impact.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-primary-foreground mb-2">
                {stat.number}
              </p>
              <p className="label-caps text-[10px] text-primary-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers;
