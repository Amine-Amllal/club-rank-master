import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

/**
 * Custom hook for managing SEO meta tags dynamically
 * Updates document title and meta tags based on the current page
 */
export const useSEO = ({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage,
  canonical,
  noindex = false,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Get current URL and site origin
    const currentUrl = window.location.href;
    const siteOrigin = window.location.origin;

    // Default OG image if none provided
    const defaultOgImage = `${siteOrigin}/images/og/genos-og-default.png`;
    const finalOgImage = ogImage || defaultOgImage;

    // Update description
    updateMetaTag('description', description);
    
    // Update keywords if provided
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update robots meta tag
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // Update Open Graph tags (Facebook, LinkedIn, WhatsApp, Discord)
    updateMetaTag('og:site_name', 'GENOS Leaderboard', true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', finalOgImage, true);
    updateMetaTag('og:image:secure_url', finalOgImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:locale', 'fr_MA', true);

    // Update canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.rel = 'canonical';
        document.head.appendChild(linkElement);
      }
      linkElement.href = canonical;
    }

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', finalOgImage);
    updateMetaTag('twitter:image:alt', title);

  }, [title, description, keywords, ogType, ogImage, canonical, noindex]);
};
