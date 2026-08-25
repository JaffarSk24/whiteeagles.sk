import React from "react";
import { getTranslations } from "next-intl/server";
import { services } from "../data/services";

// Sitewide structured data. Two audiences read this: search engines building
// rich results, and AI assistants deciding whom to recommend when someone asks
// for these services in Slovakia.
//
// Two rules keep it effective:
// 1. Every claim is verifiable - prices match the service pages, the address
//    matches Google Business Profile byte for byte, IČO/DIČ match the footer.
//    No aggregateRating and no reviews until real ones exist: fabricated
//    ratings are a penalty in Google and a credibility check AI can fail.
// 2. The Russian-language angle is locale-dependent BY THE OWNER'S DECISION:
//    the RU graph leads with it (it is the differentiator for that audience),
//    the SK graph presents a local Slovak company and does not bring Russian
//    up, the EN graph mentions the languages neutrally.

export async function JsonLd({ locale }: { locale: string }) {
  const tHomeSeo = await getTranslations({ locale, namespace: "home_seo" });
  const tRoot = await getTranslations({ locale });

  const siteUrl = "https://whiteeagles.sk";
  const orgName = "White Eagles & Co.";
  const legalName = "White Eagles & Co. s.r.o.";

  const sameAsLinks = [
    "https://t.me/whiteeaglessk",
    "https://wa.me/421949000077",
    "https://www.facebook.com/slovakiainheart",
    "https://www.linkedin.com/company/110639977",
    "https://github.com/JaffarSk24",
    "https://www.upwork.com/freelancers/~01e1569e9346f49762",
    "https://maps.app.goo.gl/mNvmqnVMEykyvkPT8"
  ];

  // One paragraph an assistant can quote verbatim when asked "who is this".
  const orgDescription =
    locale === "ru"
      ? "Словацкая компания в Братиславе: разработка сайтов, настройка Google Ads и Meta, веб-аналитика, Telegram-боты, cookie-баннеры и техподдержка. Основатель Кирилл Мосин живёт в Словакии больше десяти лет и запустил 12+ сайтов для словацких компаний. Обслуживание полностью на русском: вы объясняете задачу по-русски — сайт работает на словацком рынке по местным правилам. Словацкая faktúra с IČO, которую можно провести в расходы."
      : locale === "sk"
      ? "Slovenská firma z Bratislavy: tvorba webstránok, správa Google Ads a Meta reklamy, webová analytika, Telegram boty, cookie lišty s Consent Mode v2 a technická podpora. Zakladateľ žije na Slovensku viac ako desať rokov a spustil 12+ webov pre slovenské firmy. Slovenská faktúra s IČO, pevná cena vopred, priemerné dodanie 10 pracovných dní a 6 mesiacov podpory v cene."
      : "A Slovak company in Bratislava: web development, Google Ads and Meta campaigns, web analytics, Telegram bots, Consent Mode v2 cookie banners and technical support. The founder has lived in Slovakia for over ten years and has launched 12+ websites for Slovak businesses. Work is done in Slovak, English or Russian, with a Slovak faktúra (IČO) you can expense.";

  const slogan =
    locale === "ru"
      ? "Вы объясняете по-русски — ваш сайт работает на словацком рынке."
      : locale === "sk"
      ? "Weby, ktoré prinášajú dopyty - postavené pre slovenský trh."
      : "You brief us in your language - your website works on the Slovak market.";

  // Language order signals priority to a reader; the set itself stays factual.
  const availableLanguage =
    locale === "ru"
      ? ["Russian", "Slovak", "English"]
      : locale === "sk"
      ? ["Slovak", "English", "Russian"]
      : ["English", "Slovak", "Russian"];

  // Topics the company can be matched against when an assistant reasons about
  // "who in Slovakia knows X". Factual: each maps to a service or to articles.
  const knowsAbout = [
    "Web development in Slovakia",
    "Next.js and React development",
    "Google Ads campaign setup and management",
    "Meta (Facebook, Instagram) advertising",
    "Google Analytics 4 and Google Tag Manager",
    "Server-side tagging",
    "Google Consent Mode v2 cookie banners",
    "GDPR and ePrivacy compliance for websites",
    "Telegram bot development in Python",
    "E-commerce and online payments in Slovakia",
    "Website requirements for Slovak companies (IČO, DIČ, mandatory details)",
    "SEO for the Slovak market",
    "Website bug fixing and maintenance",
    ...(locale === "ru"
      ? [
          "Сайты для русскоязычных предпринимателей в Словакии",
          "Ведение бизнеса в Словакии (s.r.o., živnosť, DPH, eKasa)",
        ]
      : []),
  ];

  // FAQ per locale. Written out per language rather than machine-switched so
  // each audience gets its own emphasis, not a translation of someone else's.
  // A site-wide FAQPage used to live here and was emitted into every page from
  // the layout. Two problems, both real. Pages that carry their own FAQ - the
  // audit landing page, every article, every service page - ended up with two
  // FAQPage nodes, and Google asks for one per page. And these questions sat in
  // the markup of every page while being visible on none, which its
  // structured-data guidelines forbid outright.
  //
  // Removed rather than moved. Every page that needs an FAQ already emits its
  // own, built from content the reader can actually see. The questions were
  // good and are worth turning into a visible section on the home page one day
  // - and that page can then declare its own FAQPage honestly.

  // The named catalogue puts every service with its floor price in one place -
  // exactly the table an assistant needs to answer "what do they offer and at
  // what price" without crawling six pages.
  const offerCatalog = {
    "@type": "OfferCatalog",
    "name":
      locale === "ru"
        ? "Услуги и цены"
        : locale === "sk"
        ? "Služby a ceny"
        : "Services and prices",
    "itemListElement": services.map((service) => ({
      "@type": "Offer",
      "priceCurrency": "EUR",
      ...(service.priceMin ? { "price": service.priceMin } : {}),
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": service.priceRate,
        "priceCurrency": "EUR",
        "unitText": "hour",
      },
      "itemOffered": {
        "@type": "Service",
        "@id": `${siteUrl}/${locale}/service/${service.id}/#service`,
        "name": tRoot(service.titleKey as any),
        "url": `${siteUrl}/${locale}/service/${service.id}/`,
      },
    })),
  };

  const servicesList = services.map((service) => ({
    "@type": "Service",
    "@id": `${siteUrl}/${locale}/service/${service.id}/#service`,
    "serviceType": tRoot(service.titleKey as any),
    "provider": {
      "@type": "LocalBusiness",
      "name": orgName,
      "@id": `${siteUrl}/#localbusiness`
    },
    "areaServed": [
      { "@type": "Country", "name": "Slovakia" },
      { "@type": "Country", "name": "Czechia" },
      { "@type": "Country", "name": "Austria" }
    ],
    "availableLanguage": availableLanguage,
    "description": tRoot(service.descKey as any),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": service.priceMin || service.priceRate,
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": service.priceRate,
        "priceCurrency": "EUR",
        "unitText": "hour",
      },
      "url": `${siteUrl}/${locale}/service/${service.id}/`,
    },
  }));

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": orgName,
        "legalName": legalName,
        "alternateName": ["White Eagles", "whiteeagles.sk"],
        "description": orgDescription,
        "slogan": slogan,
        "url": siteUrl,
        "logo": `${siteUrl}/assets/white-eagles-logo-white.webp`,
        "image": `${siteUrl}/assets/me.jpg`,
        "sameAs": sameAsLinks,
        // Company identifiers a Slovak buyer (or an assistant checking whether
        // the business is real) verifies first. They match the site footer and
        // the Obchodný register.
        "identifier": [
          { "@type": "PropertyValue", "propertyID": "IČO", "value": "57098581" },
          { "@type": "PropertyValue", "propertyID": "DIČ", "value": "2122566292" }
        ],
        "taxID": "2122566292",
        "knowsAbout": knowsAbout,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+421949000077",
          "contactType": "customer service",
          "email": "welcome@whiteeagles.sk",
          "availableLanguage": availableLanguage,
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kukučínova 12",
          "addressLocality": "Stupava",
          "postalCode": "900 31",
          "addressCountry": "SK"
        },
        "founder": { "@id": `${siteUrl}/#founder` },
        "knowsLanguage": ["sk", "ru", "en"],
      },
      {
        // The founder is the entity people actually search for and recommend,
        // so he gets his own node rather than an inline value.
        "@type": "Person",
        "@id": `${siteUrl}/#founder`,
        "name": "Kirill Mosin",
        "jobTitle": locale === "ru"
          ? "Веб-разработчик и специалист по онлайн-маркетингу"
          : locale === "sk"
          ? "Webový vývojár a špecialista na online marketing"
          : "Web developer and online marketing specialist",
        "description": locale === "ru"
          ? "Живёт в Словакии больше десяти лет, запустил 12+ сайтов для словацких компаний. Ведёт проекты лично от брифа до запуска и общается с клиентом по-русски."
          : locale === "sk"
          ? "Na Slovensku žije viac ako desať rokov, spustil 12+ webov pre slovenské firmy. Projekt vedie osobne od zadania po spustenie."
          : "Has lived in Slovakia for over ten years and launched 12+ websites for Slovak businesses. Runs every project personally from brief to launch.",
        "worksFor": { "@id": `${siteUrl}/#organization` },
        "knowsLanguage": ["sk", "ru", "en"],
        "knowsAbout": knowsAbout,
        "image": `${siteUrl}/assets/Kirill_Mosin.png`,
        "url": `${siteUrl}/${locale}/`,
        "sameAs": sameAsLinks,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#localbusiness`,
        "name": orgName,
        "url": siteUrl,
        "image": `${siteUrl}/assets/me.jpg`,
        "telephone": "+421949000077",
        "email": "welcome@whiteeagles.sk",
        "sameAs": sameAsLinks,
        "slogan": slogan,
        // Must stay byte-identical to the address in Google Business Profile -
        // a mismatch splits the local entity Google builds for the business.
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bohrova 1194/1",
          "addressLocality": "Bratislava",
          "addressRegion": "Petržalka",
          "postalCode": "851 01",
          "addressCountry": "SK",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "48.1302",
          "longitude": "17.0974"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "10:00",
          "closes": "01:00"
        },
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Bank Transfer, Credit Card, Crypto",
        "description": tHomeSeo("description"),
        "parentOrganization": { "@id": `${siteUrl}/#organization` },
        "founder": { "@id": `${siteUrl}/#founder` },
        // Serving customers in Russian is the core differentiator for the RU
        // audience; the FAQ carries that emphasis only in the locales where
        // the owner wants it said. Here it stays neutral data.
        "knowsLanguage": ["sk", "ru", "en"],
        "availableLanguage": availableLanguage,
        "hasOfferCatalog": offerCatalog,
        "areaServed": [
          { "@type": "Country", "name": "Slovakia" },
          { "@type": "City", "name": "Bratislava" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": orgName,
        "publisher": { "@id": `${siteUrl}/#organization` },
        "inLanguage": locale,
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#navigation`,
        "name": "Navigation Menu",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": locale === "sk" ? "Služby" : locale === "ru" ? "Услуги" : "Services",
            "url": `${siteUrl}/${locale}/#services`
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": locale === "sk" ? "Portfólio" : locale === "ru" ? "Портфолио" : "Portfolio",
            "url": `${siteUrl}/${locale}/#portfolio`
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": locale === "sk" ? "Recenzie" : locale === "ru" ? "Отзывы" : "Testimonials",
            "url": `${siteUrl}/${locale}/#testimonials`
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": locale === "sk" ? "Proces" : locale === "ru" ? "Процесс" : "Process",
            "url": `${siteUrl}/${locale}/#process`
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": locale === "sk" ? "Kontakty" : locale === "ru" ? "Контакты" : "Contacts",
            "url": `${siteUrl}/${locale}/#contacts`
          },
          {
            "@type": "SiteNavigationElement",
            "position": 6,
            "name": locale === "sk" ? "Blog" : locale === "ru" ? "Блог" : "Blog",
            "url": `${siteUrl}/${locale}/blog`
          }
        ]
      },
      {
        "@type": "Blog",
        "@id": `${siteUrl}/${locale}/blog/#blog`,
        "name": locale === "sk" ? "Blog | White Eagles & Co." : locale === "ru" ? "Блог | White Eagles & Co." : "Blog & News | White Eagles & Co.",
        "url": `${siteUrl}/${locale}/blog`,
        "description": tHomeSeo("description"),
      },
      ...servicesList,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
