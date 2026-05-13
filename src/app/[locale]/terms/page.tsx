import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileText } from "lucide-react";
import "../Legal.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false }, // noindex
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });
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
            <h2>1. {t("general_title")}</h2>
            <p>{t("general_text")}</p>
          </section>

          <section>
            <h2>2. {t("services_title")}</h2>
            <p>{t("services_text")}</p>
          </section>

          <section>
            <h2>3. {t("payment_title")}</h2>
            <p>{t("payment_text")}</p>
          </section>

          <section>
            <h2>4. {t("liability_title")}</h2>
            <p>{t("liability_text")}</p>
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
