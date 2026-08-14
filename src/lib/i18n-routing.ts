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

/**
 * Onko polku olemassa vain YHDELLÄ kielellä?
 *
 * Tuotesivut, kassa, tilausvahvistus, admin ja yksittäiset blogiartikkelit ovat
 * yksikielisiä: kauppa on vain suomeksi (ks. buildLangUrl) ja artikkeleilla on
 * eri slug kummallakin kielellä ilman kenttää joka kertoisi parin.
 *
 * 🔴 Tämä ei ole kosmeettista. Näille sivuille emitoitu hreflang osoittaisi
 * URLiin jota ei ole olemassa — esim. /en/shop/ultrium-money-shot tai
 * /en/blog/lentonumerot-haltuun-... — ja prerender-kattavuuden myötä sellainen
 * osoite vastaa aidosti 404:llä. Arvattu hreflang on pahempi kuin puuttuva.
 */
export function isSingleLanguagePath(pathname = path()): boolean {
  const rel = stripEnPrefix(pathname).replace(/\/+$/, "") || "/";
  if (rel === "/admin") return true;
  if (rel.startsWith("/shop/")) return true; // /shop itse on kaksikielinen
  return /^\/(blogi|blog)\/.+/.test(rel); // listaussivu on, yksittäinen artikkeli ei
}

/** SEO-vaihtoehdot (hreflang) + kanoninen URL nykyiselle sijainnille */
export function i18nAlternates(base: string, lang: Language, pathname = path()) {
  let fiRel = stripEnPrefix(pathname).replace(/\/+$/, "") || "/";
  if (fiRel === "/blog") fiRel = "/blogi"; // normalisoi FI-slugiin
  const enRel = fiRel === "/blogi" ? "/blog" : fiRel;

  const fiUrl = base + (fiRel === "/" ? "" : fiRel);
  const enUrl = base + EN_PREFIX + (enRel === "/" ? "" : enRel);
  const singleLang = isSingleLanguagePath(pathname);
  // Yksikielisellä sivulla kanoninen on aina se kieli jolla sivu oikeasti on.
  const canonical = singleLang
    ? base + (stripEnPrefix(pathname).replace(/\/+$/, "") || "")
    : lang === "en"
      ? enUrl
      : fiUrl;
  return { fiUrl, enUrl, canonical, singleLang };
}
