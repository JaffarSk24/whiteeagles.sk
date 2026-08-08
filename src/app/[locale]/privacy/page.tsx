import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileText } from "lucide-react";
import "../Legal.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("title"),
    description: t("description"),
    // Its own address, not the locale home page. Without this the page
    // inherits the layout's canonical and tells Google it is a duplicate of
    // the home page - while also carrying noindex, which is contradictory.
    alternates: { canonical: `https://whiteeagles.sk/${locale}/privacy/` },
    // Kept out of the index, but the links are still worth following: nofollow
    // only throws away the internal links this page carries.
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
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
            <h2>1. {t("controller_title")}</h2>
            <p>{t("controller_text")}</p>
          </section>

          <section>
            <h2>2. {t("data_collection_title")}</h2>
            <p>{t("data_collection_text")}</p>
            <ul>
                <li>Google Console, GTM, GA4</li>
                <li>Meta (Facebook, Instagram)</li>
                <li>Microsoft Clarity</li>
                <li>Bing Console</li>
            </ul>
          </section>

          <section>
            <h2>3. {t("purpose_title")}</h2>
            <p>{t("purpose_text")}</p>
          </section>

          <section>
            <h2>4. {t("advertising_title")}</h2>
            <p>{t("advertising_text")}</p>
            <ul>
                <li>Google Ads</li>
                <li>Meta Ads</li>
            </ul>
          </section>

          <section>
            <h2>5. {t("rights_title")}</h2>
            <p>{t("rights_text")}</p>
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
