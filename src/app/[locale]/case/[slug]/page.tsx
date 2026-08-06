import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getCaseBySlug, getAllCases, getCaseSlugForLocale } from '@/utils/cases';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AuditCTA } from '@/components/AuditCTA';
import '@/components/AuditCTA.css';
import '@/styles/Cases.css';

export function generateStaticParams(props: { params: { locale: string } }) {
  const { locale } = props.params;
  return getAllCases(locale).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const study = getCaseBySlug(slug, locale);

  if (!study) {
    return { title: 'Case Not Found' };
  }

  const pageUrl = `https://whiteeagles.sk/${locale}/case/${slug}/`;
  const isEnglish = locale === 'en';

  // English cases exist so an English visitor has something to read, but they
  // stay out of the index for the same reason as the English blog: they would
  // draw impressions from countries the business does not serve. A noindexed
  // page has no business in anyone's hreflang either.
  // Resolved through the shared key, so a case may carry a different slug in
  // each language without hreflang pointing at an address that does not exist.
  const skSlug = getCaseSlugForLocale(study.key, 'sk');
  const ruSlug = getCaseSlugForLocale(study.key, 'ru');

  const languages = {
    ...(skSlug ? { sk: `https://whiteeagles.sk/sk/case/${skSlug}/` } : {}),
    ...(ruSlug ? { ru: `https://whiteeagles.sk/ru/case/${ruSlug}/` } : {}),
    ...(skSlug ? { 'x-default': `https://whiteeagles.sk/sk/case/${skSlug}/` } : {}),
  };

  return {
    title: study.title,
    description: study.description,
    ...(isEnglish ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: pageUrl, ...(isEnglish ? {} : { languages }) },
    openGraph: {
      title: study.title,
      description: study.description,
      url: pageUrl,
      images: [`https://whiteeagles.sk${study.image}`],
    },
  };
}

export default async function CasePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = getCaseBySlug(slug, locale);

  if (!study) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'cases' });
  const tCta = await getTranslations({ locale, namespace: 'cta' });

  const pageUrl = `https://whiteeagles.sk/${locale}/case/${slug}/`;
  const homeName = locale === 'ru' ? 'Главная' : locale === 'sk' ? 'Domov' : 'Home';

  const others = getAllCases(locale).filter((item) => item.slug !== slug).slice(0, 3);

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeName, item: `https://whiteeagles.sk/${locale}/` },
          { '@type': 'ListItem', position: 2, name: t('title'), item: `https://whiteeagles.sk/${locale}/portfolio/` },
          { '@type': 'ListItem', position: 3, name: study.client, item: pageUrl },
        ],
      },
      {
        // A case study is an article about work done, not the work itself.
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: study.title,
        description: study.description,
        mainEntityOfPage: pageUrl,
        image: `https://whiteeagles.sk${study.image}`,
        about: { '@type': 'Organization', name: study.client, url: study.url },
        author: { '@type': 'Person', name: 'Kirill Mosin', url: 'https://whiteeagles.sk' },
        publisher: { '@id': 'https://whiteeagles.sk/#organization' },
      },
    ],
  };

  return (
    <div className="case-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <div className="container">
        <Link href="/portfolio" className="back-link">
          <ArrowLeft size={16} /> {t('back_to_cases')}
        </Link>

        <article className="case-article">
          <div className="case-meta">
            <span className="case-meta-client">{study.client}</span>
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="case-meta-link">
              {t('live_site')} <ExternalLink size={14} />
            </a>
          </div>

          {study.services.length > 0 && (
            <ul className="case-chips">
              {study.services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          <div className="case-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{study.content}</ReactMarkdown>
          </div>

          <AuditCTA
            title={tCta('consult.title')}
            text={tCta('consult.text')}
            buttonText={tCta('consult.button')}
            position={`case_${slug}_consult`}
          />
        </article>

        {others.length > 0 && (
          <section className="case-more">
            <h2>{t('more_cases')}</h2>
            <ul className="case-grid">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={`/case/${item.slug}`} className="case-card">
                    <img src={item.image} alt={item.client} loading="lazy" />
                    <div className="case-card-body">
                      <h3>{item.client}</h3>
                      <p>{item.summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
