import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { services } from '../data/services';
import { FileText, Users, Code, CheckCircle, MapPin, Mail, Phone, Briefcase, Star, CreditCard, CircleDollarSign, Bitcoin, RussianRuble } from 'lucide-react';
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
  const location = useLocation();

  useEffect(() => {
    // Check if we navigated here with a scrollTo state
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure rendering
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
          // Clear state to avoid scrolling on refresh
          window.history.replaceState({}, document.title);
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="home-page">
      <SEO 
        title={t('home_seo.title')}
        description={t('home_seo.description')}
        keywords={t('home_seo.keywords')}
      />
      
      {/* About Section (Moved to top) */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/assets/me.jpg" alt="Kirill" />
            </div>
            <div className="about-content">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>{t('about.title')}</h2>
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
          
          <div className="payment-options-block">
            <h3>{t('about.payment_title')}</h3>
            <div className="payment-list">
              <div className="payment-item">
                <FileText size={24} />
                <span>{t('about.payment_invoice')}</span>
              </div>
              <div className="payment-item">
                <CreditCard size={24} />
                <span>{t('about.payment_card')}</span>
              </div>
              <div className="payment-item">
                <CircleDollarSign size={24} />
                <span>{t('about.payment_usdt')}</span>
              </div>
              <div className="payment-item">
                <Bitcoin size={24} />
                <span>{t('about.payment_bitcoin')}</span>
              </div>
              <div className="payment-item">
                <RussianRuble size={24} />
                <span>{t('about.payment_rub')}</span>
              </div>
              <div className="payment-item">
                <span style={{ fontSize: '36px', fontWeight: 'normal', lineHeight: '0.7', paddingTop: '6px', marginBottom: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px', width: '24px', color: 'var(--accent-color)' }}>₴</span>
                <span>{t('about.payment_uah')}</span>
              </div>
            </div>
          </div>

          <ClientCarousel />
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">{t('services.title', 'My Services')}</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image-placeholder" style={service.image ? { backgroundImage: `url(${service.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                  {!service.image && <div className="img-overlay"></div>}
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
                  <button className="btn btn-primary" onClick={() => onOrderClick(service.id)}>
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
            <div className="stat-icon-wrapper">
              <Star size={42} strokeWidth={1.5} fill="var(--accent-color)" fillOpacity={0.2} />
            </div>
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
              <div className="contact-icon"><Briefcase size={32} /></div>
              <h3>{t('contacts.company_label', 'Company')}</h3>
              <p>White Eagles & Co. s.r.o.</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><MapPin size={32} /></div>
              <h3>{t('contacts.office_label', 'Office')}</h3>
              <a href="https://maps.app.goo.gl/QfAQ1H71k2zF1cq9A" target="_blank" rel="noopener noreferrer">
                {t('contacts.address', 'Holíčska 7, Bratislava')}
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><Mail size={32} /></div>
              <h3>{t('contacts.email_label', 'Email')}</h3>
              <a href="mailto:welcome@whiteeagles.sk">welcome@whiteeagles.sk</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><Phone size={32} /></div>
              <h3>{t('contacts.phone_label', 'Phone')}</h3>
              <a href="tel:+421949000077">+421 949 0000 77</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
