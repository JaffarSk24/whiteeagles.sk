import React from "react";
import { ogImageFor } from "@/utils/ogImage";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ArrowLeft, Check, Code2, ShieldCheck } from "lucide-react";
import { AuditCTA } from "@/components/AuditCTA";
import { AppDownloads } from "@/components/AppDownloads";
import { apps } from "@/data/apps";
import "@/components/AuditCTA.css";
import "./Apps.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const siteUrl = "https://whiteeagles.sk";
const path = (locale: string) => `${siteUrl}/${locale}/apps/`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "apps" });

  return {
    title: { absolute: t("seo_title") },
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
      images: [{ url: ogImageFor(locale), width: 1200, height: 630 }],
    },
  };
}

export default async function AppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "apps" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const principles = t.raw("principles") as string[];
  const faq = t.raw("faq") as { q: string; a: string }[];
  const homeName = locale === "ru" ? "Главная" : locale === "sk" ? "Domov" : "Home";

  const downloadLabels = {
    macArm: t("download_mac_arm"),
    macIntel: t("download_mac_intel"),
    mac: t("download_mac"),
    windows: t("download_windows"),
    phone: t("download_phone"),
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${path(locale)}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeName, item: `${siteUrl}/${locale}/` },
          { "@type": "ListItem", position: 2, name: t("h1"), item: path(locale) },
        ],
      },
      // One SoftwareApplication per app. The download URL is the Windows
      // installer because it is the one file that serves every Windows
      // machine; the Mac builds are listed on the page itself.
      ...apps.map((app) => ({
        "@type": "SoftwareApplication",
        "@id": `${path(locale)}#${app.id}`,
        name: app.name,
        description: t(`items.${app.id}.description`),
        applicationCategory: app.category,
        operatingSystem: "macOS, Windows",
        softwareVersion: app.release.version,
        datePublished: app.release.publishedAt,
        downloadUrl: app.release.assets.windows?.url,
        installUrl: app.release.page,
        screenshot: `${siteUrl}${app.screenshot}`,
        image: `${siteUrl}${app.icon}`,
        isAccessibleForFree: true,
        license: "https://opensource.org/licenses/MIT",
        sameAs: app.repoUrl,
        url: path(locale),
        inLanguage: ["en", "ru"],
        offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
      })),
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
    <div className="apps-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="container">
        <Link href="/" className="back-btn">
          <ArrowLeft size={16} /> {tCommon("back")}
        </Link>

        <header className="apps-header">
          <h1>{t("h1")}</h1>
          <p className="apps-lead">{t("lead")}</p>
        </header>

        <section className="apps-section">
          <h2>{t("who_title")}</h2>
          <p>{t("who_text")}</p>
        </section>

        <section className="apps-section">
          <h2>{t("principles_title")}</h2>
          <ul className="apps-principles">
            {principles.map((point, i) => (
              <li key={i}>
                <ShieldCheck size={18} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {apps.map((app) => {
          const features = t.raw(`items.${app.id}.features`) as string[];
          const macCommand = `xattr -cr "/Applications/${app.macAppName}.app"`;
          return (
            <article className="app-card" key={app.id} id={app.id}>
              <div className="app-card-head">
                {/* The icons are small PNGs from the apps' own repositories. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={app.icon} alt="" width={56} height={56} />
                <div>
                  <h2>{app.name}</h2>
                  <p className="app-tagline">{t(`items.${app.id}.tagline`)}</p>
                </div>
              </div>
              <div className="app-card-body">
              <div className="app-card-text">
              <p className="app-card-desc">{t(`items.${app.id}.description`)}</p>

              <ul className="app-features">
                {features.map((f, i) => (
                  <li key={i}>
                    <Check size={18} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <AppDownloads appId={app.id} release={app.release} phoneUrl={app.phoneUrl} labels={downloadLabels} />

              <p className="app-version">
                {t("version", { version: app.release.version, date: app.release.publishedAt })}
                {" · "}
                <a href={app.release.page} target="_blank" rel="noopener noreferrer">{t("all_releases")}</a>
              </p>
              <p className="app-links">
                <a href={app.repoUrl} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> {t("source")}</a>
                <a href={app.privacyUrl} target="_blank" rel="noopener noreferrer">{t("privacy")}</a>
              </p>
              </div>

              {/* Beside the text on a wide screen, under the description on a phone. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="app-shot" src={app.screenshot} alt={`${app.name}: ${t(`items.${app.id}.tagline`)}`} width={1200} height={750} loading="lazy" />
              </div>

              <div className="app-notes">
                {app.phoneUrl && (
                  <details>
                    <summary>{t("phone_title")}</summary>
                    <p>{t("phone_text")}</p>
                  </details>
                )}
                <details>
                  <summary>{t("mac_note_title")}</summary>
                  <p>{t("mac_note")}</p>
                  <pre><code>{macCommand}</code></pre>
                </details>
                <details>
                  <summary>{t("win_note_title")}</summary>
                  <p>{t("win_note")}</p>
                </details>
              </div>
            </article>
          );
        })}

        <AuditCTA
          service="webdev"
          title={t("cta_title")}
          text={t("cta_text")}
          buttonText={t("cta_button")}
          position="apps_bottom"
        />

        <section className="apps-section">
          <h2>{t("faq_title")}</h2>
          <div className="apps-faq">
            {faq.map((item, i) => (
              <details key={i}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
