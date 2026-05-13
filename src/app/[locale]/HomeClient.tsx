"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { services } from "../../data/services";
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
} from "lucide-react";
import { ClientCarousel } from "../../components/ClientCarousel";
import { PortfolioCarousel } from "../../components/PortfolioCarousel";
import { FadeInSection } from "../../components/FadeInSection";
import { trackGAEvent } from "../../utils/analytics";
import { useOrderModal } from "../../components/AppShell";
import { HeroSection, TestimonialsSection, InlineContactForm } from "./HeroAndExtras";
import "./Home.css";
import "./HeroAndExtras.css";

export default function HomeClient() {
  const t = useTranslations();
  const tSteps = useTranslations("steps");
  const tServicesNS = useTranslations("services");
  const tPortfolio = useTranslations("portfolio");
  const tCommon = useTranslations("common");
  const tAbout = useTranslations("about");

  const router = useRouter();
  const { openOrderModal } = useOrderModal();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

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
                    <button
                      className="btn btn-secondary"
                      onClick={() => router.push(`/service/${service.id}` as any)}
                    >
                      {tServicesNS("more_info")}
                    </button>
                    <button className="btn btn-primary" onClick={() => openOrderModal(service.id)}>
                      {tServicesNS("order")}
                    </button>
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
                  <span>{tAbout("payment_usdt")}</span>
                </div>
                <div className="payment-item">
                  <Bitcoin size={24} />
                  <span>{tAbout("payment_bitcoin")}</span>
                </div>
                <div className="payment-item">
                  <RussianRuble size={24} />
                  <span>{tAbout("payment_rub")}</span>
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
                  <span>{tAbout("payment_uah")}</span>
                </div>
              </div>
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
                  <button
                    type="button"
                    onClick={() => openOrderModal()}
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
                  </button>{" "}
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

      {/* 7. INLINE CONTACT FORM — Упрощённая форма прямо на странице */}
      <FadeInSection>
        <InlineContactForm />
      </FadeInSection>

    </div>
  );
}
