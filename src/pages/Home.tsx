import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { FileText, Users, Code, CheckCircle, MapPin, Mail, Phone, Briefcase } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ClientCarousel } from '../components/ClientCarousel';
import { PortfolioCarousel } from '../components/PortfolioCarousel';
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
                <div className="service-image-placeholder">
                  {/* Placeholder for illustration */}
                  <div className="img-overlay"></div>
                </div>
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
          <PortfolioCarousel />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/assets/me.jpg" alt="Kirill" />
            </div>
            <div className="about-content">
              <h2>{t('about.title')}</h2>
              <div className="about-text">
                <p><strong>{t('about.name_intro')}</strong></p>
                <p>{t('about.years_sk')}</p>
                <p>{t('about.knowledge')}</p>
                <div className="pride-block">
                  <h4>{t('about.pride_title')}</h4>
                  <p>{t('about.pride_desc')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <ClientCarousel />
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="steps-section">
        <div className="container">
          <h2 className="section-title">{t('steps.title', 'Stages of Project Cooperation')}</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon"><FileText size={32} /></div>
              <h3>1. {t('steps.request', 'Request')}</h3>
              <p>{t('steps.request_desc', 'Leave a request via the form and I will contact you as soon as possible.')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><Users size={32} /></div>
              <h3>2. {t('steps.meeting', 'Meeting')}</h3>
              <p>{t('steps.meeting_desc', 'We discuss details in Bratislava or online.')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><Code size={32} /></div>
              <h3>3. {t('steps.process', 'Development')}</h3>
              <p>{t('steps.process_desc', 'Development with periodic updates.')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon"><CheckCircle size={32} /></div>
              <h3>4. {t('steps.delivery', 'Result')}</h3>
              <p>{t('steps.delivery_desc', 'Acceptance, approval and payment.')}</p>
            </div>
          </div>
          <div className="steps-success-stat">
            <h3>{t('steps.success_stat', 'I completed 90% of complex projects within 15 working days')}</h3>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="contacts-section">
        <div className="container">
          <h2 className="section-title">{t('contacts.title', 'Contacts')}</h2>
          <div className="contacts-grid">
            <div className="contact-card">
              <div className="contact-icon"><Briefcase size={24} /></div>
              <div className="contact-info">
                <h4>Company</h4>
                <p>White Eagles & Co. s.r.o.</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><MapPin size={24} /></div>
              <div className="contact-info">
                <h4>Location</h4>
                <p>{t('contacts.address', 'Slovakia')}</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><Mail size={24} /></div>
              <div className="contact-info">
                <h4>Email</h4>
                <a href="mailto:welcome@whiteeagles.sk">welcome@whiteeagles.sk</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><Phone size={24} /></div>
              <div className="contact-info">
                <h4>Phone</h4>
                <a href="tel:+421949000077">+421 949 0000 77</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
