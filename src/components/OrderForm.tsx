"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { X, CheckCircle } from "lucide-react";
import { services } from "../data/services";
import { trackGAEvent } from "../utils/analytics";
import { Link } from "@/i18n/navigation";
import Script from "next/script";
import "./OrderForm.css";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({ isOpen, onClose, initialService = "" }) => {
  const t = useTranslations("order");
  const tCommon = useTranslations("common");
  const tServices = useTranslations(); // access to root for service names
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService || services[0].id,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const hasTrackedOpen = React.useRef(false);

  useEffect(() => {
    if (isOpen && !hasTrackedOpen.current) {
      hasTrackedOpen.current = true;
      setFormData((prev) => ({
        ...prev,
        service: initialService || services[0].id,
      }));

      const activeServiceId = initialService || services[0].id;
      const activeObj = services.find((s) => s.id === activeServiceId);

      trackGAEvent("form_open", { service: activeServiceId });
      trackGAEvent("add_to_cart", {
        currency: "EUR",
        value: activeObj?.priceRate || 0,
        items: [
          {
            item_id: activeServiceId,
            item_name: tServices(activeObj?.titleKey || ""),
            price: activeObj?.priceRate || 0,
            quantity: 1,
          },
        ],
      });
    } else if (!isOpen) {
      hasTrackedOpen.current = false;
    }
  }, [isOpen, initialService, tServices]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || (!formData.email && !formData.phone)) {
      alert(t("validation_error")); // "Please fill in required fields."
      return;
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert(t("email_error"));
        return;
      }
    }

    if (formData.phone) {
      const phoneRegex = /^\+?[0-9\s\-\(\)]{9,}$/;
      if (!phoneRegex.test(formData.phone)) {
        alert(t("phone_error"));
        return;
      }
    }

    setStatus("submitting");

    const selectedServiceObj = services.find((s) => s.id === formData.service);
    const serviceName = selectedServiceObj ? tServices(selectedServiceObj.titleKey) : formData.service;
    const priceString = selectedServiceObj ? `${selectedServiceObj.priceRate}€/${tCommon("hour")}` : "";

    try {
      // Execute reCAPTCHA
      // @ts-ignore
      const token = await window.grecaptcha.execute("6LdmAj0sAAAAAOdnsxEGoEH6xx6nw-lXmNQEvUFi", { action: "submit" });

      const response = await fetch("/api/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: serviceName, // Send localized name
          price: priceString, // Send localized price
          language: locale, // Send current language
          recaptchaToken: token,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        sessionStorage.setItem("order_submitted", "true");

        const eventValue = selectedServiceObj?.priceRate || 0;

        trackGAEvent("order_send", {
          source: "order_form",
          service: formData.service,
          value: eventValue,
          currency: "EUR",
          language: locale,
        });

        // No `purchase` event here. Submitting this form is a lead, not a sale:
        // nobody has paid anything. Firing purchase would count every lead a
        // second time (both it and order_send are key events) and would book
        // the hourly rate as revenue that never existed. order_send above is
        // the single key event for a lead.
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleClose = () => {
    if (status !== "success" && status !== "submitting") {
      trackGAEvent("form_abandoned", { service: formData.service });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <Script src="https://www.google.com/recaptcha/api.js?render=6LdmAj0sAAAAAOdnsxEGoEH6xx6nw-lXmNQEvUFi" strategy="lazyOnload" />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <X />
        </button>

        <h2>{t("title")}</h2>

        {status === "success" ? (
          <div className="success-popup">
            <div className="success-icon">
              <CheckCircle size={64} color="var(--accent-color)" />
            </div>
            <h3>{t("success_title")}</h3>
            <p className="success-message-text">{t("success")}</p>
            <button className="btn btn-primary" onClick={handleClose}>
              {tCommon("close")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t("name")} *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("name_placeholder")}
              />
            </div>

            <div className="form-group">
              <label>{t("email")} <span style={{ fontSize: "0.8em", opacity: 0.7 }}>{t("opt_if_phone")}</span></label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t("email_placeholder")}
              />
            </div>

            <div className="form-group">
              <label>{t("phone")} <span style={{ fontSize: "0.8em", opacity: 0.7 }}>{t("opt_if_email")}</span></label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t("phone_placeholder")}
              />
            </div>

            <div className="form-group">
              <label>{t("service")} *</label>
              <select
                value={formData.service}
                onChange={(e) => {
                  const newServiceId = e.target.value;
                  setFormData({ ...formData, service: newServiceId });
                  
                  const newObj = services.find((s) => s.id === newServiceId);
                  if (newObj) {
                    trackGAEvent("view_item", {
                      currency: "EUR",
                      value: newObj.priceRate || 0,
                      items: [
                        {
                          item_id: newServiceId,
                          item_name: tServices(newObj.titleKey),
                          price: newObj.priceRate || 0,
                        },
                      ],
                    });
                    trackGAEvent("add_to_cart", {
                      currency: "EUR",
                      value: newObj.priceRate || 0,
                      items: [
                        {
                          item_id: newServiceId,
                          item_name: tServices(newObj.titleKey),
                          price: newObj.priceRate || 0,
                          quantity: 1,
                        },
                      ],
                    });
                  }
                }}
                required
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {tServices(service.titleKey)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                {t("message")} <span style={{ fontSize: "0.8em", opacity: 0.7, marginLeft: "6px" }}>({tCommon("optional")})</span>
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={status === "submitting"}>
              {status === "submitting" ? t("sending") : t("submit")}
            </button>

            {status === "error" && <p className="error-text">{t("error")}</p>}

            <div className="privacy-note">
              <p>
                {t.rich("privacy", {
                  link: (chunks) => (
                    <Link href="/privacy" className="privacy-link" target="_blank">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
