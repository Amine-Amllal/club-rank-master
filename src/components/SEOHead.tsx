import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noindex?: boolean;
}

/**
 * SEO component for managing page-specific meta tags and structured data
 * Use this component at the top of each page for optimal SEO
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  structuredData,
  noindex = false,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    const updateMetaTag = (selector: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, selector.replace(`meta[${attribute}="`, '').replace('"]', ''));
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Primary meta tags
    updateMetaTag('meta[name="description"]', description);
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', keywords);
    }
    updateMetaTag('meta[name="robots"]', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    updateMetaTag('meta[property="og:title"]', title, 'property');
    updateMetaTag('meta[property="og:description"]', description, 'property');
    updateMetaTag('meta[property="og:type"]', ogType, 'property');
    if (canonical) {
      updateMetaTag('meta[property="og:url"]', canonical, 'property');
    }
    if (ogImage) {
      updateMetaTag('meta[property="og:image"]', ogImage, 'property');
    }

    // Twitter Card
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    if (ogImage) {
      updateMetaTag('meta[name="twitter:image"]', ogImage);
    }

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      const scriptId = 'structured-data-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function to remove page-specific structured data when component unmounts
    return () => {
      const script = document.getElementById('structured-data-script');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, canonical, ogImage, ogType, structuredData, noindex]);

  return null; // This component doesn't render anything
};
