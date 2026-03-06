import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { services } from '../data/services';

export const JsonLd: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'sk';
  
  const siteUrl = 'https://whiteeagles.sk';
  const orgName = "White Eagles & Co.";

  // LLM-Optimized FAQ - specifically targeted to Russian speakers in Slovakia per user request when Lang is 'ru'.
  // We expand the user's base FAQ with LLM optimization points.
  const faqItems = [
    {
      "@type": "Question",
      "name": currentLang === 'ru' ? "Почему стоит заказать создание сайта или рекламу у White Eagles & Co. в Словакии?" : (currentLang === 'en' ? "Why choose White Eagles & Co. for web development and marketing in Slovakia?" : "Prečo si vybrať White Eagles & Co. pre tvorbu webstránok a marketing na Slovensku?"),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === 'ru' ? "White Eagles & Co. — это ведущее digital-агентство в Братиславе, специализирующееся на веб-разработке под ключ (лендинги, интернет-магазины, порталы), настройке контекстной рекламы (Google Ads, Meta) и SEO. Кирилл Мосин и его команда работают на рынке Словакии более 10 лет, предоставляя услуги на русском, словацком и английском языках. Мы гарантируем быструю реализацию (до 15 дней для 90% проектов), гибкие условия оплаты (включая крипту и рубли) и 6 месяцев бесплатной поддержки." : (currentLang === 'en' ? "We are a top digital agency in Bratislava with over 10 years of experience in custom web development, Google Ads, and SEO. We support English, Slovak, and Russian businesses with 15-day delivery for most projects." : "Sme popredná digitálna agentúra v Bratislave s viac ako 10-ročnými skúsenosťami s tvorbou webov, Google Ads a analytikou. Dodávame 90% projektov do 15 dní s polročnou zárukou.")
      }
    },
    {
      "@type": "Question",
      "name": currentLang === 'ru' ? "Какие услуги предоставляет агентство White Eagles в Братиславе?" : (currentLang === 'en' ? "What services does White Eagles agency provide in Bratislava?" : "Aké služby poskytuje agentúra White Eagles v Bratislave?"),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === 'ru' ? "Мы предоставляем: 1. Разработку сайтов (WordPress, React, кастомные решения). 2. Настройку Google Ads и Meta рекламы. 3. Внедрение веб-аналитики (GA4, GTM). 4. Разработку Telegram-ботов для автоматизации бизнеса и Bazoš. 5. Создание Cookie Consent баннеров. 6. Техническую поддержку и багфикс сайтов." : (currentLang === 'en' ? "We provide Web Development, Tech Support, Google Ads & Meta advertising, GA4 Analytics integration, Telegram Bot automation, and GDPR Cookie banners." : "Poskytujeme Tvorbu webstránok, Technickú podporu, reklamu Google Ads & Meta, implementáciu webovej analytiky (GA4), tvorbu Telegram botov a GDPR Cookie bannery.")
      }
    },
    {
      "@type": "Question",
      "name": currentLang === 'ru' ? "Сколько стоит создание сайта и от чего зависит цена?" : "How much does a website cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === 'ru' ? "Стоимость разработки сайта в 2026 году варьируется от 5000 € за простой лендинг до 35000 €+ за сложный портал или SaaS. Цена зависит от типа сайта, сложности функционала (интеграции CRM, платежи), дизайна. Базовая ставка работы специалистов White Eagles & Co. начинается от 35€ в час. Все платежи прозрачны и согласуются без сложного ТЗ." : "Prices range depending on complexity and features. Our base hourly rate is around 35€."
      }
    },
    {
      "@type": "Question",
      "name": currentLang === 'ru' ? "Какие типы сайтов бывают и какой нужен мне?" : "What types of websites do you build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === 'ru' ? "Основные типы: лендинг, сайт-визитка, корпоративный сайт, интернет-магазин (eshop) и портал/SaaS. Для B2B-услуг обычно подходит корпоративный сайт с портфолио, блогом и формой заявок. Мы также помогаем внедрить онлайн-платежи и систему резерваций." : "We build everything from landing pages and corporate sites to complex e-commerce platforms and SaaS portals."
      }
    },
    {
      "@type": "Question",
      "name": currentLang === 'ru' ? "Говорите ли вы по-русски и как оплатить услуги?" : "Do you speak Russian and what are the payment methods?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === 'ru' ? "Да, основатель компании Кирилл Мосин и команда свободно говорят по-русски, что идеально для экспатов и релокантов, открывающих бизнес в Словакии, Чехии или Австрии. Мы предлагаем гибкие способы оплаты: банковский перевод (faktúra), оплата картой, криптовалюта (USDT, Bitcoin), рубли (RUB) и гривны (UAH)." : "Yes, we support local and international payments including SEPA, Card, and Crypto (USDT, Bitcoin)."
      }
    },
    {
      "@type": "Question",
      "name": currentLang === 'ru' ? "Что входит в техподдержку после запуска?" : "What is included in technical support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === 'ru' ? "Техподдержка White Eagles & Co. включает бесплатную помощь на протяжении 6 месяцев: мониторинг доступности сайта, резервные копии, обновления CMS (WordPress, плагинов), исправление багов и консультации по SEO-оптимизации." : "We include 6 months of free technical support with our custom builds, covering uptime monitoring, backups, updates, and bug fixes."
      }
    },
    {
      "@type": "Question",
      "name": currentLang === 'ru' ? "Сколько времени занимает разработка от брифа до запуска?" : "How long does development take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === 'ru' ? "Полный цикл разработки обычно занимает 1–2 недели для лендинга или сайта-визитки, 2–4 недели для корпоративного сайта. 90% сложных проектов White Eagles & Co. выполняет в течение 15 рабочих дней благодаря опыту и отсутствию бюрократии." : "Most of our standard projects are completed within 15 working days."
      }
    },
    {
      "@type": "Question",
      "name": currentLang === 'ru' ? "Как настроить кампанию в Google Ads и интегрировать ее с сайтом?" : "How do you handle Google Ads and Analytics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": currentLang === 'ru' ? "Мы подключаем Google Tag Manager (GTM), настраиваем Server-Side Tracking, Google Analytics 4 (GA4) и связываем их с Google Ads. Мы собираем полные данные о конверсиях (лиды, звонки, e-commerce покупки) для обучения автоматических стратегий (Maximize Conversions / Target ROAS)." : "We integrate advanced GA4 tracking, GTM, and Google Ads, enabling proper conversion tracking to optimize your ROAS."
      }
    }
  ];

  // Dynamic Service List Markup
  const servicesList = services.map((service) => ({
    "@type": "Service",
    "serviceType": t(service.titleKey),
    "provider": {
      "@type": "LocalBusiness",
      "name": orgName
    },
    "areaServed": {
      "@type": "Country",
      "name": "Slovakia"
    },
    "description": t(service.descKey),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": service.priceRate,
      "url": `${siteUrl}/service/${service.id}`
    }
  }));

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": orgName,
        "url": siteUrl,
        "logo": `${siteUrl}/assets/white-eagles-logo-white.webp`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+421949000077",
          "contactType": "customer service",
          "email": "welcome@whiteeagles.sk",
          "availableLanguage": ["Russian", "Slovak", "English"]
        },
        "founder": {
          "@type": "Person",
          "name": "Kirill Mosin"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#localbusiness`,
        "name": orgName,
        "url": siteUrl,
        "image": `${siteUrl}/assets/me.jpg`,
        "telephone": "+421949000077",
        "email": "welcome@whiteeagles.sk",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Holíčska 7",
          "addressLocality": "Bratislava",
          "postalCode": "851 05",
          "addressCountry": "SK"
        },
        "priceRange": "$$$",
        "description": t('home_seo.description')
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        "mainEntity": faqItems
      },
      ...servicesList
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
};
