import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/tajdo-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.mission, href: "/mission" },
    { label: t.nav.projects, href: "/projects" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <nav className="bg-background/70 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
  <div className="section-padding flex items-center justify-between py-0 min-h-[112px]">
        {/* Left nav links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`label-caps text-[11px] transition-colors hover:text-foreground ${
                location.pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 z-10">
              <img src={logo} alt="TAJDO" className="h-24 md:h-28 w-auto invert dark:invert-0" />
            </Link>

        {/* Right - Language toggle + Donate */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center border border-border">
            <button
              onClick={() => setLanguage("en")}
              className={`label-caps text-[11px] px-2 py-1 transition-colors ${
                language === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("de")}
              className={`label-caps text-[11px] px-2 py-1 transition-colors ${
                language === "de" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DE
            </button>
          </div>
          <Link to="/donate" className="btn-donate">
            {t.nav.donate}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-3xl text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 mt-4"
            >
              <button
                onClick={() => setLanguage("en")}
                className={`label-caps text-sm transition-colors ${
                  language === "en" ? "text-foreground font-bold border-b border-foreground" : "text-muted-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("de")}
                className={`label-caps text-sm transition-colors ${
                  language === "de" ? "text-foreground font-bold border-b border-foreground" : "text-muted-foreground"
                }`}
              >
                DE
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/donate"
                onClick={() => setIsOpen(false)}
                className="btn-donate text-lg px-8 py-3 mt-4"
              >
                {t.nav.donate}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
