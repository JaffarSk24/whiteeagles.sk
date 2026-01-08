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
  
  // Ensure we have a valid language, prioritize query param for SEO consistency
  const queryParams = new URLSearchParams(location.search);
  const urlLang = queryParams.get('lng');
  const currentLang = urlLang || (i18n.language ? i18n.language.split('-')[0] : 'sk');
  
  const siteUrl = 'https://whiteeagles.sk';
  let cleanPath = location.pathname.replace(/\/$/, '');
  
  // Ensure root always has trailing slash for consistency (https://whiteeagles.sk/)
  if (cleanPath === '') cleanPath = '/';

  // 1. Define URL for each language version
  // If path is just '/', don't double slash (handled by logic below)
  
  // Slovak is default (root), others use query param
  const urlSk = cleanPath === '/' ? `${siteUrl}/` : `${siteUrl}${cleanPath}`;
  // For alternate links (if needed)
  const urlEn = cleanPath === '/' ? `${siteUrl}/?lng=en` : `${siteUrl}${cleanPath}?lng=en`;
  const urlRu = cleanPath === '/' ? `${siteUrl}/?lng=ru` : `${siteUrl}${cleanPath}?lng=ru`;

  // 2. Self-referencing Canonical
  // USER REQUEST: Strict Canonical = Slovak Page Only.
  // We explicitly ignore the current language for the Canonical tag.
  // It always points to the "clean" (Slovak) version.
  const canonicalUrl = urlSk;

  // Note: We still render alternate hreflang tags so Google knows the other versions exist,
  // but the 'canonical' authority is given solely to the SK version.

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
      <link rel="canonical" href={canonicalUrl} key="canonical" />

      {/* Alternate Hreflang Links - MUST list all versions including current one */}
      {/* Alternate Hreflang Links - MUST list all versions including current one */}
      <link rel="alternate" hrefLang="sk" href={urlSk} key="hreflang-sk" />
      <link rel="alternate" hrefLang="en" href={urlEn} key="hreflang-en" />
      <link rel="alternate" hrefLang="ru" href={urlRu} key="hreflang-ru" />
      <link rel="alternate" hrefLang="x-default" href={urlSk} key="hreflang-default" />

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
