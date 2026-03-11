import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import aboutImg from "@/assets/about-tajana.jpg";
import communityImg from "@/assets/tajdo-community.jpg";
import teamImg from "@/assets/tajdo-team.jpg";

const About = () => {
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
            <p className="label-caps mb-4">Our Story</p>
            <h1 className="heading-display mb-6">About TAJDO</h1>
            <p className="body-text max-w-2xl mx-auto text-lg">
              A name born from a bond: a combination of Tajana and her dog, Dollar. An unbeatable team from Switzerland to Zanzibar.
            </p>
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
              src={aboutImg}
              alt="Tajana with a rescued dog"
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
            <p className="label-caps">The Beginning</p>
            <h2 className="heading-section">How It All Started</h2>
            <p className="body-text">
              A journey to Zanzibar changed everything for our founder, Tajana. Moved by the plight of street dogs on the island, she couldn't look away. The suffering she witnessed — malnourished dogs, untreated injuries, fear in their eyes — ignited a fire that would define her life's mission.
            </p>
            <p className="body-text">
              Together with her beloved dog Dollar, Tajana began what would become TAJDO. The name itself tells their story: TAJ from Tajana, DO from Dollar — two souls united in purpose.
            </p>
            <p className="body-text">
              What started as one woman's compassion has grown into a dedicated organisation, bringing food, medical care, shelter, and hope to hundreds of street dogs across Zanzibar.
            </p>
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
            <p className="label-caps">Our Community</p>
            <h2 className="heading-section">More Than an Organisation</h2>
            <p className="body-text">
              TAJDO is more than just an organisation — we are a community of people who work with heart and passion for the street dogs of Zanzibar. Our goal is to provide every dog with a safe, loving and healthy life.
            </p>
            <p className="body-text">
              We believe that even small acts can have a great impact. A bit of food, a shady spot, or medical care can change a dog's life forever. With every project we start and every bit of help we provide, we show that solidarity, care and responsibility are the foundation for a better future.
            </p>
            <p className="body-text">
              We work closely with local communities, veterinarians, and volunteers to create lasting change — not just for the dogs, but for the people of Zanzibar too.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <img
              src={communityImg}
              alt="TAJDO community"
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
              src={teamImg}
              alt="TAJDO team in Zanzibar"
              className="w-full aspect-video object-cover mb-12"
            />
            <p className="font-display text-2xl md:text-3xl font-light italic text-foreground/80 leading-relaxed">
              "Because every dog deserves a chance at life — and every act of kindness, no matter how small, can change the world."
            </p>
            <p className="label-caps mt-6">— Tajana, Founder of TAJDO</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
