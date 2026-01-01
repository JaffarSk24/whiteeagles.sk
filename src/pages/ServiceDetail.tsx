import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { services } from '../data/services';
import { SEO } from '../components/SEO';
import './ServiceDetail.css';

interface ServiceDetailProps {
  onOrderClick: (serviceId: string) => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ onOrderClick }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="container not-found">
        <SEO title="Service Not Found" />
        <h2>Service not found</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      <SEO 
        title={t(service.titleKey)} 
        description={t(service.descKey)}
      />
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> {t('common.back', 'Back')}
        </button>
        
        <div className="detail-content">
          <h1>{t(service.titleKey)}</h1>
          
          <div className="detail-card">
            {service.id === 'webdev' && (
               <img src="/assets/icons/webdev-icon.png" alt="Web Development" className="service-detail-icon" />
            )}
            {service.id === 'bugfix' && (
               <img src="/assets/icons/bugfix-icon.png" alt="Bugfix" className="service-detail-icon" />
            )}
            {service.id === 'ads' && (
               <img src="/assets/icons/ads-icon.png" alt="Ads" className="service-detail-icon" />
            )}
            <p className="detail-desc">{t(service.descKey)}</p>
            
            <div className="detail-full-info">
              <h3>{t('services.details', 'Details')}</h3>
              
              {/* Check for details list */}
              {Array.isArray(t(service.detailsKey + '_points', { returnObjects: true })) ? (
                <ul className="details-list">
                  {(t(service.detailsKey + '_points', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{t(service.detailsKey)}</p>
              )}

              {/* Guarantee Block for WebDev */}
              {service.id === 'webdev' && (
                <div className="guarantee-block">
                  <div className="guarantee-icon">
                    <ShieldCheck size={32} />
                  </div>
                  <p>{t('services.webdev.guarantee')}</p>
                </div>
              )}
            </div>

            <div className="detail-pricing">
              <span className="price-tag">
                {service.priceRate}€ / {t('common.hour', 'hour')}
              </span>
              {service.priceMin && (
                <span className="price-min-tag">
                  {t('common.from', 'approx from')} {service.priceMin}€
                </span>
              )}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => onOrderClick(service.id)}>
              {t('services.order', 'Order This Service')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
