import React from "react";
import { getTranslations } from "next-intl/server";
import { services } from "../data/services";

export async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const tHomeSeo = await getTranslations({ locale, namespace: "home_seo" });
  const tRoot = await getTranslations({ locale });

  const siteUrl = "https://whiteeagles.sk";
  const orgName = "White Eagles & Co.";
  const legalName = "White Eagles & Co. s.r.o.";

  // Social media links
  const sameAsLinks = [
    "https://t.me/whiteeaglessk",
    "https://wa.me/421949000077",
    "https://www.facebook.com/slovakiainheart",
    "https://www.linkedin.com/company/110639977",
    "https://github.com/JaffarSk24",
    "https://www.upwork.com/freelancers/~01e1569e9346f49762",
    "https://maps.app.goo.gl/mNvmqnVMEykyvkPT8"
  ];

  // Multilingual FAQ Items
  const faqItems = [
    {
      "@type": "Question",
      "name": locale === "ru" 
        ? "Сколько стоит создание сайта и от чего зависит цена?" 
        : locale === "sk" 
        ? "Koľko stojí tvorba webstránky a od čoho závisí cena?" 
        : "How much does a website cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" 
          ? "Стоимость разработки сайта в 2026 году варьируется от 5000 € за простой лендинг до 35000 €+ за сложный портал или SaaS. Цена зависит от типа сайта, сложности функционала (интеграции CRM, платежи), дизайна. Базовая ставка работы специалистов White Eagles & Co. начинается от 35€ в час. Все платежи прозрачны и согласуются без сложного ТЗ." 
          : locale === "sk"
          ? "Cena za vývoj webstránky v roku 2026 sa pohybuje od 5000 € za jednoduchú pristávaciu stránku (landing page) až po viac ako 35000 € za komplexný portál alebo SaaS. Cena závisí od typu webu, náročnosti funkcií (integrácia CRM, platby) a dizajnu. Základná hodinová sadzba odborníkov z White Eagles & Co. začína od 35 € za hodinu. Všetky platby sú transparentné a dohodnuté bez zložitého zadania."
          : "In 2026, custom website development costs range from €5,000 for a landing page to €35,000+ for complex portals or SaaS products. The price depends on features, integrations, and design. Our base hourly rate starts at €35/hour with transparent billing and no complex briefs required."
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" 
        ? "Какие типы сайтов бывают и какой нужен мне?" 
        : locale === "sk"
        ? "Aké sú typy webstránok a ktorú potrebujem?"
        : "What types of websites do you build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" 
          ? "Основные типы: лендинг, сайт-визитка, корпоративный сайт, интернет-магазин (eshop) и портал/SaaS. Для B2B-услуг обычно подходит корпоративный сайт с портфолио, блогом и формой заявок. Мы также помогаем внедрить онлайн-платежи и систему резерваций." 
          : locale === "sk"
          ? "Hlavné typy sú: landing page, vizitka, firemný web, e-shop a portál/SaaS. Pre B2B služby je zvyčajne vhodný firemný web s portfóliom, blogom a kontaktným formulárom. Taktiež pomáhame s integráciou online platieb a rezervačných systémov."
          : "We build landing pages, business websites, corporate portals, e-commerce stores, and custom SaaS platforms. For B2B businesses, we typically recommend a corporate site with a portfolio, blog, and contact forms. We also integrate payment gateways and reservation systems."
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" 
        ? "Говорите ли вы по-русски и как оплатить услуги?" 
        : locale === "sk"
        ? "Hovoríte po rusky a aké sú platobné metódy?"
        : "Do you speak English/Russian and what are the payment methods?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" 
          ? "Да, основатель компании Кирилл Мосин и команда свободно говорят по-русски, что идеально для экспатов и релокантов, открывающих бизнес в Словакии, Чехии или Австрии. Мы предлагаем гибкие способы оплаты: банковский перевод (faktúra), оплата картой, криптовалюта (USDT, Bitcoin), рубли (RUB) и гривны (UAH)." 
          : locale === "sk"
          ? "Áno, zakladateľ spoločnosti Kirill Mosin a jeho tím hovoria plynule po rusky, čo je ideálne pre expatov, ktorí zakladajú podnikanie na Slovensku, v Česku alebo v Rakúsku. Ponúkame flexibilné možnosti platby: bankový prevod (faktúra), platba kartou, kryptomeny (USDT, Bitcoin), ruble (RUB) a hrivny (UAH)."
          : "Yes, our team speaks fluent Slovak, English, and Russian, which is ideal for expats starting businesses in Slovakia, Czechia, or Austria. We offer flexible payment options: bank transfer (invoice), credit card, cryptocurrency (USDT, Bitcoin), and other currencies."
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" 
        ? "Что входит в техподдержку после запуска?" 
        : locale === "sk"
        ? "Čo zahŕňa technická podpora po spustení webu?"
        : "What is included in technical support after launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" 
          ? "Техподдержка White Eagles & Co. включает бесплатную помощь на протяжении 6 месяцев: мониторинг доступности сайта, резервные копии, обновления CMS (WordPress, плагинов), исправление багов и консультации по SEO-оптимизации." 
          : locale === "sk"
          ? "Technická podpora od White Eagles & Co. zahŕňa bezplatnú pomoc po dobu 6 mesiacov: monitorovanie dostupnosti webu, zálohovanie, aktualizácie CMS (WordPress, pluginy), opravu chýb a SEO konzultácie."
          : "White Eagles & Co. provides 6 months of free technical support with every project. This includes uptime monitoring, automated backups, CMS/plugin updates, bug fixes, and basic SEO consultations."
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" 
        ? "Сколько времени занимает разработка от брифа до запуска?" 
        : locale === "sk"
        ? "Ako dlho trvá vývoj webstránky?"
        : "How long does development take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" 
          ? "Полный цикл разработки обычно занимает 1–2 недели для лендинга или сайта-визитки, 2–4 недели для корпоративного сайта. 90% сложных проектов White Eagles & Co. выполняет в течение 15 рабочих дней благодаря опыту и отсутствию бюрократии." 
          : locale === "sk"
          ? "Celý cyklus vývoja zvyčajne trvá 1-2 týždne pre landing page alebo vizitku a 2-4 týždne pre firemný web. 90 % zložitých projektov realizuje White Eagles & Co. do 15 pracovných dní vďaka skúsenostiam a minimu byrokracie."
          : "Development typically takes 1-2 weeks for a landing page or promo site and 2-4 weeks for a full corporate site. Thanks to our streamlined workflow and low bureaucracy, 90% of complex projects are completed within 15 working days."
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" 
        ? "Как настроить кампанию в Google Ads и интегрировать ее с сайтом?" 
        : locale === "sk"
        ? "Ako nastaviť kampaň v Google Ads a prepojiť ju s webom?"
        : "How do you set up Google Ads and Analytics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" 
          ? "Мы подключаем Google Tag Manager (GTM), настраиваем Server-Side Tracking, Google Analytics 4 (GA4) и связываем их с Google Ads. Мы собираем полные данные о конверсиях (лиды, звонки, e-commerce покупки) для обучения автоматических стратегий (Maximize Conversions / Target ROAS)." 
          : locale === "sk"
          ? "Nastavujeme Google Tag Manager (GTM), Server-Side Tracking, Google Analytics 4 (GA4) a prepájame ich s Google Ads. Zhromažďujeme kompletné dáta o konverziách (dopyty, hovory, nákupy v e-shope) na optimalizáciu automatických stratégií (Maximize Conversions / Target ROAS)."
          : "We configure Google Tag Manager (GTM), Server-Side Tracking for GA4, and link them to Google Ads. We track all conversions (leads, calls, purchases) to feed Google's automated bidding algorithms (Maximize Conversions / Target ROAS) for maximum ROI."
      },
    },
  ];

  // Dynamic Service List Markup
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
      {
        "@type": "Country",
        "name": "Slovakia",
      },
      {
        "@type": "Country",
        "name": "Czechia",
      },
      {
        "@type": "Country",
        "name": "Austria",
      }
    ],
    "description": tRoot(service.descKey as any),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": service.priceRate,
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
        "url": siteUrl,
        "logo": `${siteUrl}/assets/white-eagles-logo-white.webp`,
        "image": `${siteUrl}/assets/me.jpg`,
        "sameAs": sameAsLinks,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+421949000077",
          "contactType": "customer service",
          "email": "welcome@whiteeagles.sk",
          "availableLanguage": ["Russian", "Slovak", "English"],
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
        "worksFor": { "@id": `${siteUrl}/#organization` },
        "knowsLanguage": ["sk", "ru", "en"],
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
        "priceRange": "$$",
        "currenciesAccepted": "EUR, USD, RUB, UAH",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, Crypto",
        "description": tHomeSeo("description"),
        "parentOrganization": { "@id": `${siteUrl}/#organization` },
        "founder": { "@id": `${siteUrl}/#founder` },
        // Serving customers in Russian is the core differentiator, so it is
        // declared explicitly rather than left implicit in the copy.
        "knowsLanguage": ["sk", "ru", "en"],
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
