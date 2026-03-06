import React, { useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { services } from '../data/services';
import { FileText, Users, Code, CheckCircle, MapPin, Mail, Phone, Briefcase, Star, CreditCard, CircleDollarSign, Bitcoin, RussianRuble, Send } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../components/SEO';
import { ClientCarousel } from '../components/ClientCarousel';
import { PortfolioCarousel } from '../components/PortfolioCarousel';
import { FadeInSection } from '../components/FadeInSection';
import { trackGAEvent } from '../utils/analytics';
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
      <Helmet>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Сколько стоит создание сайта и от чего зависит цена?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Стоимость разработки сайта в 2026 году варьируется от 5000 € за простой лендинг до 35000 €+ за сложный портал или SaaS. Цена зависит от типа сайта, сложности функционала (интеграции CRM, платежи), дизайна (шаблон или уникальный), CMS/фреймворка и региона. Также влияют объем контента, мобильная адаптивность, SEO-оптимизация и техподдержка."
                }
              },
              {
                "@type": "Question",
                "name": "Какие типы сайтов бывают и какой нужен мне?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Основные типы сайтов: лендинг, сайт-визитка, корпоративный сайт, интернет-магазин и портал/SaaS. Выбор зависит от целей бизнеса: получение лидов, продажи, презентация услуг или сложный онлайн-сервис. Для B2B-услуг обычно подходит корпоративный сайт с портфолио, услугами, блогом и формой заявок."
                }
              },
              {
                "@type": "Question",
                "name": "Сколько времени занимает разработка от брифа до запуска?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Полный цикл разработки обычно занимает 1–2 недели для лендинга или сайта-визитки, 2–4 недели для корпоративного сайта и 1–3 месяца для интернет-магазина. Сроки зависят от этапов планирования, дизайна, программирования, тестирования, а также от количества правок, кастомного кода и интеграций."
                }
              },
              {
                "@type": "Question",
                "name": "Шаблонный дизайн или индивидуальный — что лучше?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Шаблонный дизайн дешевле и быстрее в запуске, подходит для стандартных задач и MVP. Индивидуальный дизайн лучше отражает бренд, помогает выделиться среди конкурентов и дает больше возможностей для кастомизации, но стоит дороже и требует больше времени на разработку."
                }
              },
              {
                "@type": "Question",
                "name": "Что входит в техподдержку после запуска?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Техподдержка после запуска обычно включает мониторинг доступности сайта, резервные копии, обновления CMS и плагинов, исправление багов, SEO-оптимизацию и наполнение контентом. Это помогает обеспечить стабильную работу сайта, безопасность и снижение риска простоев."
                }
              },
              {
                "@type": "Question",
                "name": "Как настроить кампанию и выбрать стратегию ставок?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Для настройки кампании в Google Ads нужно создать аккаунт, выбрать цель, задать бюджет, географию показов и ключевые слова. Для старта и тестирования часто используют ручное управление ставками, а после накопления 15–30 конверсий переходят на автоматические стратегии, такие как Maximize Conversions или Target ROAS."
                }
              },
              {
                "@type": "Question",
                "name": "Какие правила и запреты есть в Google Рекламе?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "В Google Рекламе запрещены материалы сексуального характера, насилие, нелегальные товары, мошеннические практики и вводящий в заблуждение контент. Также важны технические требования: релевантные посадочные страницы, мобильная оптимизация и подтверждение сайта. Нарушения могут привести к отклонению объявлений или блокировке аккаунта."
                }
              },
              {
                "@type": "Question",
                "name": "Почему реклама не показывается или сливается бюджет?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Причинами могут быть слишком низкий бюджет, плохой показатель качества, узкий таргетинг, проблемы с модерацией, отсутствие настроенных конверсий, слишком широкие ключевые слова или высокая конкуренция. Для исправления ситуации нужно улучшить качество объявлений и посадочных страниц, добавить минус-слова и настроить корректное отслеживание конверсий."
                }
              },
              {
                "@type": "Question",
                "name": "Как интегрировать рекламу с сайтом для отслеживания конверсий?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Для отслеживания конверсий обычно устанавливают Google Tag Manager на сайт, связывают его с Google Analytics 4 и Google Ads, создают события, например отправку формы или звонок, и импортируют эти конверсии в Google Ads. Это позволяет оптимизировать рекламу по реальным лидам и продажам."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли рекламировать определенные товары/услуги?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Большинство услуг можно рекламировать, если они соответствуют правилам Google Ads. Однако для некоторых ниш действуют ограничения, например для финансовых услуг, медицины, криптовалюты и азартных игр. Перед запуском важно проверить политику Google Ads и убедиться, что объявления и посадочные страницы содержат честную и подтверждаемую информацию."
                }
              }
            ]
          }`}
        </script>
      </Helmet>
      
      {/* About Section (Moved to top) */}
      <section id="about" className="about-section">
        <div className="container">
          <h1 className="section-title">{t('about.title')}</h1>
          <div className="about-grid">
            <div className="about-image">
              <picture>
                <source srcSet="/assets/me-small.webp" media="(max-width: 768px)" type="image/webp" />
                <source srcSet="/assets/me.webp" type="image/webp" />
                <img 
                  src="/assets/me.jpg" 
                  alt="Kirill" 
                  width="800"
                  height="1024"
                  style={{ width: '100%', height: 'auto' }}
                  fetchPriority="high"
                />
              </picture>
            </div>
            <div className="about-content">
              <div className="about-text">
                <p className="greeting-text"><strong>{t('about.greeting')} {t('about.name_intro')}</strong></p>
                <p>{t('about.years_sk')}</p>
                <p>{t('about.knowledge')}</p>
                
                <div className="pride-block">
                  <h2>{t('about.pride_title')}</h2>
                  <p>{t('about.pride_desc')}</p>
                </div>

                <div className="about-cta">
                  <p>{t('about.cta_text')}</p>
                  <button className="btn btn-liquid" onClick={() => onOrderClick()}>
                    {t('about.cta_button')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="steps-success-stat" style={{ margin: '60px auto' }}>
            <div className="stat-icon-wrapper">
              <Star size={42} strokeWidth={1.5} fill="var(--accent-color)" fillOpacity={0.2} />
            </div>
            <h3>{t('steps.success_stat', 'I completed 90% of complex projects within 15 working days')}</h3>
          </div>

          <ClientCarousel />
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <FadeInSection>
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
                      {t('services.more_info', 'More Info')}
                    </button>
                    <button className="btn btn-primary" onClick={() => onOrderClick(service.id)}>
                      {t('services.order', 'Order')}
                    </button>
                  </div>
                </div>
              ))}
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
          </FadeInSection>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">{t('portfolio.title', 'Portfolio')}</h2>
            <PortfolioCarousel />
          </FadeInSection>
        </div>
      </section>



      {/* Steps Section */}
      <section id="steps" className="steps-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">{t('steps.title', 'Stages of Project Cooperation')}</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon"><FileText size={32} /></div>
                <h3>1. {t('steps.request', 'Request')}</h3>
                <p>
                  <Trans 
                    i18nKey="steps.request_desc" 
                    defaults="Leave a request <1>via the form</1> and I will contact you as soon as possible."
                    components={{ 
                      1: <button 
                          type="button"
                          onClick={() => onOrderClick()} 
                          style={{ 
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            font: 'inherit',
                            cursor: 'pointer', 
                            color: 'var(--accent-color)', 
                            textDecoration: 'underline',
                            fontWeight: 500
                          }} 
                        /> 
                    }} 
                  />
                </p>
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

          </FadeInSection>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="contacts-section">
        <div className="container">
          <FadeInSection>
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
              <div className="contact-info-block">
                <div className="contact-info-item">
                  <Mail className="contact-icon" />
                  <a 
                    href="mailto:welcome@whiteeagles.sk"
                    onClick={() => trackGAEvent('contact_click', { method: 'email', link_url: 'mailto:welcome@whiteeagles.sk' })}
                  >
                    welcome@whiteeagles.sk
                  </a>
                </div>
                <div className="contact-info-item">
                  <Phone className="contact-icon" />
                  <a 
                    href="tel:+421949000077"
                    onClick={() => trackGAEvent('contact_click', { method: 'phone', link_url: 'tel:+421949000077' })}
                  >
                    +421 949 0000 77
                  </a>
                </div>
                <div className="contact-info-item">
                  <Send className="contact-icon" />
                  <a 
                    href="https://t.me/kirill_mosin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackGAEvent('contact_click', { method: 'telegram', link_url: 'https://t.me/kirill_mosin' })}
                  >
                    t.me/kirill_mosin
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};
