import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllCases } from '@/utils/cases';
import '@/styles/Cases.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cases' });
  const pageUrl = `https://whiteeagles.sk/${locale}/portfolio/`;
  const isEnglish = locale === 'en';

  return {
    title: t('seo_title'),
    description: t('seo_description'),
    // No English case studies exist, so the English page is a link list to the
    // clients' own sites - not something worth putting in the index.
    ...(isEnglish ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: pageUrl,
      ...(isEnglish
        ? {}
        : {
            languages: {
              sk: 'https://whiteeagles.sk/sk/portfolio/',
              ru: 'https://whiteeagles.sk/ru/portfolio/',
              'x-default': 'https://whiteeagles.sk/sk/portfolio/',
            },
          }),
    },
    openGraph: { title: t('seo_title'), description: t('seo_description'), url: pageUrl },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'cases' });
  const cases = getAllCases(locale);

  const homeName = locale === 'ru' ? 'Главная' : locale === 'sk' ? 'Domov' : 'Home';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `https://whiteeagles.sk/${locale}/portfolio/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeName, item: `https://whiteeagles.sk/${locale}/` },
          { '@type': 'ListItem', position: 2, name: t('title'), item: `https://whiteeagles.sk/${locale}/portfolio/` },
        ],
      },
      ...(cases.length
        ? [
            {
              '@type': 'ItemList',
              '@id': `https://whiteeagles.sk/${locale}/portfolio/#list`,
              itemListElement: cases.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.client,
                url: `https://whiteeagles.sk/${locale}/case/${item.slug}/`,
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="case-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <div className="container">
        <header className="case-index-header">
          <h1>{t('title')}</h1>
          <p className="case-index-lead">{t('lead')}</p>
        </header>

        <ul className="case-grid case-grid-index">
          {cases.map((item) => (
            <li key={item.slug}>
              <Link href={`/case/${item.slug}`} className="case-card">
                <img src={item.image} alt={item.client} loading="lazy" />
                <div className="case-card-body">
                  <h2>{item.client}</h2>
                  <p>{item.summary}</p>
                  <span className="case-card-link">{t('read_case')} →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
