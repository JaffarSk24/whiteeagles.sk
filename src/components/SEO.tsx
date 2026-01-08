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
  image = '/assets/white-eagles-logo-white.webp', // Default OG Image
  type = 'website',
  noindex = false
}) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  // Ensure we have a valid language, default to 'sk'
  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'sk';
  
  const siteUrl = 'https://whiteeagles.sk';
  const cleanPath = location.pathname.replace(/\/$/, ''); // Remove trailing slash

  // 1. Define URL for each language version
  // Slovak is default (root), others use query param
  const urlSk = `${siteUrl}${cleanPath}`;
  const urlEn = `${siteUrl}${cleanPath}?lng=en`;
  const urlRu = `${siteUrl}${cleanPath}?lng=ru`;

  // 2. Self-referencing Canonical
  let canonicalUrl = urlSk;
  if (currentLang === 'en') canonicalUrl = urlEn;
  if (currentLang === 'ru') canonicalUrl = urlRu;

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
      <html lang={currentLang} />
      
      {/* Canonical Link - MUST be self-referencing for each language version */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate Hreflang Links - MUST list all versions including current one */}
      <link rel="alternate" hrefLang="sk" href={urlSk} />
      <link rel="alternate" hrefLang="en" href={urlEn} />
      <link rel="alternate" hrefLang="ru" href={urlRu} />
      <link rel="alternate" hrefLang="x-default" href={urlSk} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDesc} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="White Eagles & Co." />
      <meta property="og:locale" content={currentLang === 'en' ? 'en_US' : currentLang === 'ru' ? 'ru_RU' : 'sk_SK'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={displayTitle} />
      <meta property="twitter:description" content={displayDesc} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />
    </Helmet>
  );
};
