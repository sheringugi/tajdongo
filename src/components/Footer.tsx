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
      <div className="section-padding py-2 border-b border-primary-foreground/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-center md:text-left">
            <h3 className="font-display text-sm font-light text-primary-foreground">{t.footer.stayConnected}</h3>
            <p className="font-body text-[9px] text-primary-foreground/70 uppercase tracking-wider">{t.footer.stayConnectedDesc}</p>
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com/_tajdo_" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/+41799583979" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="mailto:info@tajdo.ch" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="section-padding py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="TAJDO" className="h-4 w-auto mb-1 opacity-90" />
            <p className="font-body text-[10px] text-primary-foreground/60 leading-tight max-w-[200px]">{t.footer.together}</p>
          </div>
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-1 text-[8px]">{t.footer.navigation}</h4>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className="font-body text-[11px] text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-1 text-[8px]">{t.footer.shop}</h4>
            <div className="flex flex-col gap-1">
              <a href="https://www.tajdo.shop" target="_blank" rel="noopener noreferrer" className="font-body text-[11px] text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                {t.footer.onlineStore}
              </a>
              <a href="https://www.tajdo.shop/products" target="_blank" rel="noopener noreferrer" className="font-body text-[11px] text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                {t.footer.allProducts}
              </a>
            </div>
          </div>
          <div>
            <h4 className="label-caps text-primary-foreground/40 mb-1 text-[8px]">{t.footer.contact}</h4>
            <div className="flex flex-col gap-1">
              <p className="font-body text-[10px] text-primary-foreground/70">TAJDO, Sennweidstrasse 2A</p>
              <p className="font-body text-[10px] text-primary-foreground/70">CH-6276 Hohenrain</p>
              <a href="mailto:info@tajdo.ch" className="font-body text-[10px] text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                info@tajdo.ch
              </a>
              <Link to="/donate" className="font-body text-[11px] text-accent hover:text-accent/80 transition-colors">
                {t.footer.bankTransferLink}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-padding py-1.5 border-t border-primary-foreground/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-body text-[10px] text-primary-foreground/40">
            © {new Date().getFullYear()} TAJDO. {t.footer.rights}
          </p>
          <Link to="/privacy" className="font-body text-[10px] text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
