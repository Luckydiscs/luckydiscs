import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { i18nAlternates } from "@/lib/i18n-routing";

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
 * Centralized SEO hook. Handles title, meta description, keywords, canonical,
 * OG, Twitter Card, hreflang (fi/en/x-default) and optional JSON-LD.
 *
 * URL-pohjainen kielitys: suomi juuressa, englanti /en. hreflang osoittaa
 * oikeisiin kielikohtaisiin URL:eihin nykyisen sijainnin perusteella.
 */
const useSEO = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  structuredData,
}: SEOConfig) => {
  const { language } = useTranslation();

  useEffect(() => {
    const { fiUrl, enUrl, canonical } = i18nAlternates(BASE_URL, language);
    const canonicalUrl = canonical;

    document.documentElement.lang = language;
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    if (keywords) setMeta('meta[name="keywords"]', "content", keywords);

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:locale"]', "content", language === "en" ? "en_US" : "fi_FI");

    // Twitter Card
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    // Hreflang — oikeat kielikohtaiset URL:t
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
    setHreflang("fi", fiUrl);
    setHreflang("en", enUrl);
    setHreflang("x-default", fiUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[data-seo="page-schema"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-seo", "page-schema");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      const script = document.querySelector('script[data-seo="page-schema"]');
      if (script) script.remove();
    };
  }, [title, description, keywords, canonicalPath, ogImage, structuredData, language]);
};

export default useSEO;
