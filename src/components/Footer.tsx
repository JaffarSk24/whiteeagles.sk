import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-info">
          <h3>White Eagles & Co. s.r.o.</h3>
          <p>{t('footer.company_desc', 'Professional Digital Services')}</p>
        </div>
        <div className="footer-links">
          {/* Add legal links if needed */}
        </div>
        <div className="copyright">
          &copy; {currentYear} White Eagles & Co. s.r.o. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
