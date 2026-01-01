import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/SEO';
import { Cookie } from 'lucide-react';
import './Legal.css';

export const CookiesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <SEO 
        title={t('cookies.title')} 
        description={t('cookies.description')}
        keywords="cookies, cookie policy"
        noindex={true}
      />
      <div className="container">
        <div className="legal-header">
          <Cookie size={48} className="legal-icon" />
          <h1>{t('cookies.title')}</h1>
        </div>
        <div className="legal-content">
          <p>{t('cookies.intro')}</p>

          <section>
            <h2>1. {t('cookies.what_are_title')}</h2>
            <p>{t('cookies.what_are_text')}</p>
          </section>

          <section>
            <h2>2. {t('cookies.usage_title')}</h2>
            <p>{t('cookies.usage_text')}</p>
            <ul>
                <li><strong>Google Analytics (GA4):</strong> {t('cookies.ga4_desc')}</li>
                <li><strong>Google Ads:</strong> {t('cookies.ads_desc')}</li>
                <li><strong>Meta Pixel:</strong> {t('cookies.meta_desc')}</li>
                <li><strong>Clarity:</strong> {t('cookies.clarity_desc')}</li>
            </ul>
          </section>

          <section>
            <h2>3. {t('cookies.management_title')}</h2>
            <p>{t('cookies.management_text')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
