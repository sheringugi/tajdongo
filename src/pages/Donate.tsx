import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { IMG_RESCUE } from "@/lib/images";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PartnerAd } from "@/components/tajdo-ads";
import { default as IMG_VISION } from "@/assets/tajdo-vision.jpeg";
import { ArrowRight, ShoppingBag } from "lucide-react";

const Donate = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleAdoptionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Inquiry Sent!",
      description: "Thank you for your interest. We will get back to you shortly.",
    });
    e.currentTarget.reset();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={IMG_RESCUE}
          alt="A rescued dog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/70 to-foreground/50" />
        <div className="relative section-padding py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center text-primary-foreground"
          >
            <h1 className="heading-display mb-6 text-primary-foreground">
              {t.donate.heroTitle}
            </h1>
            <div className="space-y-4 text-primary-foreground/80">
              {t.donate.heroDesc.map((p, i) => (
                <p key={i} className="font-body max-w-2xl mx-auto text-lg font-light leading-relaxed">{p}</p>
              ))}
            </div>
            <a href="#donate-now" className="btn-primary mt-8 bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
              {t.donate.donateNow}
            </a>
          </motion.div>
        </div>
      </section>

      
      {/* Main Content */}
      <section id="donate-now" className="section-padding py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text */}
          <div className="space-y-6">
            <h2 className="heading-section">{t.donate.mainTitle}</h2>
            {t.donate.mainDesc.map((p, i) => (
              <p key={i} className="body-text">{p}</p>
            ))}
          </div>

          {/* Right Column: Details */}
          <div className="bg-secondary p-8 rounded-lg space-y-8">
            <div>
              <h3 className="heading-card mb-2">{t.donate.details.bank.title}</h3>
              <p className="body-text">{t.donate.details.bank.name}</p>
              <p className="body-text">{t.donate.details.bank.iban}</p>
              <p className="body-text">{t.donate.details.bank.bic}</p>
            </div>
            <div>
              <h3 className="heading-card mb-2">{t.donate.details.address.title}</h3>
              <p className="body-text">{t.donate.details.address.name}</p>
              <p className="body-text">{t.donate.details.address.line1}</p>
              <p className="body-text">{t.donate.details.address.line2}</p>
            </div>
            <div>
              <h3 className="heading-card mb-2">{t.donate.details.info.title}</h3>
              <p className="body-text text-sm">{t.donate.details.info.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Ad - New section for Donate page */}
      <section className="section-padding py-12">
        <div className="max-w-6xl mx-auto">
          <PartnerAd
            brandName={t.partners.vets.brand}
            description={t.partners.vets.description}
            ctaUrl={t.partners.vets.url}
            logoUrl={IMG_VISION}
          />
        </div>
      </section>

      {/* Interactive Shop CTA Section */}
      <section className="py-12 section-padding bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative group overflow-hidden rounded-2xl border border-border bg-secondary/30 p-8 md:p-12 transition-all hover:shadow-md">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-accent/5 rounded-full blur-3xl transition-all group-hover:bg-accent/10" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-accent/10 text-accent label-caps text-[10px]">
                  <ShoppingBag className="w-3 h-3" />
                  {t.donate.shopCTA}
                </div>
                <h2 className="heading-section text-2xl md:text-3xl mb-4">{t.donate.shopTitle}</h2>
                <p className="body-text text-base max-w-xl">
                  {t.announcement}
                </p>
              </div>
              
              <a
                href="https://www.tajdo.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group/btn flex items-center gap-2 px-8 py-4 whitespace-nowrap bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-95"
              >
                {t.donate.shopButton}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
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

      {/* Adoption Form */}
      <section className="section-padding py-24">
        <div className="max-w-2xl mx-auto bg-secondary p-10 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="heading-section mb-4">{t.donate.adoptionForm.title}</h2>
            <p className="body-text">{t.donate.adoptionForm.subtitle}</p>
          </div>
          <form onSubmit={handleAdoptionSubmit} className="text-left space-y-4">
            <Input type="text" name="name" placeholder={t.donate.adoptionForm.namePlaceholder} required />
            <Input type="email" name="email" placeholder={t.donate.adoptionForm.emailPlaceholder} required />
            <Textarea name="message" placeholder={t.donate.adoptionForm.messagePlaceholder} required />
            <Button type="submit" className="w-full">
              {t.donate.adoptionForm.submitButton}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
