import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  const siteUrl = 'https://whiteeagles.sk';
  const currentUrl = `${siteUrl}${location.pathname}`;
  const displayTitle = title ? `${title} | White Eagles & Co.` : 'White Eagles & Co. - Digital Services';
  const displayDesc = description || 'Professional web development and marketing services in Slovakia.';

  return (
    <Helmet>
      <title>{displayTitle}</title>
      <meta name="description" content={displayDesc} />
      <html lang={i18n.language} />
      
      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Alternates - Assuming simplified structure where structure is same for all languages */}
      {/* In a real scenario with different paths per lang, this needs to be mapped. 
          Here we assume content is dynamic but URL is same, language is state-based or query/path based.
          Note: React I18n often uses same URL or lang subpaths. 
          If user wants SEO indexable alternates, we usually need /en/, /sk/, /ru/ routes.
          Current implementation is Client Side specific. To make it proper SEO indexable with alternates, 
          we usually need separate routes. For now, I'll just set alternates to home if on home.
      */}
    </Helmet>
  );
};
