import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services, serviceSlug } from "../../data/services";
import {
  FileText,
  Users,
  Code,
  CheckCircle,
  Star,
  CreditCard,
  CircleDollarSign,
  Bitcoin,
  RussianRuble,
  Zap,
  Award,
} from "lucide-react";
import { ClientCarousel } from "../../components/ClientCarousel";
import { PortfolioCarousel } from "../../components/PortfolioCarousel";
import { FadeInSection } from "../../components/FadeInSection";
import { HeroActions, OrderButton, ScrollToHash, InlineContactForm } from "./HomeInteractive";
import "./Home.css";
import "./HeroAndExtras.css";

// The home page, rendered on the server. The browser receives finished HTML
// and runs code only for the parts that react to the visitor: the hero and
// order buttons, the two carousels, the fade-ins and the contact form
// (HomeInteractive.tsx). Their texts are passed to them already translated,
// so the layout does not have to ship this page's messages to the browser.

// =========================================
// HERO SECTION
// =========================================
function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="hero-section">
      <div className="hero-bg-glow" />
      <div className="container hero-content">
        {/* Left: text */}
        <div className="hero-text">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {t("location")}
          </div>

          <h1 className="hero-title">
            {t("title")}
          </h1>

          <p className="hero-subtitle">{t("subtitle")}</p>

          <HeroActions cta={t("cta")} ctaSecondary={t("cta_secondary")} />

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{t("stat1_num")}</span>
              <span className="hero-stat-label">{t("stat1_label")}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">{t("stat2_num")}</span>
              <span className="hero-stat-label">{t("stat2_label")}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">{t("stat3_num")}</span>
              <span className="hero-stat-label">{t("stat3_label")}</span>
            </div>
          </div>
        </div>

        {/* Right: portrait + floating cards */}
        <div className="hero-visual">
          <div className="hero-portrait-wrapper">
            <div className="hero-portrait-glow" />

            {/* Floating card top-left */}
            <div className="hero-float-card card-top">
              <div className="float-card-icon">
                <Zap size={18} />
              </div>
              <div className="float-card-text">
                <span className="float-card-title">{t("float1_title")}</span>
                <span className="float-card-sub">{t("float1_sub")}</span>
              </div>
            </div>

            <picture>
              <source srcSet="/assets/me-small.webp" media="(max-width: 768px)" type="image/webp" />
              <source srcSet="/assets/me.webp" type="image/webp" />
              <img
                src="/assets/me.jpg"
                alt="Kirill Mosin — White Eagles & Co."
                className="hero-portrait-img"
                width={800}
                height={1024}
                // The portrait is the largest element of the first screen on
                // every device: the browser should fetch it ahead of the
                // scripts and the images further down.
                fetchPriority="high"
              />
            </picture>

            {/* Floating card bottom-right */}
            <div className="hero-float-card card-bottom">
              <div className="float-card-icon">
                <Award size={18} />
              </div>
              <div className="float-card-text">
                <span className="float-card-title">{t("float2_title")}</span>
                <span className="float-card-sub">{t("float2_sub")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================
// TESTIMONIALS SECTION
// =========================================
function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = [
    { name: t("items.0.name"), role: t("items.0.role"), text: t("items.0.text") },
    { name: t("items.1.name"), role: t("items.1.role"), text: t("items.1.text") },
    { name: t("items.2.name"), role: t("items.2.role"), text: t("items.2.text") },
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h2 className="section-title">{t("title")}</h2>
        <div className="testimonials-grid">
          {items.map((item, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={16} fill="#fbbf24" strokeWidth={0} />
                ))}
              </div>
              <p className="testimonial-text">{item.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {item.name.charAt(0)}
                </div>
                <div className="testimonial-author-info">
                  <span className="testimonial-author-name">{item.name}</span>
                  <span className="testimonial-author-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeContent() {
  const t = useTranslations();
  const locale = useLocale();
  const tSteps = useTranslations("steps");
  const tServicesNS = useTranslations("services");
  const tPortfolio = useTranslations("portfolio");
  const tCommon = useTranslations("common");
  const tCases = useTranslations("cases");
  const tAbout = useTranslations("about");
  const tFaq = useTranslations("home_faq");
  const faqItems = tFaq.raw("items") as { q: string; a: string }[];

  return (
    <div className="home-page">

      {/* 1. HERO — Новый мощный первый экран */}
      <HeroSection />

      {/* 2. SOCIAL PROOF — Логотипы клиентов сразу под Hero */}
      <section className="clients-strip-section">
        <div className="container">
          <ClientCarousel />
        </div>
      </section>

      {/* 3. SERVICES — Карточки услуг */}
      <section id="services" className="services-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">{tServicesNS("title")}</h2>
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div
                    className="service-image-placeholder"
                    style={
                      service.image
                        ? {
                            backgroundImage: `url(${service.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {}
                    }
                  >
                    {!service.image && <div className="img-overlay" />}
                  </div>
                  <div className="service-content">
                    <h3>{t(service.titleKey as any)}</h3>
                    <p className="service-desc">{t(service.descKey as any)}</p>
                    <p className="service-price">
                      {service.priceRate}€ / {tCommon("hour")}
                      {service.priceMin && (
                        <span className="price-min">
                          {" "}
                          ({tCommon("from")} {service.priceMin}€)
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="service-actions">
                    {/* A real link, not a button with router.push. A crawler does
                        not click buttons, so until this changed the six service
                        pages had no incoming link anywhere on the site and Google
                        never indexed them. */}
                    <Link
                      href={`/service/${serviceSlug(service, locale)}/` as any}
                      className="btn btn-secondary"
                    >
                      {tServicesNS("more_info")}
                    </Link>
                    <OrderButton className="btn btn-primary" serviceId={service.id}>
                      {tServicesNS("apply")}
                    </OrderButton>
                  </div>
                </div>
              ))}
            </div>

            {/* Способы оплаты */}
            <div className="payment-options-block">
              <h3>{tAbout("payment_title")}</h3>
              <div className="payment-list">
                <div className="payment-item">
                  <FileText size={24} />
                  <span>{tAbout("payment_invoice")}</span>
                </div>
                <div className="payment-item">
                  <CreditCard size={24} />
                  <span>{tAbout("payment_card")}</span>
                </div>
                <div className="payment-item">
                  <CircleDollarSign size={24} />
                  <span>{tAbout("payment_usdt")}*</span>
                </div>
                <div className="payment-item">
                  <Bitcoin size={24} />
                  <span>{tAbout("payment_bitcoin")}*</span>
                </div>
                <div className="payment-item">
                  <RussianRuble size={24} />
                  <span>{tAbout("payment_rub")}*</span>
                </div>
                <div className="payment-item">
                  <span
                    style={{
                      fontSize: "36px",
                      fontWeight: "normal",
                      lineHeight: "0.7",
                      paddingTop: "6px",
                      marginBottom: "7px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "24px",
                      width: "24px",
                      color: "var(--accent-color)",
                    }}
                  >
                    ₴
                  </span>
                  <span>{tAbout("payment_uah")}*</span>
                </div>
              </div>
              {/* The company itself takes only the invoice and card payments.
                  Without this note the list reads as the s.r.o. accepting
                  crypto, rubles and hryvnias, which it does not. */}
              <p className="payment-note">
                *{" "}
                {tAbout.rich("payment_note", {
                  company: (chunks) => <span className="payment-company">{chunks}</span>,
                })}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 4. PORTFOLIO — Кейсы (переработанные карточки) */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">{tPortfolio("title")}</h2>
            <PortfolioCarousel />
            {/* The carousel is a client component; the index page below it is
                what search engines can actually crawl into. */}
            <div className="portfolio-all-link">
              <Link href="/portfolio/">{tCases("title")} →</Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 5. TESTIMONIALS — Отзывы клиентов */}
      <FadeInSection>
        <TestimonialsSection />
      </FadeInSection>

      {/* 6. PROCESS — 4 шага */}
      <section id="process" className="steps-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">{tSteps("title")}</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">
                  <FileText size={32} />
                </div>
                <h3>1. {tSteps("request")}</h3>
                <p>
                  <OrderButton
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                      cursor: "pointer",
                      color: "var(--accent-color)",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    {tSteps("request_desc_link")}
                  </OrderButton>{" "}
                  {tSteps("request_desc_rest")}
                </p>
              </div>
              <div className="step-card">
                <div className="step-icon">
                  <Users size={32} />
                </div>
                <h3>2. {tSteps("meeting")}</h3>
                <p>{tSteps("meeting_desc")}</p>
              </div>
              <div className="step-card">
                <div className="step-icon">
                  <Code size={32} />
                </div>
                <h3>3. {tSteps("process")}</h3>
                <p>{tSteps("process_desc")}</p>
              </div>
              <div className="step-card">
                <div className="step-icon">
                  <CheckCircle size={32} />
                </div>
                <h3>4. {tSteps("delivery")}</h3>
                <p>{tSteps("delivery_desc")}</p>
              </div>
            </div>

            <div className="steps-success-stat" style={{ marginTop: "60px" }}>
              <div className="stat-icon-wrapper">
                <Star size={42} strokeWidth={1.5} fill="var(--accent-color)" fillOpacity={0.2} />
              </div>
              <h3>{tSteps("success_stat")}</h3>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ — the six answers that used to sit invisibly in the site-wide
          JSON-LD. Rendered visibly so the FAQPage markup on this page is
          honest, and because they answer exactly what a buyer weighs before
          writing: price, speed, languages, support. */}
      <section id="faq" className="home-faq-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">{tFaq("title")}</h2>
          </FadeInSection>
          <FadeInSection>
            <div className="home-faq-list">
              {faqItems.map((item, i) => (
                <details key={i} className="home-faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 7. INLINE CONTACT FORM — Упрощённая форма прямо на странице */}
      <FadeInSection>
        <InlineContactForm />
      </FadeInSection>

      <ScrollToHash />
    </div>
  );
}
