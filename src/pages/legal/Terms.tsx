import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/SEO';
import { FileText } from 'lucide-react';
import './Legal.css';

export const Terms: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <SEO 
        title={t('terms.title')} 
        description={t('terms.description')}
        keywords="terms of service, obchodné podmienky, digital agency"
        noindex={true}
      />
      <div className="container">
        <div className="legal-header">
          <FileText size={48} className="legal-icon" />
          <h1>{t('terms.title')}</h1>
        </div>
        <div className="legal-content">
          <p>{t('terms.intro')}</p>
          
          <section>
            <h2>1. {t('terms.general_title')}</h2>
            <p>{t('terms.general_text')}</p>
          </section>

          <section>
            <h2>2. {t('terms.services_title')}</h2>
            <p>{t('terms.services_text')}</p>
          </section>

          <section>
            <h2>3. {t('terms.payment_title')}</h2>
            <p>{t('terms.payment_text')}</p>
          </section>

          <section>
            <h2>4. {t('terms.liability_title')}</h2>
            <p>{t('terms.liability_text')}</p>
          </section>
          
          <div className="legal-footer-note">
            <p><strong>{t('company.name')}</strong></p>
            <p>{t('company.address')}</p>
            <p>{t('company.id')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
