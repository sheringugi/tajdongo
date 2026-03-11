import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ImpactNumbers from "@/components/ImpactNumbers";
import heroImg from "@/assets/hero-dog.jpg";
import communityImg from "@/assets/tajdo-community.jpg";
import visionImg from "@/assets/tajdo-vision.png";
import educationImg from "@/assets/tajdo-education.png";
import teamImg from "@/assets/tajdo-team.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img
          src={heroImg}
          alt="Rescued street dog on Zanzibar beach"
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
            <p className="label-caps text-primary-foreground/70 mb-4">Together for each other</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-primary-foreground leading-[1.1] mb-6">
              Rescuing Lives<br />in Zanzibar
            </h1>
            <p className="font-body text-base text-primary-foreground/80 font-light leading-relaxed mb-10 max-w-md">
              TAJDO is dedicated to rescuing, rehabilitating, and caring for the street dogs of Zanzibar. Every life matters.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="btn-primary bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                Donate Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-secondary border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                Our Story
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
              src={communityImg}
              alt="TAJDO community in Zanzibar"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="label-caps mb-4">About TAJDO</p>
            <h2 className="heading-section mb-6">Together for each other</h2>
            <div className="space-y-5">
              <p className="body-text">
                TAJDO is more than just an organisation — we are a community of people who work with heart and passion for the street dogs of Zanzibar.
              </p>
              <p className="body-text">
                Our goal is to provide every dog with a safe, loving and healthy life. We believe that even small acts can have a great impact: a bit of food, a shady spot, or medical care can change a dog's life forever.
              </p>
              <p className="body-text">
                With every project we start and every bit of help we provide, we show that solidarity, care and responsibility are not just empty words — but the foundation for a better future for humans and animals alike.
              </p>
            </div>
            <Link to="/about" className="btn-secondary mt-8 inline-flex">
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Preview */}
      <section className="bg-secondary section-padding py-24">
        <div className="max-w-6xl mx-auto">
          <p className="label-caps text-center mb-4">What We Do</p>
          <h2 className="heading-section text-center mb-16">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Maintenance & Care",
                description: "Regular food, clean water, medical care, vaccinations, and sterilisations for the street dogs.",
                image: teamImg,
              },
              {
                title: "Development & Vision",
                description: "Working towards building a dog shelter in Zanzibar — sustainable, step by step.",
                image: visionImg,
              },
              {
                title: "Education & Enlightenment",
                description: "Raising awareness about the needs of street dogs and fostering respect and compassion.",
                image: educationImg,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group"
              >
                <div className="overflow-hidden mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="label-caps mb-2">Mission</p>
                <h3 className="heading-card mb-3">{item.title}</h3>
                <p className="body-text text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/mission" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <ImpactNumbers />

      {/* Donate CTA */}
      <section className="section-padding py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-caps mb-4">Make a Difference</p>
          <h2 className="heading-display mb-6">Every Contribution Counts</h2>
          <p className="body-text max-w-xl mx-auto mb-10">
            Your donation helps us feed, vaccinate, sterilise and shelter the street dogs of Zanzibar. Together, we can create a safer world for them.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/donate" className="btn-primary">
              Donate Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://tadjo-frontend-draft.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Shop to Support
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
