// URL-pohjainen kielitys: suomi juuressa (/...), englanti /en-etuliitteellä (/en/...).
// React Routerin basename hoitaa linkkien etuliitteen automaattisesti.

import type { Language } from "@/hooks/useTranslation";

export const EN_PREFIX = "/en";

const path = () => (typeof window !== "undefined" ? window.location.pathname : "/");

/** Onko nykyinen URL englanninkielinen (/en tai /en/...) */
export function getLangFromPath(pathname = path()): Language {
  return pathname === EN_PREFIX || pathname.startsWith(EN_PREFIX + "/") ? "en" : "fi";
}

/** React Routerin basename nykyiselle URL:lle */
export function getBasename(pathname = path()): string {
  return getLangFromPath(pathname) === "en" ? EN_PREFIX : "/";
}

/** Poistaa /en-etuliitteen → suomenkielinen suhteellinen polku (alkaa aina /) */
export function stripEnPrefix(pathname = path()): string {
  if (pathname === EN_PREFIX) return "/";
  if (pathname.startsWith(EN_PREFIX + "/")) return pathname.slice(EN_PREFIX.length) || "/";
  return pathname;
}

/**
 * Rakentaa kohdekielen täyden polun nykyisestä sijainnista.
 * Huomioi: verkkokauppa on vain suomeksi, ja blogin slug eroaa (/blogi <-> /blog).
 */
export function buildLangUrl(target: Language, pathname = path(), search = ""): string {
  let rel = stripEnPrefix(pathname).replace(/\/+$/, "") || "/"; // FI-suhteellinen

  if (target === "en") {
    if (rel.startsWith("/shop")) rel = "/"; // shop vain suomeksi → EN-etusivulle
    if (rel === "/blogi") rel = "/blog";
    return (rel === "/" ? EN_PREFIX : EN_PREFIX + rel) + search;
  }
  // target fi
  if (rel === "/blog") rel = "/blogi";
  return rel + search;
}

/** SEO-vaihtoehdot (hreflang) + kanoninen URL nykyiselle sijainnille */
export function i18nAlternates(base: string, lang: Language, pathname = path()) {
  let fiRel = stripEnPrefix(pathname).replace(/\/+$/, "") || "/";
  if (fiRel === "/blog") fiRel = "/blogi"; // normalisoi FI-slugiin
  const enRel = fiRel === "/blogi" ? "/blog" : fiRel;

  const fiUrl = base + (fiRel === "/" ? "" : fiRel);
  const enUrl = base + EN_PREFIX + (enRel === "/" ? "" : enRel);
  const canonical = lang === "en" ? enUrl : fiUrl;
  return { fiUrl, enUrl, canonical };
}
