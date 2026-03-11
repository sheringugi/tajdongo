import { motion } from "framer-motion";
import { Heart, Eye, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import ImpactNumbers from "@/components/ImpactNumbers";
import teamImg from "@/assets/tajdo-team.jpg";
import visionImg from "@/assets/tajdo-vision.png";
import educationImg from "@/assets/tajdo-education.png";

const sections = [
  {
    id: "care",
    icon: Heart,
    label: "Pillar One",
    title: "Maintenance & Care",
    image: teamImg,
    paragraphs: [
      "TAJDO primarily takes care of the well-being of street dogs. We regularly provide fresh food and clean water to ensure the survival of the animals.",
      "Beyond that, we develop thoughtful food bowls and build dog shelters in local villages to give the dogs a safe and loving environment.",
      "A strong focus lies on medical care: in collaboration with local veterinarians, we carry out vaccinations, sterilisations and necessary operations to secure the long-term health of the animals.",
    ],
  },
  {
    id: "vision",
    icon: Eye,
    label: "Pillar Two",
    title: "Development & Vision",
    image: visionImg,
    paragraphs: [
      "TAJDO works with the goal of one day creating a dog shelter in Zanzibar. But our work means more than a concrete goal: it promotes the development of potential — both in the dogs and in our own actions.",
      "Every step TAJDO takes is designed to be sustainable and responsible. We grow continuously and put our visions into reality step by step.",
    ],
  },
  {
    id: "education",
    icon: BookOpen,
    label: "Pillar Three",
    title: "Education & Enlightenment",
    image: educationImg,
    paragraphs: [
      "TAJDO wants to raise people's awareness of the needs and challenges of street dogs. Many people in Zanzibar are poorly or not at all informed about the animals, which is why they often mistreat them. Religious prejudices are frequently cited as justification, even though Islam does not prescribe harming animals.",
      "We focus on education and awareness: on the one hand, we want to bring respect, understanding and love for our four-legged friends closer to the locals. On the other hand, we provide information on how everyone can contribute with small actions to noticeably improve the lives of street dogs.",
    ],
  },
];

const Mission = () => {
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
            <p className="label-caps mb-4">What Drives Us</p>
            <h1 className="heading-display mb-6">Our Mission</h1>
            <p className="body-text max-w-2xl mx-auto text-lg">
              Three pillars guide everything we do — care, vision, and education. Together, they form the foundation of lasting change for street dogs in Zanzibar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`section-padding py-24 ${index % 2 === 1 ? "bg-secondary" : ""}`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={index % 2 === 1 ? "order-2 lg:order-2" : ""}
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={index % 2 === 1 ? "order-1 lg:order-1" : ""}
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-5 h-5 text-accent" />
                <p className="label-caps">{section.label}</p>
              </div>
              <h2 className="heading-section mb-6">{section.title}</h2>
              <div className="space-y-5">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="body-text">{p}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Impact */}
      <ImpactNumbers />
    </Layout>
  );
};

export default Mission;
