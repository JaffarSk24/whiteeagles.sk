import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts, shortDescription } from '@/utils/blog';
import { BLOG_TOPIC_ORDER, topicForKey, type BlogTopic } from '@/data/blog-topics';
import { Calendar } from 'lucide-react';
import './Blog.css';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const pageUrl = `https://whiteeagles.sk/${locale}/blog/`;
  const title = t('seo_title');
  const description = t('seo_description');
  const isEnglish = locale === 'en';

  // See the comment in blog/[slug]/page.tsx - the English blog is deindexed.
  const languages = isEnglish
    ? undefined
    : {
        sk: 'https://whiteeagles.sk/sk/blog/',
        ru: 'https://whiteeagles.sk/ru/blog/',
        'x-default': 'https://whiteeagles.sk/sk/blog/',
      };

  return {
    title,
    description,
    ...(isEnglish ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: pageUrl,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: [{ url: '/assets/snippet.png', width: 1200, height: 630 }],
    },
  };
}
export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);

  // Thirty-four articles in one grid asked the reader to scan the whole blog
  // to find the one thing they came for. Grouped by subject, the section they
  // need is one glance away; the order inside a section stays newest first,
  // which is how getAllPosts already returns them.
  const grouped = BLOG_TOPIC_ORDER.map((topic: BlogTopic) => ({
    topic,
    items: posts.filter((post) => topicForKey(post.key) === topic),
  })).filter((group) => group.items.length > 0);

  const dateLocale = locale === 'sk' ? 'sk-SK' : locale === 'ru' ? 'ru-RU' : 'en-US';

  const homeName = locale === "ru" ? "Главная" : locale === "sk" ? "Domov" : "Home";
  const blogName = locale === "ru" ? "Блог" : locale === "sk" ? "Blog" : "Blog";

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `https://whiteeagles.sk/${locale}/blog/#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeName,
        "item": `https://whiteeagles.sk/${locale}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": blogName,
        "item": `https://whiteeagles.sk/${locale}/blog/`
      }
    ]
  };

  return (
    <div className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <div className="container">
        <h1 className="section-title">{t('title')}</h1>
        <p className="blog-intro">{t('intro')}</p>

        {grouped.map((group) => (
          <section key={group.topic} className="blog-topic">
            <h2 className="blog-topic-title">{t(`topics.${group.topic}` as any)}</h2>

            <div className="blog-grid">
              {group.items.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-content">
                    <h3>{post.title}</h3>
                    <p className="blog-card-desc">{shortDescription(post.description, 120)}</p>

                    <div className="blog-card-footer">
                      <span className="blog-date">
                        <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                        {new Date(post.date).toLocaleDateString(dateLocale)}
                      </span>
                      <span className="blog-read-more">{t('read_more')} →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
