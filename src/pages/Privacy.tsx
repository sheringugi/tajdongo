import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="section-padding py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-display mb-12">{t.footer.privacy}</h1>
          <div className="space-y-8">
            {t.privacy.content.map((paragraph, index) => (
              <p key={index} className="body-text text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;