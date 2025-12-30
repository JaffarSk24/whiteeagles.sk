import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
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
            <p className="detail-desc">{t(service.descKey)}</p>
            
            <div className="detail-full-info">
              <h3>{t('services.details', 'Details')}</h3>
              <p>{t(service.detailsKey)}</p>
              {/* Add more elaborate content here if available or generate placeholders */}
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

            <button className="btn btn-primary btn-lg" onClick={() => onOrderClick(t(service.titleKey))}>
              {t('services.order', 'Order This Service')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
