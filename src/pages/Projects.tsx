import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import teamImg from "@/assets/tajdo-team.jpg";
import communityImg from "@/assets/tajdo-community.jpg";
import visionImg from "@/assets/tajdo-vision.png";
import educationImg from "@/assets/tajdo-education.png";
import heroImg from "@/assets/hero-dog.jpg";
import donateImg from "@/assets/donate-hero.jpg";

const projects = [
  {
    category: "Medical Care",
    title: "Sterilisation Programme",
    description: "Partnering with local vets to provide free sterilisation, reducing the stray population humanely.",
    image: teamImg,
  },
  {
    category: "Nutrition",
    title: "Daily Feeding Rounds",
    description: "Fresh food and clean water for over 500 street dogs daily, across multiple locations in Zanzibar.",
    image: donateImg,
  },
  {
    category: "Shelter",
    title: "Dog Shelter Construction",
    description: "Our vision to build the first dedicated dog shelter on the island — safe, sustainable, and community-run.",
    image: visionImg,
  },
  {
    category: "Community",
    title: "Local Volunteer Network",
    description: "Training and empowering locals to become advocates for animal welfare in their communities.",
    image: communityImg,
  },
  {
    category: "Education",
    title: "School Awareness Programme",
    description: "Teaching children respect and compassion for animals through interactive workshops and activities.",
    image: educationImg,
  },
  {
    category: "Adoption",
    title: "International Adoption Programme",
    description: "Connecting rescued dogs with loving families worldwide, giving them a second chance at life.",
    image: heroImg,
  },
];

const Projects = () => {
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
            <p className="label-caps mb-4">Making a Difference</p>
            <h1 className="heading-display mb-6">Our Projects</h1>
            <p className="body-text max-w-2xl mx-auto text-lg">
              Every project brings us closer to a world where no dog suffers on the streets of Zanzibar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project cards grid */}
      <section className="section-padding pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="label-caps text-accent mb-2">{project.category}</p>
              <h3 className="heading-card mb-2">{project.title}</h3>
              <p className="body-text text-sm">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary section-padding py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-section mb-6">Want to Support a Project?</h2>
          <p className="body-text max-w-xl mx-auto mb-10">
            Your donation directly funds these initiatives. Every contribution, no matter the size, helps us save more lives.
          </p>
          <Link to="/donate" className="btn-primary">
            Donate Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
