import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/tajdo-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Mission", href: "/mission" },
  { label: "Projects", href: "/projects" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="section-padding flex items-center justify-between py-4">
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
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="TAJDO" className="h-12 md:h-14 w-auto invert dark:invert-0" />
        </Link>

        {/* Right - Donate button */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/donate" className="btn-donate">
            Donate
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
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-background z-40 flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="font-display text-2xl text-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/donate"
            onClick={() => setIsOpen(false)}
            className="btn-donate mt-4"
          >
            Donate
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
