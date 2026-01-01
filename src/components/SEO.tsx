import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  image = '/assets/white-eagles-logo-white.png', // Default OG Image
  type = 'website',
  noindex = false
}) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language ? i18n.language.split('-')[0] : 'sk';
  
  const siteUrl = 'https://whiteeagles.sk';
  // Construct canonical URL based on current language
  // SK is default (root), others use query param
  const canonicalUrl = lang === 'sk' 
    ? `${siteUrl}${location.pathname}`.replace(/\/$/, '') 
    : `${siteUrl}${location.pathname}?lng=${lang}`.replace(/\/$/, '');

  const displayTitle = title 
    ? (title.includes('White Eagles') ? title : `${title} | White Eagles & Co.`) 
    : 'White Eagles & Co. - Digital Services';
  const displayDesc = description || 'Professional web development and marketing services in Slovakia.';
  const displayKeywords = keywords || 'web development, marketing, slovakia, digital agency, seo, ppc, social media';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={displayDesc} />
      <meta name="keywords" content={displayKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <html lang={lang} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for SEO Indexing */}
      <link rel="alternate" hrefLang="sk" href={`${siteUrl}${location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${location.pathname}?lng=en`} />
      <link rel="alternate" hrefLang="ru" href={`${siteUrl}${location.pathname}?lng=ru`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${location.pathname}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDesc} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="White Eagles & Co." />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : lang === 'ru' ? 'ru_RU' : 'sk_SK'} />
      {lang !== 'en' && <meta property="og:locale:alternate" content="en_US" />}
      {lang !== 'sk' && <meta property="og:locale:alternate" content="sk_SK" />}
      {lang !== 'ru' && <meta property="og:locale:alternate" content="ru_RU" />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={displayTitle} />
      <meta property="twitter:description" content={displayDesc} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />
    </Helmet>
  );
};
