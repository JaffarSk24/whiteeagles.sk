import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { portfolio } from '../data/portfolio';
import { FileText, Users, Code, CheckCircle, ExternalLink } from 'lucide-react';
import { SEO } from '../components/SEO';
import './Home.css';

interface HomeProps {
  onOrderClick: (serviceId?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOrderClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <SEO />
      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">{t('services.title', 'My Services')}</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-content">
                  <h3>{t(service.titleKey)}</h3>
                  <p className="service-desc">{t(service.descKey)}</p>
                  <p className="service-price">
                    {service.priceRate}€ / {t('common.hour', 'hour')}
                    {service.priceMin && <span className="price-min"> ({t('common.from', 'approx from')} {service.priceMin}€)</span>}
                  </p>
                </div>
                <div className="service-actions">
                  <button className="btn btn-secondary" onClick={() => navigate(`/service/${service.id}`)}>
                    {t('services.details', 'Details')}
                  </button>
                  <button className="btn btn-primary" onClick={() => onOrderClick(service.titleKey)}>
                    {t('services.order', 'Order')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <h2 className="section-title">{t('portfolio.title', 'Portfolio')}</h2>
          <div className="portfolio-grid">
            {portfolio.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="portfolio-item">
                <div className="portfolio-content">
                  <h3>{item.title} <ExternalLink size={16} /></h3>
                  <p>{t(item.descKey)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container about-container">
          <div className="about-image">
            <div className="placeholder-image">My Photo</div>
          </div>
          <div className="about-text">
            <h2>{t('about.title', 'About Me')}</h2>
            <p>{t('about.desc', '15 years of experience in online marketing and web analytics, plus 4 years in Full-stack development.')}</p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">{t('about.marketing_exp', 'Marketing Exp')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">4+</span>
                <span className="stat-label">{t('about.dev_exp', 'Dev Exp')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="steps-section">
        <div className="container">
          <h2 className="section-title">{t('steps.title', 'How We Work')}</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon"><FileText size={32} /></div>
              <h3>1. {t('steps.request', 'Request')}</h3>
              <p>{t('steps.request_desc', 'Leave a request via the form.')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><Users size={32} /></div>
              <h3>2. {t('steps.meeting', 'Meeting')}</h3>
              <p>{t('steps.meeting_desc', 'We discuss details (I don\'t need a spec!).')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><Code size={32} /></div>
              <h3>3. {t('steps.process', 'Process')}</h3>
              <p>{t('steps.process_desc', 'Development with periodic updates.')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><CheckCircle size={32} /></div>
              <h3>4. {t('steps.delivery', 'Delivery')}</h3>
              <p>{t('steps.delivery_desc', 'Acceptance and payment. Usually within 15 days.')}</p>
            </div>
          </div>
          <div className="steps-note">
            <p>{t('steps.note', 'I do not require a detailed specification (TZ). If you don\'t have one, I will propose the best implementation for your niche.')}</p>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="contacts-section">
        <div className="container">
          <h2 className="section-title">{t('contacts.title', 'Contacts')}</h2>
          <div className="contacts-content">
            <p><strong>White Eagles & Co. s.r.o.</strong></p>
            <p>{t('contacts.address', 'Slovakia')}</p>
            <p>Email: <a href="mailto:info@whiteeagles.sk">info@whiteeagles.sk</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};
