import React from "react";
import { useTranslations } from "next-intl";
import { trackGAEvent } from "../utils/analytics";
import { Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import "./Footer.css";

export const Footer: React.FC = () => {
  // Can be a server component if we don't need trackGAEvent in onClick
  // However, because we have onClick for tracking, we need "use client"
  // Wait, no "use client" here, I will add it to the top.
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Logo */}
          <div className="footer-col footer-logo-col">
            <div className="footer-logo">
              <Image src="/assets/white-eagles-logo-white.webp" alt="White Eagles & Co." width={200} height={40} />
              <span>White Eagles & Co.</span>
            </div>
          </div>

          {/* Column 2: Company Info */}
          <div className="footer-col footer-info-col">
            <FooterInfo />
          </div>

          {/* Column 3: Contacts & Socials */}
          <div className="footer-col footer-contact-col">
            <FooterContacts />
          </div>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} White Eagles & Co. s.r.o. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Separating Client components where hooks are needed
const FooterInfo = () => {
  const t = useTranslations("footer");
  return (
    <>
      <h3>
        White Eagles & Co. s.r.o. <span className="company-desc-inline">{t("company_desc")}</span>
      </h3>
      <p className="company-details">IČO: 57098581, DIČ: 2122566292, Sídlo: Kukučínova 12, 900 31 Stupava</p>
      <div className="footer-legal-links">
        <Link href="/terms" className="footer-link-small">{t("terms")}</Link>
        <Link href="/privacy" className="footer-link-small">{t("privacy")}</Link>
        <Link href="/cookies" className="footer-link-small">{t("cookies")}</Link>
      </div>
    </>
  );
};

const FooterContacts = () => {
  return (
    <>
      <div className="footer-contact-links">
        <a
          href="tel:+421949000077"
          className="footer-link"
          onClick={() => trackGAEvent("contact_click", { method: "phone", link_url: "tel:+421949000077" })}
        >
          <Phone size={16} />
          <span>+421 949 000 077</span>
        </a>
        <a
          href="mailto:welcome@whiteeagles.sk"
          className="footer-link"
          onClick={() => trackGAEvent("contact_click", { method: "email", link_url: "mailto:welcome@whiteeagles.sk" })}
        >
          <Mail size={16} />
          <span>welcome@whiteeagles.sk</span>
        </a>
      </div>

      <div className="footer-socials">
        <a href="https://t.me/whiteeaglessk" target="_blank" rel="noopener noreferrer" title="Telegram">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </a>
        <a href="https://wa.me/421949000077" target="_blank" rel="noopener noreferrer" title="WhatsApp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        </a>
        <a href="https://www.facebook.com/slovakiainheart" target="_blank" rel="noopener noreferrer" title="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/110639977" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://github.com/JaffarSk24" target="_blank" rel="noopener noreferrer" title="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>
        <a href="https://www.upwork.com/freelancers/~01e1569e9346f49762" target="_blank" rel="noopener noreferrer" title="UpWork">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 6v10" />
            <path d="M15 6a3 3 0 0 1 0 6" />
            <path d="M5 6v5a3 3 0 0 0 6 0v-5" />
          </svg>
        </a>
      </div>
    </>
  );
};
