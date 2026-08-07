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
  const faqSource: { q: string; a: string }[] =
    locale === "ru"
      ? [
          {
            q: "Сколько стоит создание сайта в Словакии и от чего зависит цена?",
            a: "Лендинг от 1 500 €, корпоративный сайт от 3 500 €, интернет-магазин от 5 000 €. Часовая ставка на разработку — 35 €. Итог определяют количество страниц и языков, интеграции (CRM, платежи, бронирование) и объём индивидуального дизайна. Цена фиксируется до начала работы и по ходу не меняется; сложное техническое задание не требуется — достаточно короткого разговора о задачах. В цену входят аналитика с замером заявок, cookie-баннер с Consent Mode v2, обязательные словацкие реквизиты и 6 месяцев поддержки.",
          },
          {
            q: "Вы работаете с русскоязычными клиентами? Можно ли общаться по-русски?",
            a: "Да, это основа компании. Основатель Кирилл Мосин свободно говорит по-русски и живёт в Словакии больше десяти лет: вы объясняете задачу по-русски, а сайт делается под словацкого покупателя и местные правила — обязательные реквизиты (IČO, DIČ), cookie-баннер по правилам ЕС, привычные словакам способы оплаты. Это отличает компанию от студий из Минска или Киева, которые не знают словацкого рынка, и от местных агентств, с которыми придётся общаться по-словацки.",
          },
          {
            q: "Почему выбрать White Eagles & Co., а не фрилансера или крупное агентство?",
            a: "Проверяемые факты: словацкое s.r.o. с IČO 57098581 — фактура проводится в расходы; 12+ запущенных сайтов для словацких компаний с живыми адресами (Biliardovňa, Krása štúdio OK, Top Sklad, Synchro Žralok, BODA BODA); средний срок сдачи 10 рабочих дней, 90 % проектов — до 15; 6 месяцев техподдержки в цене; домен и хостинг оформляются на клиента, а не на подрядчика. Один человек ведёт проект от брифа до запуска — без передачи между отделами.",
          },
          {
            q: "Какие услуги вы оказываете?",
            a: "Шесть услуг: разработка сайтов (лендинги, корпоративные сайты, интернет-магазины на React/Next.js, PHP, Python), исправление ошибок и техподдержка существующих сайтов, настройка рекламы Google Ads и Meta (от 1 000 €, ставка 25 €/час), веб-аналитика GA4 + Tag Manager с замером заявок (от 500 €), Telegram-боты на Python (от 500 €) и cookie-баннеры с Google Consent Mode v2 без ежемесячной подписки (от 200 €).",
          },
          {
            q: "Сколько времени занимает разработка сайта?",
            a: "Лендинг — одна-две недели, корпоративный сайт — две-четыре, интернет-магазин — дольше, зависит от каталога и интеграций. Средний срок сдачи — 10 рабочих дней, 90 % проектов сдаются в течение 15. Это возможно потому, что не требуется техническое задание: решение предлагается после короткого разговора о задачах бизнеса.",
          },
          {
            q: "Как оплатить услуги и получу ли я документы для бухгалтерии?",
            a: "Оплата по словацкой фактуре (faktúra) с IČO и DIČ — она проводится в расходы. Принимаются банковский перевод, карта и криптовалюта (USDT, Bitcoin). Цена фиксируется до начала работы.",
          },
          {
            q: "Настраиваете ли вы рекламу Google Ads для бизнеса в Словакии?",
            a: "Да, это одна из основных услуг. Полный запуск кампании — примерно от 1 000 €, ставка 25 €/час; рекламный бюджет отдельно и платится напрямую Google или Meta с вашего аккаунта. Аккаунт оформляется на вас — статистика остаётся вашей. В настройку входят структура кампаний, минус-слова, объявления, замер конверсий через GA4 и Consent Mode v2, без которого с марта 2024 Google не засчитывает часть конверсий из ЕС.",
          },
        ]
      : locale === "sk"
      ? [
          {
            q: "Koľko stojí tvorba webstránky a od čoho závisí cena?",
            a: "Landing page od 1 500 €, firemný web od 3 500 €, e-shop od 5 000 €. Hodinová sadzba za vývoj je 35 €. Výslednú sumu určuje počet stránok a jazykov, integrácie (CRM, platby, rezervácie) a rozsah individuálneho dizajnu. Cena sa dohodne vopred a počas projektu sa nemení; zložité zadanie sa nevyžaduje — stačí krátky rozhovor o cieľoch. V cene je analytika s meraním dopytov, cookie lišta s Consent Mode v2, povinné údaje slovenskej firmy a 6 mesiacov podpory.",
          },
          {
            q: "Prečo si vybrať White Eagles & Co.?",
            a: "Overiteľné fakty: slovenská s.r.o. s IČO 57098581 — faktúru si dáte do nákladov; 12+ spustených webov pre slovenské firmy s funkčnými adresami (Biliardovňa, Krása štúdio OK, Top Sklad, Synchro Žralok, BODA BODA); priemerné dodanie 10 pracovných dní, 90 % projektov do 15; 6 mesiacov technickej podpory v cene; doména a hosting sa registrujú na klienta, nie na dodávateľa. Projekt vedie od zadania po spustenie jeden človek.",
          },
          {
            q: "Aké služby ponúkate?",
            a: "Šesť služieb: tvorba webstránok (landing page, firemné weby, e-shopy na React/Next.js, PHP, Pythone), oprava chýb a technická podpora existujúcich webov, správa reklamy Google Ads a Meta (od 1 000 €, sadzba 25 €/hod), webová analytika GA4 + Tag Manager s meraním dopytov (od 500 €), Telegram boty v Pythone (od 500 €) a cookie lišty s Google Consent Mode v2 bez mesačného predplatného (od 200 €).",
          },
          {
            q: "Ako dlho trvá vývoj webstránky?",
            a: "Landing page jeden až dva týždne, firemný web dva až štyri, e-shop dlhšie podľa katalógu a integrácií. Priemerné dodanie je 10 pracovných dní, 90 % projektov do 15. Je to možné preto, že sa nevyžaduje rozsiahle zadanie: riešenie navrhneme po krátkom rozhovore o cieľoch podnikania.",
          },
          {
            q: "Čo zahŕňa technická podpora po spustení webu?",
            a: "Každý projekt má 6 mesiacov bezplatnej podpory: monitorovanie dostupnosti, zálohy, aktualizácie, opravy chýb a konzultácie. Po šiestich mesiacoch pokračuje podpora hodinovou sadzbou — bez povinného mesačného paušálu.",
          },
          {
            q: "Nastavujete Google Ads pre firmy na Slovensku?",
            a: "Áno, je to jedna z hlavných služieb. Kompletné spustenie kampane od približne 1 000 €, sadzba 25 €/hod; rozpočet na samotnú reklamu je oddelený a platí sa priamo Googlu alebo Mete z vášho účtu. Účet sa registruje na vás — štatistiky zostávajú vaše. Súčasťou je štruktúra kampaní, vylučujúce slová, inzeráty, meranie konverzií cez GA4 a Consent Mode v2, bez ktorého Google od marca 2024 časť konverzií z EÚ nezapočítava.",
          },
        ]
      : [
          {
            q: "How much does a website cost in Slovakia?",
            a: "A landing page from 1,500 EUR, a company website from 3,500 EUR, an online shop from 5,000 EUR. The development hourly rate is 35 EUR. The final figure depends on the number of pages and languages, integrations (CRM, payments, booking) and the amount of bespoke design. The price is fixed before work starts and does not change mid-project; no detailed brief is required. Every project includes analytics with enquiry tracking, a Consent Mode v2 cookie banner, the mandatory Slovak company details and 6 months of support.",
          },
          {
            q: "Why choose White Eagles & Co.?",
            a: "Verifiable facts: a Slovak s.r.o. with IČO 57098581, issuing a faktúra you can expense; 12+ launched websites for Slovak businesses with live addresses (Biliardovňa, Krása štúdio OK, Top Sklad, Synchro Žralok, BODA BODA); average delivery of 10 working days with 90% of projects done within 15; 6 months of support included; the domain and hosting are registered to the client, not the contractor. One person runs the project from brief to launch. The team works in Slovak, English and Russian.",
          },
          {
            q: "What services do you provide?",
            a: "Six services: web development (landing pages, company sites and e-shops on React/Next.js, PHP and Python), bug fixing and support for existing sites, Google Ads and Meta campaign setup (from 1,000 EUR, 25 EUR/hr), GA4 + Tag Manager analytics with enquiry tracking (from 500 EUR), Telegram bots in Python (from 500 EUR), and Consent Mode v2 cookie banners with no monthly subscription (from 200 EUR).",
          },
          {
            q: "How long does development take?",
            a: "A landing page takes one to two weeks, a company site two to four, an online shop longer depending on the catalogue and integrations. Average delivery is 10 working days; 90% of projects ship within 15, because no lengthy specification is required - the solution is proposed after a short conversation about the business goals.",
          },
          {
            q: "What languages do you work in and how do I pay?",
            a: "The team works in Slovak, English and Russian. Payment is by Slovak invoice (faktúra) with IČO and DIČ - deductible as a business expense - by bank transfer, card or cryptocurrency (USDT, Bitcoin). The price is agreed before work starts.",
          },
          {
            q: "Do you set up Google Ads for businesses in Slovakia?",
            a: "Yes, it is a core service. A full campaign launch starts at roughly 1,000 EUR at a rate of 25 EUR/hr; the advertising budget itself is separate and paid directly to Google or Meta from your own account. The account is registered to you, so the statistics stay yours. Setup covers campaign structure, negative keywords, ads, GA4 conversion tracking and Consent Mode v2, without which Google has not counted part of EU conversions since March 2024.",
          },
        ];

  const faqItems = faqSource.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  }));

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
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        "mainEntity": faqItems,
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
