import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { IMG_NATURE, IMG_RESCUE, IMG_TAJANA } from "@/lib/images"; // Assuming these are your project images
import { ArrowLeft, ArrowRight } from "lucide-react";
import Adoption from "@/i18n/Adoption";
import NotFound from "./NotFound";
import { default as IMG_MEDICAL} from "@/assets/tajdo-medical.jpeg";
import { default as IMG_VISION } from "@/assets/tajdo-vision.jpeg";
import { default as IMG_COMMUNITY } from "@/assets/tajdo-community.jpeg";
import { default as IMG_FEED } from "@/assets/tajdo-feeding.jpeg";
import { default as IMG_EDUCATION } from "@/assets/tajdo-education.jpeg";
import { default as IMG_SHELTER} from "@/assets/tajdo-shelter.jpeg";
import { PartnerAd } from "@/components/tajdo-ads";




const projectImages = [IMG_FEED, IMG_EDUCATION, IMG_MEDICAL, IMG_NATURE, IMG_COMMUNITY];

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t } = useLanguage();

  const projectIndex = t.projects.items.findIndex((p: any) => p.slug === slug);
  const project = t.projects.items[projectIndex];

  if (!project) {
    return <NotFound />;
  }

  const image = projectImages[projectIndex];

  const projectsCount = t.projects.items.length;
  const nextProjectIndex = (projectIndex + 1) % projectsCount;
  const nextProject = t.projects.items[nextProjectIndex];

  const prevProjectIndex = (projectIndex - 1 + projectsCount) % projectsCount;
  const prevProject = t.projects.items[prevProjectIndex];

  return (
    <Layout>
      <section className="section-padding py-24">
        <div className="max-w-4xl mx-auto">
          <Link to="/projects" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          <div className="mb-8">
            <p className="label-caps text-accent mb-2">{project.category}</p>
            <h1 className="heading-display mb-6">{project.title}</h1>
          </div>
          <img
            src={image}
            alt={project.title}
            className="w-full aspect-video object-cover rounded-lg mb-8"
          />
          <div className="max-w-none space-y-5 mb-16">
            {project.detail.map((paragraph: string, index: number) => (
              <p key={index} className="body-text text-lg">{paragraph}</p>
            ))}
          </div>

          {/* Partner Ad */}
          <div className="my-12">
            <PartnerAd
              brandName={t.partners.tours.brand}
              description={t.partners.tours.description}
              ctaUrl={t.partners.tours.url}
              logoUrl={IMG_VISION} // Using IMG_VISION for this ad
            />
          </div>


          {project.slug === "successful-placement" && <Adoption />}

          <div className="mt-12 border-t pt-8 flex justify-between items-center">
            <Link
              to={`/projects/${prevProject.slug}`}
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Project: {prevProject.title}
            </Link>
            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              Next Project: {nextProject.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;