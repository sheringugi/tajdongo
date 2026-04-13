import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import ImpactNumbers from "@/components/ImpactNumbers";
// import { IMG_NATURE, IMG_RESCUE, IMG_TAJANA } from "@/lib/images";
import SocialMedia from "@/i18n/SocialMedia";
import Adoption from "@/i18n/Adoption";
import { default as IMG_VISION } from "@/assets/tajdo-vision.jpeg";
import { default as IMG_COMMUNITY } from "@/assets/tajdo-community.jpeg";

import { default as IMG_EDUCATION } from "@/assets/tajdo-education.jpeg";
import { IMG_RESCUE, IMG_TAJANA, IMG_NATURE} from "@/lib/images";
import { default as IMG_FOOD} from "@/assets/tajdo-feeding.jpeg";
import { default as IMG_MEDICAL} from "@/assets/tajdo-medical.jpeg";



const projectImages = [IMG_COMMUNITY, IMG_FOOD, IMG_VISION, IMG_MEDICAL, IMG_NATURE, IMG_EDUCATION];

const Projects = () => {
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
            <p className="label-caps mb-4">{t.projects.label}</p>
            <h1 className="heading-display mb-6">{t.projects.title}</h1>
            <p className="body-text max-w-2xl mx-auto text-lg">{t.projects.subtitle}</p>
          </motion.div>
        </div>
      </section>


      {/* Project cards grid */}
      <section className="section-padding pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projects.items.map((project, index) => (
            <Link to={`/projects/${project.slug}`} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer h-full flex flex-col"
              >
                <div className="overflow-hidden mb-5 rounded-lg">
                  <img
                    src={projectImages[index]}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="label-caps text-accent mb-2">{project.category}</p>
                <h3 className="heading-card mb-2">{project.title}</h3>
                <p className="body-text text-sm flex-grow">{project.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

       {/* Impact Numbers */}
      <ImpactNumbers />

      {/* Social Media Section */}
      <SocialMedia />


    </Layout>
  );
};

export default Projects;
