import React from "react";
import { getTranslations } from "next-intl/server";
import { services } from "../data/services";

export async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const tHomeSeo = await getTranslations({ locale, namespace: "home_seo" });
  // We need to fetch services translations from the root namespace
  const tRoot = await getTranslations({ locale });

  const siteUrl = "https://whiteeagles.sk";
  const orgName = "White Eagles & Co.";

  const faqItems = [
    {
      "@type": "Question",
      "name": locale === "ru" ? "Сколько стоит создание сайта и от чего зависит цена?" : "How much does a website cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" ? "Стоимость разработки сайта в 2026 году варьируется от 5000 € за простой лендинг до 35000 €+ за сложный портал или SaaS. Цена зависит от типа сайта, сложности функционала (интеграции CRM, платежи), дизайна. Базовая ставка работы специалистов White Eagles & Co. начинается от 35€ в час. Все платежи прозрачны и согласуются без сложного ТЗ." : "Prices range depending on complexity and features. Our base hourly rate is around 35€.",
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" ? "Какие типы сайтов бывают и какой нужен мне?" : "What types of websites do you build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" ? "Основные типы: лендинг, сайт-визитка, корпоративный сайт, интернет-магазин (eshop) и портал/SaaS. Для B2B-услуг обычно подходит корпоративный сайт с портфолио, блогом и формой заявок. Мы также помогаем внедрить онлайн-платежи и систему резерваций." : "We build everything from landing pages and corporate sites to complex e-commerce platforms and SaaS portals.",
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" ? "Говорите ли вы по-русски и как оплатить услуги?" : "Do you speak Russian and what are the payment methods?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" ? "Да, основатель компании Кирилл Мосин и команда свободно говорят по-русски, что идеально для экспатов и релокантов, открывающих бизнес в Словакии, Чехии или Австрии. Мы предлагаем гибкие способы оплаты: банковский перевод (faktúra), оплата картой, криптовалюта (USDT, Bitcoin), рубли (RUB) и гривны (UAH)." : "Yes, we support local and international payments including SEPA, Card, and Crypto (USDT, Bitcoin).",
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" ? "Что входит в техподдержку после запуска?" : "What is included in technical support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" ? "Техподдержка White Eagles & Co. включает бесплатную помощь на протяжении 6 месяцев: мониторинг доступности сайта, резервные копии, обновления CMS (WordPress, плагинов), исправление багов и консультации по SEO-оптимизации." : "We include 6 months of free technical support with our custom builds, covering uptime monitoring, backups, updates, and bug fixes.",
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" ? "Сколько времени занимает разработка от брифа до запуска?" : "How long does development take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" ? "Полный цикл разработки обычно занимает 1–2 недели для лендинга или сайта-визитки, 2–4 недели для корпоративного сайта. 90% сложных проектов White Eagles & Co. выполняет в течение 15 рабочих дней благодаря опыту и отсутствию бюрократии." : "Most of our standard projects are completed within 15 working days.",
      },
    },
    {
      "@type": "Question",
      "name": locale === "ru" ? "Как настроить кампанию в Google Ads и интегрировать ее с сайтом?" : "How do you handle Google Ads and Analytics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": locale === "ru" ? "Мы подключаем Google Tag Manager (GTM), настраиваем Server-Side Tracking, Google Analytics 4 (GA4) и связываем их с Google Ads. Мы собираем полные данные о конверсиях (лиды, звонки, e-commerce покупки) для обучения автоматических стратегий (Maximize Conversions / Target ROAS)." : "We integrate advanced GA4 tracking, GTM, and Google Ads, enabling proper conversion tracking to optimize your ROAS.",
      },
    },
  ];

  // Dynamic Service List Markup
  const servicesList = services.map((service) => ({
    "@type": "Service",
    serviceType: tRoot(service.titleKey as any),
    provider: {
      "@type": "LocalBusiness",
      name: orgName,
    },
    areaServed: {
      "@type": "Country",
      name: "Slovakia",
    },
    description: tRoot(service.descKey as any),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: service.priceRate,
      url: `${siteUrl}/${locale}/service/${service.id}`,
    },
  }));

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: orgName,
        url: siteUrl,
        logo: `${siteUrl}/assets/white-eagles-logo-white.webp`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+421949000077",
          contactType: "customer service",
          email: "welcome@whiteeagles.sk",
          availableLanguage: ["Russian", "Slovak", "English"],
        },
        founder: {
          "@type": "Person",
          name: "Kirill Mosin",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#localbusiness`,
        name: orgName,
        url: siteUrl,
        image: `${siteUrl}/assets/me.jpg`,
        telephone: "+421949000077",
        email: "welcome@whiteeagles.sk",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Holíčska 7",
          addressLocality: "Bratislava",
          postalCode: "851 05",
          addressCountry: "SK",
        },
        priceRange: "$$$",
        description: tHomeSeo("description"),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faqItems,
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
