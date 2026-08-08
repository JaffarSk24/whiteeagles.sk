import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileText } from "lucide-react";
import "../Legal.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cookies" });
  return {
    title: t("title"),
    description: t("description"),
    // Its own address, not the locale home page. Without this the page
    // inherits the layout's canonical and tells Google it is a duplicate of
    // the home page - while also carrying noindex, which is contradictory.
    alternates: { canonical: `https://whiteeagles.sk/${locale}/cookies/` },
    // Kept out of the index, but the links are still worth following: nofollow
    // only throws away the internal links this page carries.
    robots: { index: false, follow: true },
  };
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cookies" });
  const tCompany = await getTranslations({ locale, namespace: "company" });

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <FileText size={48} className="legal-icon" />
          <h1>{t("title")}</h1>
        </div>
        <div className="legal-content">
          <p>{t("intro")}</p>

          <section>
            <h2>1. {t("what_are_title")}</h2>
            <p>{t("what_are_text")}</p>
          </section>

          <section>
            <h2>2. {t("usage_title")}</h2>
            <p>{t("usage_text")}</p>
            <ul>
              <li><strong>Google Analytics (GA4):</strong> {t("ga4_desc")}</li>
              <li><strong>Google Ads:</strong> {t("ads_desc")}</li>
              <li><strong>Meta Pixel:</strong> {t("meta_desc")}</li>
              <li><strong>Microsoft Clarity:</strong> {t("clarity_desc")}</li>
            </ul>
          </section>

          <section>
            <h2>3. {t("management_title")}</h2>
            <p>{t("management_text")}</p>
          </section>

          <div className="legal-footer-note">
            <p>
              <strong>{tCompany("name")}</strong>
            </p>
            <p>{tCompany("address")}</p>
            <p>{tCompany("id")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
