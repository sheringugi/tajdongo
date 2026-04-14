import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/tajdo-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { NavLink } from "@/components/NavLink";

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

  return (
    <nav className="bg-background/70 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="section-padding flex items-center justify-between py-0 min-h-[112px] relative">
        {/* Mobile menu toggle (Left) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 text-foreground p-2 -ml-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Left nav links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className="label-caps text-[11px] transition-colors hover:text-foreground text-muted-foreground"
              activeClassName="text-foreground"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Center logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <img src={logo} alt="TAJDO" className="h-12 md:h-20 w-auto invert dark:invert-0" />
          <span className="label-caps text-[20px] md:text-[31px] mt-0.5 tracking-[0.1em] text-foreground">
            TAJDO
          </span>
        </Link>

        {/* Right - Language toggle + Donate */}
        <div className="flex items-center gap-4">
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
          <NavLink
            to="/donate"
            className="hidden md:flex btn-donate"
            activeClassName="ring-2 ring-accent ring-offset-2"
          >
            {t.nav.donate}
          </NavLink>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <nav className="flex flex-col py-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 label-caps text-xs transition-colors text-muted-foreground hover:text-foreground"
                  activeClassName="text-foreground"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="px-6 pt-4">
                <NavLink
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                  className="label-caps text-xs transition-colors text-muted-foreground hover:text-foreground"
                >
                  {t.nav.donate}
                </NavLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
