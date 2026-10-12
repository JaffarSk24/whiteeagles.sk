"use client";

// The interactive pieces of the home page. Everything else on it is rendered
// on the server by HomeContent.tsx: until 12 Oct 2026 the whole page was one
// client component, so the phone had to run the code for every static block
// again while loading, and formatting the payment note alone cost a 56 ms
// task (4x slowed CPU) in the middle of it.

import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Send, MessageCircle, Mail } from "lucide-react";
import { useOrderModal } from "../../components/AppShell";
import { trackGAEvent } from "../../utils/analytics";

// =========================================
// HERO BUTTONS
// =========================================
export function HeroActions({ cta, ctaSecondary }: { cta: string; ctaSecondary: string }) {
  const { openOrderModal } = useOrderModal();

  const scrollToClients = () => {
    const el = document.getElementById("portfolio");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="hero-cta-group">
      <button
        className="btn btn-activate"
        onClick={() => {
          trackGAEvent("cta_click", { location: "hero_primary" });
          openOrderModal();
        }}
      >
        {cta}
      </button>
      <button className="hero-cta-secondary" onClick={scrollToClients}>
        {ctaSecondary} <ArrowRight size={16} />
      </button>
    </div>
  );
}

// =========================================
// ORDER BUTTON (service cards, process step 1)
// =========================================
export function OrderButton({
  serviceId,
  type,
  className,
  style,
  children,
}: {
  serviceId?: string;
  type?: "button";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const { openOrderModal } = useOrderModal();
  return (
    <button type={type} className={className} style={style} onClick={() => openOrderModal(serviceId)}>
      {children}
    </button>
  );
}

// =========================================
// SCROLL TO #section WHEN THE PAGE OPENS WITH ONE
// =========================================
export function ScrollToHash() {
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

  return null;
}

// =========================================
// INLINE CONTACT FORM SECTION
// =========================================
export function InlineContactForm() {
  const t = useTranslations("contact_form");
  const tOrder = useTranslations("order");
  const locale = useLocale();

  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) return;

    setStatus("sending");
    trackGAEvent("form_submit", { form_id: "inline_contact" });

    try {
      const isEmail = form.contact.includes("@");

      const res = await fetch("/api/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: isEmail ? form.contact : "",
          phone: !isEmail ? form.contact : "",
          message: form.message || t("default_message"),
          service: t("service_name"),
          language: locale,
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
