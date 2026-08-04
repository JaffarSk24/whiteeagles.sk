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
  const title = t((service.seoTitleKey as any) || (service.titleKey as any));
  const description = t((service.seoDescKey as any) || (service.descKey as any));
  const pageUrl = `https://whiteeagles.sk/${locale}/service/${id}/`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        sk: `https://whiteeagles.sk/sk/service/${id}/`,
        en: `https://whiteeagles.sk/en/service/${id}/`,
        ru: `https://whiteeagles.sk/ru/service/${id}/`,
        "x-default": `https://whiteeagles.sk/sk/service/${id}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
    },
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

  // Only some services carry extended content. `t.has` avoids next-intl
  // logging a MISSING_MESSAGE error for every service that does not.
  const page = t.has(`services.${id}.page` as any)
    ? (t.raw(`services.${id}.page` as any) as {
        lead?: string;
        process_title?: string;
        process?: string[];
        cases_title?: string;
        cases?: string[];
        geo_title?: string;
        geo?: string;
        faq_title?: string;
        faq?: { q: string; a: string }[];
      })
    : null;

  const homeName = locale === "ru" ? "Главная" : locale === "sk" ? "Domov" : "Home";
  const serviceTitle = t((service.internalTitleKey as any) || (service.titleKey as any));
  const serviceDescription = t((service.internalDescKey as any) || (service.descKey as any));

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `https://whiteeagles.sk/${locale}/service/${id}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": homeName,
            "item": `https://whiteeagles.sk/${locale}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": serviceTitle,
            "item": `https://whiteeagles.sk/${locale}/service/${id}/`
          }
        ]
      },
      {
        "@type": "Service",
        "@id": `https://whiteeagles.sk/${locale}/service/${id}/#service`,
        "name": serviceTitle,
        "description": serviceDescription,
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://whiteeagles.sk/#localbusiness",
          "name": "White Eagles & Co."
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": service.priceMin || service.priceRate,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": service.priceRate,
            "priceCurrency": "EUR",
            "unitText": "hour"
          },
          "url": `https://whiteeagles.sk/${locale}/service/${id}/`
        }
      },
      ...(page?.faq?.length
        ? [{
            "@type": "FAQPage",
            "@id": `https://whiteeagles.sk/${locale}/service/${id}/#faq`,
            "mainEntity": page.faq.map((item) => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a },
            })),
          }]
        : []),
    ]
  };

  return (
    <div className="service-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <div className="container">
        <Link href="/" className="back-btn">
          ← {tCommon("back")}
        </Link>

        <div className="detail-content">
          <div className="detail-header">
            <h1 className="detail-title">{t((service.internalTitleKey as any) || (service.titleKey as any))}</h1>
            {page?.lead && <p className="detail-lead">{page.lead}</p>}
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

            <div className="detail-pricing-row">
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

              {/* Payment methods */}
              <div className="service-payment-icons">
                <div className="spi-item"><FileText size={18} /><span>{tAbout("payment_invoice")}</span></div>
                <div className="spi-item"><CreditCard size={18} /><span>{tAbout("payment_card")}</span></div>
                <div className="spi-item"><CircleDollarSign size={18} /><span>{tAbout("payment_usdt")}</span></div>
                <div className="spi-item"><Bitcoin size={18} /><span>{tAbout("payment_bitcoin")}</span></div>
                <div className="spi-item"><RussianRuble size={18} /><span>{tAbout("payment_rub")}</span></div>
                <div className="spi-item"><span className="payment-uah-icon">&#8372;</span><span>{tAbout("payment_uah")}</span></div>
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

          {page && (
            <div className="detail-extended">
              {page.process?.length ? (
                <section className="detail-block">
                  <h2>{page.process_title}</h2>
                  <ol className="detail-steps">
                    {page.process.map((step, i) => (
                      <li key={i}>
                        <span className="detail-step-num">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {page.cases?.length ? (
                <section className="detail-block">
                  <h2>{page.cases_title}</h2>
                  <ul className="detail-cases">
                    {page.cases.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </section>
              ) : null}

              {page.geo ? (
                <section className="detail-block detail-geo">
                  <h2>{page.geo_title}</h2>
                  <p>{page.geo}</p>
                </section>
              ) : null}

              {page.faq?.length ? (
                <section className="detail-block">
                  <h2>{page.faq_title}</h2>
                  <div className="detail-faq">
                    {page.faq.map((item, i) => (
                      <details key={i} className="detail-faq-item">
                        <summary>{item.q}</summary>
                        <p>{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
