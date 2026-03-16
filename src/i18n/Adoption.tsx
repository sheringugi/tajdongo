import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Adoption = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { adoption } = t.projects;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., send data to a server.
    // For this example, we'll just show a success toast.
    toast({
      title: "Inquiry Sent!",
      description: "Thank you for your interest. We will get back to you shortly.",
    });
    e.currentTarget.reset();
  };

  return (
    <div className="max-w-6xl mx-auto mt-24">
      {/* Testimonials */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="heading-section mb-4">{adoption.title}</h2>
        <p className="body-text">{adoption.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {adoption.testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="bg-secondary p-8 flex flex-col rounded-lg"
          >
            <blockquote className="flex-grow">
              <p className="body-text italic mb-6">"{testimonial.quote}"</p>
            </blockquote>
            <cite className="font-body font-semibold text-right not-italic">- {testimonial.author}</cite>
          </motion.div>
        ))}
      </div>

      {/* Adoption Form */}
      <div className="max-w-2xl mx-auto bg-secondary p-10 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="heading-section mb-4">{adoption.form.title}</h2>
          <p className="body-text">{adoption.form.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <Input type="text" name="name" placeholder={adoption.form.namePlaceholder} required />
          <Input type="email" name="email" placeholder={adoption.form.emailPlaceholder} required />
          <Textarea name="message" placeholder={adoption.form.messagePlaceholder} required />
          <Button type="submit" className="w-full">
            {adoption.form.submitButton}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Adoption;