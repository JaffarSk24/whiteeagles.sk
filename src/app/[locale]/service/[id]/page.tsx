import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ShieldCheck, FileText, CreditCard, CircleDollarSign, Bitcoin, RussianRuble } from "lucide-react";
import { services } from "../../../../data/services";

import { ServiceDetailClient } from "./ServiceDetailClient";
import "./ServiceDetail.css";

// Generate static params for static export
export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: { index: false, follow: false },
    };
  }

  const t = await getTranslations({ locale });

  return {
    title: t((service.seoTitleKey as any) || (service.titleKey as any)),
    description: t((service.seoDescKey as any) || (service.descKey as any)),
    keywords: t((service.seoKeywordsKey as any) || "agency"),
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="container not-found" style={{ padding: "120px 0", textAlign: "center" }}>
        <h2>Service not found</h2>
        <Link href="/" className="btn btn-secondary" style={{ marginTop: "20px", display: "inline-block" }}>
          <ArrowLeft size={16} style={{ verticalAlign: "middle", marginRight: "8px" }} /> Back to Home
        </Link>
      </div>
    );
  }

  const t = await getTranslations({ locale });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tAbout = await getTranslations({ locale, namespace: "about" });

  // Get points array from translations
  // Next-intl doesn't return arrays directly with `t()`, but we can check using raw config or structured objects.
  // Instead, since it's a dynamic structure, we can map over 1..10 until it's missing or use `getMessages()`
  // The easiest way is to pass raw strings and render them client-side if needed, but let's try server side:
  const rawPoints = (t.raw(`${service.detailsKey}_points` as any) as string[]) || [];

  return (
    <div className="service-detail-page">
      <div className="container">
        <Link href="/" className="back-btn">
          ← {tCommon("back")}
        </Link>

        <div className="detail-content">
          <div className="detail-header">
            <h1 className="detail-title">{t((service.internalTitleKey as any) || (service.titleKey as any))}</h1>
          </div>

          <div className="detail-card">
            {service.id === "webdev" && (
              <img src="/assets/icons/webdev-icon.png" alt="Web Development" className="service-detail-icon" />
            )}
            {service.id === "bugfix" && (
              <img src="/assets/icons/bugfix-icon.png" alt="Bugfix" className="service-detail-icon" />
            )}
            {service.id === "ads" && (
              <img src="/assets/icons/ads-icon.png" alt="Ads" className="service-detail-icon" />
            )}
            {service.id === "analytics" && (
              <img src="/assets/icons/analytics-icon.png" alt="Analytics" className="service-detail-icon" />
            )}
            {service.id === "cookies" && (
              <img src="/assets/icons/cookies-icon.png" alt="Cookies" className="service-detail-icon" />
            )}
            {service.id === "telegram" && (
              <img src="/assets/icons/telegram-icon.png" alt="Telegram Bots" className="service-detail-icon" />
            )}
            <p className="detail-desc">{t((service.internalDescKey as any) || (service.descKey as any))}</p>

            <div className="detail-full-info">
              <h3>{t("services.details")}</h3>

              {Array.isArray(rawPoints) && rawPoints.length > 0 ? (
                <ul className="details-list">
                  {rawPoints.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{t(service.detailsKey as any)}</p>
              )}

              {(service.id === "webdev" || service.id === "analytics" || service.id === "telegram") && (
                <div className="guarantee-block">
                  <div className="guarantee-icon">
                    <ShieldCheck size={32} />
                  </div>
                  <p>{t("services.webdev.guarantee")}</p>
                </div>
              )}
            </div>

            <div className="detail-pricing">
              <span className="price-tag">
                {service.priceRate}€ / {tCommon("hour")}
              </span>
              {service.priceMin && (
                <span className="price-min-tag">
                  {tCommon("from")} {service.priceMin}€
                </span>
              )}
            </div>

            {/* Payment methods block */}
            <div className="payment-options-block service-payment-block">
              <h3>{tAbout("payment_title")}</h3>
              <div className="payment-list">
                <div className="payment-item"><FileText size={24} /><span>{tAbout("payment_invoice")}</span></div>
                <div className="payment-item"><CreditCard size={24} /><span>{tAbout("payment_card")}</span></div>
                <div className="payment-item"><CircleDollarSign size={24} /><span>{tAbout("payment_usdt")}</span></div>
                <div className="payment-item"><Bitcoin size={24} /><span>{tAbout("payment_bitcoin")}</span></div>
                <div className="payment-item"><RussianRuble size={24} /><span>{tAbout("payment_rub")}</span></div>
                <div className="payment-item">
                  <span style={{ fontSize: "36px", fontWeight: "normal", lineHeight: "0.7", paddingTop: "6px", marginBottom: "7px", display: "flex", alignItems: "center", justifyContent: "center", height: "24px", width: "24px", color: "var(--accent-color)" }}>&#8372;</span>
                  <span>{tAbout("payment_uah")}</span>
                </div>
              </div>
            </div>

            {/* Client component for the order button */}
            <ServiceDetailClient
              serviceId={service.id}
              orderText={t("services.apply")}
              price={service.priceMin || service.priceRate}
              title={t(service.titleKey as any)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
