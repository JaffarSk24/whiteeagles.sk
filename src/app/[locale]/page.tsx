"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { services } from "../../data/services";
import {
  FileText,
  Users,
  Code,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Briefcase,
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
import Image from "next/image";
import "./Home.css";

export default function Home() {
  const t = useTranslations();
  const tHome = useTranslations("home_seo");
  const tAbout = useTranslations("about");
  const tSteps = useTranslations("steps");
  const tServicesNS = useTranslations("services");
  const tContacts = useTranslations("contacts");
  const tPortfolio = useTranslations("portfolio");
  const tCommon = useTranslations("common");

  const pathname = usePathname();
  const router = useRouter();
  const { openOrderModal } = useOrderModal();

  useEffect(() => {
    // Basic hash handling if someone navigates with /#hash
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="home-page">
      {/* About Section (Moved to top per new design) */}
      <section id="about" className="about-section">
        <div className="container">
          <h1 className="section-title">{tAbout("title")}</h1>
          <div className="about-grid">
            <div className="about-image">
              <picture>
                <source srcSet="/assets/me-small.webp" media="(max-width: 768px)" type="image/webp" />
                <source srcSet="/assets/me.webp" type="image/webp" />
                <img
                  src="/assets/me.jpg"
                  alt="Kirill"
                  width={800}
                  height={1024}
                  style={{ width: "100%", height: "auto", borderRadius: "20px" }}
                />
              </picture>
            </div>
            <div className="about-content">
              <div className="about-text">
                <p className="greeting-text">
                  <strong>
                    {tAbout("greeting")} {tAbout("name_intro")}
                  </strong>
                </p>
                <p>{tAbout("years_sk")}</p>
                <p>{tAbout("knowledge")}</p>

                <div className="pride-block">
                  <h2>{tAbout("pride_title")}</h2>
                  <p>{tAbout("pride_desc")}</p>
                </div>

                <div className="about-cta">
                  <p>{tAbout("cta_text")}</p>
                  <button className="btn btn-liquid" onClick={() => openOrderModal()}>
                    {tAbout("cta_button")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="steps-success-stat" style={{ margin: "60px auto" }}>
            <div className="stat-icon-wrapper">
              <Star size={42} strokeWidth={1.5} fill="var(--accent-color)" fillOpacity={0.2} />
            </div>
            <h3>{tSteps("success_stat")}</h3>
          </div>

          <ClientCarousel />
        </div>
      </section>

      {/* Services Section */}
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
                    {!service.image && <div className="img-overlay"></div>}
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

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">{tPortfolio("title")}</h2>
            <PortfolioCarousel />
          </FadeInSection>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="steps-section">
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
                    {tSteps("request_desc_link")} {/* Requires adding this key to translations */}
                  </button>{" "}
                  {tSteps("request_desc_rest")} {/* Requires adding this key to translations */}
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
          </FadeInSection>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="contacts-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">{tContacts("title")}</h2>
            <div className="contacts-grid">
              <div className="contact-card">
                <div className="contact-icon">
                  <Briefcase size={32} />
                </div>
                <h3>{tContacts("company_label")}</h3>
                <p>White Eagles & Co. s.r.o.</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <MapPin size={32} />
                </div>
                <h3>{tContacts("office_label")}</h3>
                <a href="https://maps.app.goo.gl/QfAQ1H71k2zF1cq9A" target="_blank" rel="noopener noreferrer">
                  {tContacts("address")}
                </a>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <Mail size={32} />
                </div>
                <h3>{tContacts("email_label")}</h3>
                <a
                  href="mailto:welcome@whiteeagles.sk"
                  onClick={() =>
                    trackGAEvent("contact_click", { method: "email", link_url: "mailto:welcome@whiteeagles.sk" })
                  }
                >
                  welcome@whiteeagles.sk
                </a>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <Phone size={32} />
                </div>
                <h3>{tContacts("phone_label")}</h3>
                <a
                  href="tel:+421949000077"
                  onClick={() =>
                    trackGAEvent("contact_click", { method: "phone", link_url: "tel:+421949000077" })
                  }
                >
                  +421 949 0000 77
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
