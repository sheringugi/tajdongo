import { Link } from "react-router-dom";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/tajdo-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.mission, href: "/mission" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.donate, href: "/donate" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter section */}
      <div className="section-padding py-16 border-b border-primary-foreground/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-3xl font-light text-primary-foreground mb-3">{t.footer.stayConnected}</h3>
          <p className="font-body text-sm text-primary-foreground/70 mb-8">{t.footer.stayConnectedDesc}</p>
          <div className="flex gap-6 justify-center">
            <a href="https://instagram.com/_tajdo_" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://wa.me/+41799583979" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="mailto:info@tajdo.ch" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="TAJDO" className="h-10 w-auto mb-4 opacity-90" />
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">{t.footer.together}</p>
          </div>
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-4">{t.footer.navigation}</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-4">{t.footer.shop}</h4>
            <div className="flex flex-col gap-3">
              <a href="https://www.tajdo.shop" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                {t.footer.onlineStore}
              </a>
              <a href="https://www.tajdo.shop/products" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                {t.footer.allProducts}
              </a>
            </div>
          </div>
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-4">{t.footer.contact}</h4>
            <div className="flex flex-col gap-3">
              <p className="font-body text-sm text-primary-foreground/70">TAJDO</p>
              <p className="font-body text-sm text-primary-foreground/70">Sennweidstrasse 2A</p>
              <p className="font-body text-sm text-primary-foreground/70">CH-6276 Hohenrain</p>
              <a href="mailto:info@tajdo.ch" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mt-2">
                info@tajdo.ch
              </a>
              <Link to="/donate" className="font-body text-sm text-accent hover:text-accent/80 transition-colors">
                {t.footer.bankTransferLink}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-padding py-6 border-t border-primary-foreground/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} TAJDO. {t.footer.rights}
          </p>
          <Link to="/privacy" className="font-body text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
