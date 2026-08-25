import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ArrowLeft, Check } from "lucide-react";
import { AuditCTA } from "@/components/AuditCTA";
import slugMap from "@/data/slug-map.json";
import "@/components/AuditCTA.css";
import "./SeoAudit.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const path = (locale: string) => `https://whiteeagles.sk/${locale}/seo-audit/`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit" });

  return {
    title: t("seo_title"),
    description: t("seo_desc"),
    alternates: {
      canonical: path(locale),
      languages: {
        sk: path("sk"),
        en: path("en"),
        ru: path("ru"),
        "x-default": path("sk"),
      },
    },
    openGraph: {
      title: t("seo_title"),
      description: t("seo_desc"),
      url: path(locale),
    },
  };
}

export default async function SeoAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "audit" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const checkPoints = t.raw("check_points") as string[];
  const getPoints = t.raw("get_points") as string[];
  const timePoints = t.raw("time_points") as string[];
  const faq = t.raw("faq") as { q: string; a: string }[];

  const homeName = locale === "ru" ? "Главная" : locale === "sk" ? "Domov" : "Home";

  // The DIY article and this page were competing for the same queries. The
  // link makes the split explicit: this page is for having it done, the
  // article for doing it yourself. Slug per language comes from the map so
  // it cannot drift out of sync with the content.
  const diySlug = (slugMap.blog as Record<string, Partial<Record<string, string>>>)[
    "seo-audit-check-website"
  ]?.[locale];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${path(locale)}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: homeName,
            item: `https://whiteeagles.sk/${locale}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("h1"),
            item: path(locale),
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${path(locale)}#service`,
        name: t("h1"),
        description: t("seo_desc"),
        serviceType: t("h1"),
        provider: {
          "@type": "LocalBusiness",
          "@id": "https://whiteeagles.sk/#localbusiness",
          name: "White Eagles & Co.",
        },
        areaServed: [
          { "@type": "Country", name: "Slovakia" },
          { "@type": "City", name: "Bratislava" },
        ],
        // The audit genuinely costs nothing, so the offer says zero rather
        // than carrying the hourly rate used by the paid services.
        offers: {
          "@type": "Offer",
          price: 0,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: path(locale),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${path(locale)}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="seo-audit-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container">
        <Link href="/" className="back-btn">
          <ArrowLeft size={16} /> {tCommon("back")}
        </Link>

        <header className="audit-header">
          <h1>{t("h1")}</h1>
          <p className="audit-lead">{t("lead")}</p>
        </header>

        <section className="audit-section">
          <h2>{t("what_title")}</h2>
          <p>{t("what_text")}</p>
        </section>

        <AuditCTA
          title={t("cta_title")}
          text={t("cta_text")}
          buttonText={t("cta_button")}
          position="seo_audit_top"
        />

        <section className="audit-section">
          <h2>{t("why_title")}</h2>
          <p>{t("why_text")}</p>
        </section>

        <section className="audit-section">
          <h2>{t("check_title")}</h2>
          <ul className="audit-list">
            {checkPoints.map((point, i) => (
              <li key={i}>
                <Check size={18} className="audit-list-icon" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="audit-section">
          <h2>{t("get_title")}</h2>
          <ul className="audit-list">
            {getPoints.map((point, i) => (
              <li key={i}>
                <Check size={18} className="audit-list-icon" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <AuditCTA
          title={t("cta_title")}
          text={t("cta_text")}
          buttonText={t("cta_button")}
          position="seo_audit_middle"
        />

        <section className="audit-section">
          <h2>{t("time_title")}</h2>
          <ol className="audit-steps">
            {timePoints.map((point, i) => (
              <li key={i}>
                <span className="audit-step-num">{i + 1}</span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="audit-section">
          <h2>{t("who_title")}</h2>
          <p>{t("who_text")}</p>
        </section>

        {diySlug && (
          <section className="audit-section">
            <h2>{t("diy_title")}</h2>
            <p>
              {t("diy_text")}{" "}
              <Link href={`/blog/${diySlug}` as any}>{t("diy_link")}</Link>.
            </p>
          </section>
        )}

        <section className="audit-section audit-trust">
          <h2>{t("trust_title")}</h2>
          <p>{t("trust_text")}</p>
        </section>

        <section className="audit-section">
          <h2>{t("faq_title")}</h2>
          <div className="audit-faq">
            {faq.map((item, i) => (
              <details key={i} className="audit-faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <AuditCTA
          title={t("cta_title")}
          text={t("cta_text")}
          buttonText={t("cta_button")}
          position="seo_audit_bottom"
        />
      </div>
    </div>
  );
}
