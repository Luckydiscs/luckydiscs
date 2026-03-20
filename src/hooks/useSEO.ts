import { useEffect } from "react";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
}

const BASE_URL = "https://www.luckydiscs.fi";
const DEFAULT_OG_IMAGE = `${BASE_URL}/lovable-uploads/682fc2dd-badc-4562-8574-aaab40a86d03.webp`;

/**
 * Centralized SEO hook — replaces ~90 lines of duplicated boilerplate per page.
 * Handles: title, meta description, keywords, canonical, OG, Twitter Card,
 * hreflang (en/fi), and optional JSON-LD structured data.
 */
const useSEO = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  structuredData,
}: SEOConfig) => {
  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;

    // Title
    document.title = title;

    // Meta tags
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    if (keywords) {
      setMeta('meta[name="keywords"]', "content", keywords);
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", ogImage);

    // Twitter Card
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    // Hreflang — both languages point to the same path (SPA, no separate lang URLs)
    const setHreflang = (lang: string, url: string) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", lang);
        document.head.appendChild(link);
      }
      link.setAttribute("href", url);
    };

    setHreflang("en", canonicalUrl);
    setHreflang("fi", canonicalUrl);
    setHreflang("x-default", canonicalUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector(
        'script[data-seo="page-schema"]'
      ) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-seo", "page-schema");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup: remove page-specific schema on unmount
    return () => {
      const script = document.querySelector('script[data-seo="page-schema"]');
      if (script) script.remove();
    };
  }, [title, description, keywords, canonicalPath, ogImage, structuredData]);
};

export default useSEO;
