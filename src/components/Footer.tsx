import { Link } from "react-router-dom";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/tajdo-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter section */}
      <div className="section-padding py-16 border-b border-primary-foreground/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-3xl font-light text-primary-foreground mb-3">Stay Connected</h3>
          <p className="font-body text-sm text-primary-foreground/70 mb-8">
            Follow our journey and receive updates on the dogs we rescue and rehabilitate in Zanzibar.
          </p>
          <div className="flex gap-6 justify-center">
            <a
              href="https://instagram.com/_tajdo_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/+41799583979"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@tajdo.ch"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="TAJDO" className="h-10 w-auto mb-4 opacity-90" />
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              Together for each other.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-4">Navigation</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Mission", href: "/mission" },
                { label: "Projects", href: "/projects" },
                { label: "Donate", href: "/donate" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-4">Shop</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://tadjo-frontend-draft.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                Online Store
              </a>
              <a
                href="https://tadjo-frontend-draft.vercel.app/products"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                All Products
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <p className="font-body text-sm text-primary-foreground/70">TAJDO</p>
              <p className="font-body text-sm text-primary-foreground/70">Sennweidstrasse 2A</p>
              <p className="font-body text-sm text-primary-foreground/70">CH-6276 Hohenrain</p>
              <a
                href="mailto:info@tajdo.ch"
                className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mt-2"
              >
                info@tajdo.ch
              </a>
              <Link
                to="/donate"
                className="font-body text-sm text-accent hover:text-accent/80 transition-colors"
              >
                Contact us for bank transfer details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-padding py-6 border-t border-primary-foreground/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} TAJDO. All rights reserved.
          </p>
          <Link
            to="/privacy"
            className="font-body text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
