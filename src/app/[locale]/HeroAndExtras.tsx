"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, ArrowRight, Zap, Award, ChevronDown, Send, MessageCircle, Mail } from "lucide-react";
import { useOrderModal } from "../../components/AppShell";
import { trackGAEvent } from "../../utils/analytics";
import Image from "next/image";

// =========================================
// HERO SECTION
// =========================================
export function HeroSection() {
  const t = useTranslations("hero");

  const { openOrderModal } = useOrderModal();

  const scrollToClients = () => {
    const el = document.getElementById("portfolio");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

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

          <div className="hero-cta-group">
            <button
              className="btn btn-activate"
              onClick={() => {
                trackGAEvent("cta_click", { location: "hero_primary" });
                openOrderModal();
              }}
            >
              {t("cta")}
            </button>
            <button className="hero-cta-secondary" onClick={scrollToClients}>
              {t("cta_secondary")} <ArrowRight size={16} />
            </button>
          </div>

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
export function TestimonialsSection() {
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

// =========================================
// INLINE CONTACT FORM SECTION
// =========================================
export function InlineContactForm() {
  const t = useTranslations("contact_form");
  const tOrder = useTranslations("order");

  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) return;

    setStatus("sending");
    trackGAEvent("form_submit", { form_id: "inline_contact" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          message: form.message || "Відправлено через короткую форму",
          service: "general",
        }),
      });

      if (res.ok) {
        setStatus("success");
        trackGAEvent("order_send", { form_id: "inline_contact" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacts" className="contact-form-section">
      <div className="container">
        <div className="contact-form-inner">
          {/* Left: info */}
          <div className="contact-form-info">
            <h2>{t("title")}</h2>
            <p>{t("subtitle")}</p>

            <div className="contact-direct-links">
              <span className="contact-direct-label">{t("direct_contact")}</span>
              <div className="contact-direct-row">
                <a
                  href="https://wa.me/421949000077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-direct-btn"
                  onClick={() => trackGAEvent("contact_click", { method: "whatsapp" })}
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href="https://t.me/whiteeaglessk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-direct-btn"
                  onClick={() => trackGAEvent("contact_click", { method: "telegram" })}
                >
                  <Send size={16} /> Telegram
                </a>
                <a
                  href="mailto:welcome@whiteeagles.sk"
                  className="contact-direct-btn"
                  onClick={() => trackGAEvent("contact_click", { method: "email" })}
                >
                  <Mail size={16} /> Email
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="inline-contact-form">
            {status === "success" ? (
              <div className="inline-form-success">
                ✅ {tOrder("success")}
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="inline-form-group">
                  <input
                    type="text"
                    className="inline-form-input"
                    placeholder={t("name_placeholder")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    className="inline-form-input"
                    placeholder={t("contact_placeholder")}
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    required
                  />
                  <textarea
                    className="inline-form-input inline-form-textarea"
                    placeholder={t("message_placeholder")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-form-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? tOrder("sending") : t("submit")}
                </button>

                {status === "error" && (
                  <p style={{ color: "#f87171", textAlign: "center", marginTop: "12px", fontSize: "0.9rem" }}>
                    {tOrder("error")}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
