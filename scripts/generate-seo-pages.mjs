/**
 * Post-build SEO page generator for Lucky Discs SPA (kaksikielinen).
 *
 * Generoi staattiset index.html-tiedostot jokaiselle reitille MOLEMMILLA kielillä:
 *   - Suomi juuressa:   dist/discs/index.html        (oletuskieli)
 *   - Englanti /en:lle:  dist/en/discs/index.html
 *
 * Jokaisella sivulla oikea <title>, kuvaus, kanoninen URL, OG-tagit ja hreflang
 * (fi -> juuri, en -> /en, x-default -> juuri). Sisältö on <noscript>-lohkossa,
 * joten JS-käyttäjät eivät näe sitä — vain hakurobotit ilman JS:ää.
 *
 * Aja `vite build`:n jälkeen.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const BASE_URL = "https://www.luckydiscs.fi";

// Koti (etusivu)
const HOME = {
  fi: {
    title: "Lucky Discs - Premium frisbeegolfkiekot Suomesta | Disc Golf Finland",
    description:
      "Lucky Discs - suomalaiset premium-frisbeegolfkiekot: Jailbreak, Bank Robber, Treasure Hunt ja Money Shot. Valmistettu Nokialla, nopea toimitus. Osta verkkokaupasta.",
    keywords:
      "frisbeegolfkiekot, frisbeegolf kiekot, suomalaiset frisbeegolfkiekot, osta frisbeegolfkiekkoja, disc golf, Lucky Discs",
    content: `<h1>Lucky Discs - premium-frisbeegolfkiekot Suomesta</h1>
      <p>Modernit kiekot, villi tyyli. Suomalaiset premium-frisbeegolfkiekot, valmistettu Nokialla. Nopea toimitus ja ilmainen toimitus yli 50 euron tilauksiin.</p>`,
  },
  en: {
    title: "Lucky Discs - Premium Disc Golf Discs from Finland",
    description:
      "Lucky Discs - premium Finnish disc golf discs: Jailbreak, Bank Robber, Treasure Hunt and Money Shot. Made in Nokia, Finland. Wholesale for retailers.",
    keywords: "disc golf discs, Finnish disc golf, premium disc golf, Lucky Discs, wholesale disc golf",
    content: `<h1>Lucky Discs - Premium Disc Golf from Finland</h1>
      <p>Modern discs. Wild style. Premium disc golf discs designed and made in Nokia, Finland. Wholesale partnerships for retailers worldwide.</p>`,
  },
};

// Reitit. enPath oletuksena sama kuin fiPath (paitsi blogi: /blogi <-> /blog).
const routes = [
  {
    fiPath: "/discs",
    fi: {
      title: "Lucky Discs Kiekot - Frisbeegolfkiekot Suomesta | Driverit, Keskarit & Putterit",
      description:
        "Tutustu Lucky Discsin kiekkomallistoon: Jailbreak, Bank Robber, Treasure Hunt ja Money Shot. Suomalaisia premium-frisbeegolfkiekkoja jokaiseen heittoon.",
      keywords: "frisbeegolfkiekot, driverit, fairway, keskari, putteri, Jailbreak, Bank Robber, Treasure Hunt, Money Shot",
      content: `<h1>Kiekkomallisto</h1><p>Suomalaiset premium-frisbeegolfkiekot: Jailbreak-keskari, Bank Robber -fairway driver, Treasure Hunt -distance driver ja Money Shot -putteri.</p>`,
    },
    en: {
      title: "Lucky Discs Collection - Premium Disc Golf Discs | Drivers, Midranges & Putters",
      description:
        "Browse the Lucky Discs collection: Jailbreak, Bank Robber, Treasure Hunt and Money Shot. Premium Finnish disc golf discs for every shot.",
      keywords: "disc golf discs, drivers, fairway, midrange, putter, Jailbreak, Bank Robber, Treasure Hunt, Money Shot",
      content: `<h1>Our Discs</h1><p>Premium Finnish disc golf discs: Jailbreak midrange, Bank Robber fairway driver, Treasure Hunt distance driver and Money Shot putter.</p>`,
    },
  },
  {
    fiPath: "/disc-guide",
    fi: {
      title: "Kiekkojen valintaopas - Löydä oikea frisbeegolfkiekko | Lucky Discs",
      description:
        "Kiekkojen valintaopas: opi lentonumerot (speed, glide, turn, fade) ja valitse oikea kiekko taitotasosi mukaan. Vinkit aloittelijalle ja edistyneelle.",
      keywords: "frisbeegolf opas, kiekon valinta, lentonumerot, aloittelijan kiekot",
      content: `<h1>Kiekkojen valintaopas</h1><p>Opi lentonumerot ja valitse oikea kiekko jokaiseen tilanteeseen — putteri, keskari, fairway ja distance driver.</p>`,
    },
    en: {
      title: "Disc Selection Guide - Find Your Perfect Disc | Lucky Discs",
      description:
        "Disc golf selection guide: understand flight numbers (speed, glide, turn, fade) and choose the right disc for your skill level.",
      keywords: "disc golf guide, disc selection, flight numbers, beginner discs",
      content: `<h1>Disc Selection Guide</h1><p>Learn flight numbers and choose the right disc for every situation — putter, midrange, fairway and distance driver.</p>`,
    },
  },
  {
    fiPath: "/wholesale",
    fi: {
      title: "Jälleenmyynti - Lucky Discs frisbeegolfkiekot tukkuun | B2B",
      description:
        "Ryhdy Lucky Discsin jälleenmyyjäksi. Kilpailukykyinen tukkuhinnoittelu, suomalainen laatu ja luotettava toimitus jälleenmyyjille, seuroille ja kouluille.",
      keywords: "frisbeegolf jälleenmyynti, disc golf tukku, B2B frisbeegolf, jälleenmyyjä",
      content: `<h1>Jälleenmyynti</h1><p>Kilpailukykyinen tukkuhinnoittelu ja suomalainen laatu jälleenmyyjille. Myös seurat, koulut ja yhdistykset — kysy suurtilauksia.</p>`,
    },
    en: {
      title: "Wholesale Disc Golf Equipment - B2B Partnership | Lucky Discs",
      description:
        "Partner with Lucky Discs for wholesale disc golf equipment. Competitive pricing, premium Finnish quality and reliable supply for retailers.",
      keywords: "wholesale disc golf, B2B disc golf, disc golf distributor, retail partnership",
      content: `<h1>Wholesale Partnership</h1><p>Competitive wholesale pricing and premium Finnish quality for retailers and distributors worldwide.</p>`,
    },
  },
  {
    fiPath: "/brand",
    fi: {
      title: "Lucky Discs -brändi - Suomalaista frisbeegolfia Nokialta",
      description:
        "Lucky Discsin tarina: modernit kiekot, villi tyyli ja suomalainen laatu. Suunniteltu ja valmistettu Nokialla, Suomessa.",
      keywords: "Lucky Discs brändi, suomalainen frisbeegolf, valmistettu Suomessa, Nokia",
      content: `<h1>Lucky Discs -brändi</h1><p>Modernit kiekot. Villi tyyli. Suunniteltu ja valmistettu Nokialla, Suomessa — laatu jokaisessa kiekossa.</p>`,
    },
    en: {
      title: "Lucky Discs Brand Story - Finnish Disc Golf | Modern Discs, Wild Style",
      description:
        "The Lucky Discs story: modern discs, wild style and Finnish quality. Designed and made in Nokia, Finland.",
      keywords: "Lucky Discs brand, Finnish disc golf brand, made in Finland, Nokia",
      content: `<h1>The Lucky Discs Brand</h1><p>Modern Discs. Wild Style. Designed and made in Nokia, Finland — quality in every disc.</p>`,
    },
  },
  {
    fiPath: "/team",
    fi: {
      title: "Lucky Discs -tiimi - SM-kulta 2025 | Frisbeegolfjoukkue",
      description:
        "Lucky Discs -tiimi ja Suomen mestaruus 2025. Tutustu pelaajiimme ja sponsorointiohjelmaamme — haemme uusia kykyjä.",
      keywords: "Lucky Discs tiimi, frisbeegolf joukkue, SM-kulta 2025, sponsorointi",
      content: `<h1>Lucky Discs -tiimi</h1><p>Suomen mestaruus 2025. Tutustu pelaajiimme ja sponsorointiohjelmaamme.</p>`,
    },
    en: {
      title: "Team Lucky Discs - Finnish Championship 2025 | Disc Golf Team",
      description:
        "Team Lucky Discs and the 2025 Finnish Championship. Meet our players and sponsorship program — we're looking for new talent.",
      keywords: "Team Lucky Discs, disc golf team, Finnish champion 2025, sponsorship",
      content: `<h1>Team Lucky Discs</h1><p>Finnish Championship 2025. Meet our players and sponsorship program.</p>`,
    },
  },
  {
    fiPath: "/contact",
    fi: {
      title: "Yhteystiedot - Lucky Discs | Asiakaspalvelu",
      description:
        "Ota yhteyttä Lucky Discsiin: tuotekysymykset, jälleenmyynti ja yhteistyö. asiakaspalvelu@luckydiscs.fi · Nokia, Suomi.",
      keywords: "Lucky Discs yhteystiedot, asiakaspalvelu, frisbeegolf yhteydenotto",
      content: `<h1>Yhteystiedot</h1><p>Kysymyksiä tuotteista, jälleenmyynnistä tai yhteistyöstä? asiakaspalvelu@luckydiscs.fi · Nokia, Suomi.</p>`,
    },
    en: {
      title: "Contact Lucky Discs - Customer Service & Inquiries",
      description:
        "Contact Lucky Discs for product inquiries, wholesale and partnerships. asiakaspalvelu@luckydiscs.fi · Nokia, Finland.",
      keywords: "contact Lucky Discs, customer service, disc golf inquiries Finland",
      content: `<h1>Contact Us</h1><p>Questions about products, wholesale or partnerships? asiakaspalvelu@luckydiscs.fi · Nokia, Finland.</p>`,
    },
  },
  {
    fiPath: "/faq",
    fi: {
      title: "UKK - Usein kysytyt kysymykset | Lucky Discs",
      description:
        "Vastauksia yleisimpiin kysymyksiin: toimitus, palautukset, lentonumerot, jälleenmyynti ja frisbeegolf. Lucky Discs UKK.",
      keywords: "Lucky Discs UKK, frisbeegolf kysymykset, toimitus, palautukset",
      content: `<h1>Usein kysytyt kysymykset</h1><p>Vastauksia toimituksesta, palautuksista, lentonumeroista ja jälleenmyynnistä.</p>`,
    },
    en: {
      title: "FAQ - Frequently Asked Questions | Lucky Discs",
      description:
        "Answers to common questions: shipping, returns, flight numbers, wholesale and disc golf. Lucky Discs FAQ.",
      keywords: "Lucky Discs FAQ, disc golf questions, shipping, returns",
      content: `<h1>Frequently Asked Questions</h1><p>Answers about shipping, returns, flight numbers and wholesale.</p>`,
    },
  },
  {
    fiPath: "/shop",
    fi: {
      title: "Verkkokauppa - Osta frisbeegolfkiekkoja | Lucky Discs",
      description:
        "Tilaa Lucky Discs premium-frisbeegolfkiekot suoraan kotiovelle. Turvallinen Paytrail-maksu, toimitus 1-3 arkipäivää, ilmainen yli 50 euron tilauksiin.",
      keywords: "osta frisbeegolfkiekkoja, frisbeegolf verkkokauppa, Lucky Discs kauppa",
      content: `<h1>Verkkokauppa</h1><p>Osta suomalaiset premium-frisbeegolfkiekot verkkokaupastamme. Turvallinen maksu, nopea toimitus.</p>`,
    },
    en: {
      title: "Shop - Buy Disc Golf Discs | Lucky Discs",
      description:
        "Order Lucky Discs premium disc golf discs. Secure Paytrail payment, delivery in 1-3 business days within Finland.",
      keywords: "buy disc golf discs, disc golf shop, Lucky Discs store",
      content: `<h1>Shop</h1><p>Buy premium Finnish disc golf discs from our webshop. Secure payment, fast delivery.</p>`,
    },
  },
  {
    fiPath: "/privacy",
    fi: {
      title: "Tietosuojaseloste | Lucky Discs",
      description: "Lucky Discsin tietosuojaseloste: miten käsittelemme henkilö- ja tilaustietoja. GDPR-yhteensopiva.",
      keywords: "Lucky Discs tietosuoja, GDPR, tietosuojaseloste",
      content: `<h1>Tietosuojaseloste</h1><p>Miten Lucky Discs käsittelee henkilö- ja tilaustietoja. GDPR-yhteensopiva.</p>`,
    },
    en: {
      title: "Privacy Policy | Lucky Discs",
      description: "Lucky Discs privacy policy: how we process personal and order data. GDPR compliant.",
      keywords: "Lucky Discs privacy policy, GDPR, data protection",
      content: `<h1>Privacy Policy</h1><p>How Lucky Discs processes personal and order data. GDPR compliant.</p>`,
    },
  },
  {
    fiPath: "/terms",
    fi: {
      title: "Käyttöehdot & verkkokaupan ehdot | Lucky Discs",
      description: "Lucky Discsin käyttöehdot ja verkkokaupan ehdot: tilaaminen, maksaminen, toimitus ja 14 päivän peruutusoikeus.",
      keywords: "Lucky Discs käyttöehdot, verkkokaupan ehdot, peruutusoikeus",
      content: `<h1>Käyttöehdot</h1><p>Verkkokaupan ehdot: tilaaminen, maksaminen, toimitus ja 14 päivän peruutusoikeus.</p>`,
    },
    en: {
      title: "Terms of Service & Webshop Conditions | Lucky Discs",
      description: "Lucky Discs terms of service and webshop conditions: ordering, payment, delivery and 14-day right of withdrawal.",
      keywords: "Lucky Discs terms, webshop conditions, right of withdrawal",
      content: `<h1>Terms of Service</h1><p>Webshop conditions: ordering, payment, delivery and 14-day right of withdrawal.</p>`,
    },
  },
  {
    fiPath: "/blogi",
    enPath: "/blog",
    fi: {
      title: "Blogi - Frisbeegolfvinkit, oppaat & näkemykset | Lucky Discs",
      description: "Lucky Discs -blogi: frisbeegolfoppaat aloittelijalle, lentonumerot, kiekkovinkit ja markkinanäkemykset.",
      keywords: "frisbeegolf blogi, frisbeegolf opas, aloittelijan kiekot, lentonumerot",
      content: `<h1>Blogi</h1><p>Frisbeegolfvinkkejä, oppaita ja näkemyksiä — pelaajille ja jälleenmyyjille.</p>`,
    },
    en: {
      title: "Blog - Disc Golf Tips, Guides & Insights | Lucky Discs",
      description: "Lucky Discs blog: disc golf guides for beginners, flight numbers, disc tips and market insights.",
      keywords: "disc golf blog, disc golf guide, beginner discs, flight numbers",
      content: `<h1>Blog</h1><p>Disc golf guides, tips and insights — for players and retailers alike.</p>`,
    },
  },
];

const templateHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

function applyMeta(html, { meta, canonicalUrl, fiUrl, enUrl, locale }) {
  let out = html;
  const rep = (re, val) => { out = out.replace(re, val); };

  rep(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  rep(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${meta.description}"`);
  if (meta.keywords) rep(/<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${meta.keywords}"`);
  rep(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);

  rep(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${meta.title}"`);
  rep(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${meta.description}"`);
  rep(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`);
  rep(/<meta property="og:locale" content="[^"]*"/, `<meta property="og:locale" content="${locale}"`);

  rep(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${meta.title}"`);
  rep(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${meta.description}"`);

  rep(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/, `$1${enUrl}$2`);
  rep(/(<link rel="alternate" hreflang="fi" href=")[^"]*(")/, `$1${fiUrl}$2`);
  rep(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${fiUrl}$2`);

  out = out.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript>\n      <div class="seo-content">\n        ${meta.content}\n        <p><a href="${BASE_URL}">Lucky Discs</a></p>\n      </div>\n    </noscript>`
  );
  return out;
}

function writeHtml(relPath, html) {
  const dir = path.join(DIST, relPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
}

let created = 0;

// ── Etusivu (FI = juuri, EN = /en) ──
writeHtml(
  "/",
  applyMeta(templateHtml, { meta: HOME.fi, canonicalUrl: BASE_URL, fiUrl: BASE_URL, enUrl: `${BASE_URL}/en`, locale: "fi_FI" })
);
writeHtml(
  "/en",
  applyMeta(templateHtml, { meta: HOME.en, canonicalUrl: `${BASE_URL}/en`, fiUrl: BASE_URL, enUrl: `${BASE_URL}/en`, locale: "en_US" })
);
created += 2;

// ── Reitit ──
for (const route of routes) {
  const enPath = route.enPath || route.fiPath;
  const fiUrl = `${BASE_URL}${route.fiPath}`;
  const enUrl = `${BASE_URL}/en${enPath}`;

  writeHtml(route.fiPath, applyMeta(templateHtml, { meta: route.fi, canonicalUrl: fiUrl, fiUrl, enUrl, locale: "fi_FI" }));
  writeHtml(`/en${enPath}`, applyMeta(templateHtml, { meta: route.en, canonicalUrl: enUrl, fiUrl, enUrl, locale: "en_US" }));
  created += 2;
  console.log(`  ${route.fiPath}  +  /en${enPath}`);
}

console.log(`\nGenerated ${created} pre-rendered SEO pages (FI + EN) in dist/`);

// ── Sitemap (FI + EN, hreflang) ───────────────────────────────────────
const lastmod = new Date().toISOString().slice(0, 10);
const urlEntry = (loc, fiUrl, enUrl, priority, changefreq = "weekly") =>
  `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n` +
  `    <xhtml:link rel="alternate" hreflang="fi" href="${fiUrl}"/>\n` +
  `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n` +
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${fiUrl}"/>\n  </url>`;

const smEntries = [
  urlEntry(`${BASE_URL}/`, `${BASE_URL}/`, `${BASE_URL}/en`, "1.0"),
  urlEntry(`${BASE_URL}/en`, `${BASE_URL}/`, `${BASE_URL}/en`, "0.9"),
];
for (const route of routes) {
  const enPath = route.enPath || route.fiPath;
  const fiUrl = `${BASE_URL}${route.fiPath}`;
  const enUrl = `${BASE_URL}/en${enPath}`;
  const pr = route.fiPath === "/discs" || route.fiPath === "/shop" ? "0.9" : "0.7";
  smEntries.push(urlEntry(fiUrl, fiUrl, enUrl, pr));
  smEntries.push(urlEntry(enUrl, fiUrl, enUrl, "0.6"));
}
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  smEntries.join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap, "utf-8");
console.log(`Generated sitemap.xml (${smEntries.length} URLs, FI + EN)`);
