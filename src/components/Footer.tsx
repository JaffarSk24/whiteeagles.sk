import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, Linkedin, Github, Facebook } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Logo */}
          <div className="footer-col footer-logo-col">
            <div className="footer-logo">
              <img src="/assets/white-eagles-logo-white.png" alt="White Eagles & Co." />
              <span>White Eagles & Co.</span>
            </div>
          </div>

          {/* Column 2: Company Info */}
          <div className="footer-col footer-info-col">
            <h3>
              White Eagles & Co. s.r.o. <span className="company-desc-inline">{t('footer.company_desc')}</span>
            </h3>
            <p className="company-details">IČO: 57098581, DIČ: 2122566292, Sídlo: Kukučínova 12, 900 31 Stupava</p>
            <div className="footer-legal-links">
                <a href="/terms" className="footer-link-small">{t('footer.terms')}</a>
                <a href="/privacy" className="footer-link-small">{t('footer.privacy')}</a>
                <a href="/cookies" className="footer-link-small">{t('footer.cookies')}</a>
            </div>
          </div>

          {/* Column 3: Contacts & Socials */}
        <div className="footer-col footer-contact-col">
            <div className="footer-contact-links">
              <a href="tel:+421949000077" className="footer-link">
                <Phone size={16} />
                <span>+421 949 0000 77</span>
              </a>
              <a href="mailto:welcome@whiteeagles.sk" className="footer-link">
                <Mail size={16} />
                <span>welcome@whiteeagles.sk</span>
              </a>
            </div>

            <div className="footer-socials">
              <a href="https://t.me/WE_Orders_bot" target="_blank" rel="noopener noreferrer" title="Telegram">
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
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/110639977" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/JaffarSk24" target="_blank" rel="noopener noreferrer" title="GitHub">
                <Github size={20} />
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
          </div>
        </div>

        <div className="copyright">
          &copy; {currentYear} White Eagles & Co. s.r.o. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
