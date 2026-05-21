import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/utils/blog';
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
  
  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        sk: 'https://whiteeagles.sk/sk/blog/',
        en: 'https://whiteeagles.sk/en/blog/',
        ru: 'https://whiteeagles.sk/ru/blog/',
        'x-default': 'https://whiteeagles.sk/sk/blog/',
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
    },
  };
}
export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);

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
        
        <div className="blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-content">
                <h2>{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                
                <div className="blog-card-footer">
                  <span className="blog-date">
                    <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    {new Date(post.date).toLocaleDateString(locale === 'sk' ? 'sk-SK' : locale === 'ru' ? 'ru-RU' : 'en-US')}
                  </span>
                  <span className="blog-read-more">{t('read_more')} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
