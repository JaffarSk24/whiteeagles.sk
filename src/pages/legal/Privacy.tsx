import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/SEO';
import { Shield } from 'lucide-react';
import './Legal.css';

export const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <SEO 
        title={t('privacy.title')} 
        description={t('privacy.description')}
        keywords="privacy policy, ochrana osobných údajov, gdpr"
        noindex={true}
      />
      <div className="container">
        <div className="legal-header">
          <Shield size={48} className="legal-icon" />
          <h1>{t('privacy.title')}</h1>
        </div>
        <div className="legal-content">
          <p>{t('privacy.intro')}</p>

          <section>
            <h2>1. {t('privacy.controller_title')}</h2>
            <p>{t('privacy.controller_text')}</p>
          </section>

          <section>
            <h2>2. {t('privacy.data_collection_title')}</h2>
            <p>{t('privacy.data_collection_text')}</p>
            <ul>
                <li>Google Console, GTM, GA4</li>
                <li>Meta (Facebook, Instagram)</li>
                <li>Microsoft Clarity</li>
                <li>Bing Console</li>
            </ul>
          </section>

          <section>
            <h2>3. {t('privacy.purpose_title')}</h2>
            <p>{t('privacy.purpose_text')}</p>
          </section>

           <section>
            <h2>4. {t('privacy.advertising_title')}</h2>
            <p>{t('privacy.advertising_text')}</p>
            <ul>
                <li>Google Ads</li>
                <li>Meta Ads</li>
            </ul>
          </section>

          <section>
            <h2>5. {t('privacy.rights_title')}</h2>
            <p>{t('privacy.rights_text')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
