/**
 * Post-build SEO page generator for Lucky Discs SPA (kaksikielinen).
 *
 * Generoi staattiset index.html-tiedostot jokaiselle reitille MOLEMMILLA kielillä:
 *   - Suomi juuressa:   dist/discs/index.html        (oletuskieli)
 *   - Englanti /en:lle:  dist/en/discs/index.html
 *
 * Jokaisella sivulla oikea <title>, kuvaus, kanoninen URL, OG-tagit ja hreflang
 * (fi -> juuri, en -> /en, x-default -> juuri).
 *
 * 🔴🔴 SISÄLTÖ EI OLE <noscript>-LOHKOSSA (muutettu 2026-08-14). Aiemmin oli, ja
 * se teki koko sivustosta näkymättömän: OpenSEO-auditti 14.8. raportoi KAIKILTA
 * 24 sivulta yhtä aikaa missing-h1, no-outgoing-links ja thin-content
 * (`wordCount: 0`), koska **ryömijä ei laske <noscript>-sisältöä sivun
 * sisällöksi**. Raaka `grep '<h1'` antoi osuman ja näytti siltä että kaikki on
 * kunnossa — se on juuri se ansa johon LaplandVibes-verkosto astui ensin
 * (korjaus `4971a88`) ja korjasi 26 sivustolta `--crawlableBody`-lipulla.
 * Mitattu tulos siellä: missing-h1 100/100 -> 0, no-outgoing-links 100/100 -> 0,
 * orphan-page 99/100 -> 0.
 *
 * Lohko kirjoitetaan nyt <div id="root">:n SISÄÄN. React korvaa sen mountissa
 * (`createRoot(...).render()` tyhjentää containerin lapset), joten JS-käyttäjä
 * ei näe sitä vilaukseltakaan — mutta robotti ja JS-ton käyttäjä näkevät.
 * Tämä on aidosti parempi kuin noscript: se palvelee molempia.
 *
 * Aja `vite build`:n jälkeen.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.resolve(ROOT, "dist");
const BASE_URL = "https://www.luckydiscs.fi";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// ── Supabase-luku build-hetkellä ────────────────────────────────────────
// Sama data jonka selain hakee ajonaikaisesti (useShopProducts / useBlogPosts).
// Anon-avain on julkinen — se on jo bundlessa — joten sen käyttö täällä ei
// paljasta mitään uutta.
function readEnv() {
  const out = {};
  for (const f of [".env.local", ".env"]) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf-8").split(/\r?\n/)) {
      const i = line.indexOf("=");
      if (i < 0 || line.trim().startsWith("#")) continue;
      const k = line.slice(0, i).trim();
      if (!(k in out)) out[k] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return { ...out, ...process.env };
}

const ENV = readEnv();
const SB_URL = ENV.VITE_SUPABASE_URL;
const SB_KEY = ENV.VITE_SUPABASE_PUBLISHABLE_KEY;

async function sb(query) {
  const res = await fetch(`${SB_URL}/rest/v1/${query}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res.json();
}

/**
 * 🔴 Kova virhe, ei fail-open. Jos tuotteet tai artikkelit eivät lataudu, build
 * KAATUU tarkoituksella: hiljaa ilman tuotesivuja julkaistu dist tarkoittaisi
 * että jokainen /shop/<slug> putoaa 404:ään (catch-all rewrite on poistettu,
 * ks. vercel.json). Kaatunut build ei julkaise mitään — tuotanto jää edelliseen
 * toimivaan versioon.
 */
if (!SB_URL || !SB_KEY) {
  console.error(
    "[seo] VIRHE: VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY puuttuu.\n" +
      "       Tuote- ja blogisivuja ei voi generoida ilman niitä."
  );
  process.exit(1);
}

// ── Staattiset reitit (käsin kirjoitetut metat — älä romuta) ────────────
const HOME = {
  fi: {
    title: "Lucky Discs - Premium frisbeegolfkiekot Suomesta | Disc Golf Finland",
    description:
      "Lucky Discs - suomalaiset premium-frisbeegolfkiekot: Jailbreak, Bank Robber, Treasure Hunt ja Money Shot. Valmistettu Nokialla, nopea toimitus. Osta verkkokaupasta.",
    keywords:
      "frisbeegolf kiekot, frisbeegolfkiekot, frisbeegolf kiekko, suomalaiset frisbeegolfkiekot, osta frisbeegolfkiekkoja, disc golf, Lucky Discs",
    label: "Etusivu",
    content: `<h1>Lucky Discs - premium-frisbeegolfkiekot Suomesta</h1>
      <p>Modernit kiekot, villi tyyli. Suomalaiset premium-frisbeegolfkiekot, valmistettu Nokialla. Nopea toimitus ja ilmainen toimitus yli 50 euron tilauksiin.</p>`,
  },
  en: {
    title: "Lucky Discs - Premium Disc Golf Discs from Finland",
    description:
      "Lucky Discs - premium Finnish disc golf discs: Jailbreak, Bank Robber, Treasure Hunt and Money Shot. Made in Nokia, Finland. Wholesale for retailers.",
    keywords: "disc golf discs, Finnish disc golf, premium disc golf, Lucky Discs, wholesale disc golf",
    label: "Home",
    content: `<h1>Lucky Discs - Premium Disc Golf from Finland</h1>
      <p>Modern discs. Wild style. Premium disc golf discs designed and made in Nokia, Finland. Wholesale partnerships for retailers worldwide.</p>`,
  },
};

// Reitit. enPath oletuksena sama kuin fiPath (paitsi blogi: /blogi <-> /blog).
const routes = [
  {
    fiPath: "/discs",
    fi: {
      title: "Frisbeegolf kiekot - Lucky Discs mallisto | Driverit, Keskarit & Putterit",
      description:
        "Tutustu Lucky Discsin kiekkomallistoon: Jailbreak, Bank Robber, Treasure Hunt ja Money Shot. Suomalaisia premium-frisbeegolfkiekkoja jokaiseen heittoon.",
      keywords: "frisbeegolf kiekot, frisbeegolfkiekot, frisbeegolf kiekko, driverit, keskari, putteri, Jailbreak, Bank Robber, Treasure Hunt, Money Shot",
      label: "Kiekkomallisto",
      content: `<h1>Kiekkomallisto</h1><p>Suomalaiset premium-frisbeegolfkiekot: Jailbreak-keskari, Bank Robber -fairway driver, Treasure Hunt -distance driver ja Money Shot -putteri.</p>`,
    },
    en: {
      title: "Lucky Discs Collection - Premium Disc Golf Discs | Drivers, Midranges & Putters",
      description:
        "Browse the Lucky Discs collection: Jailbreak, Bank Robber, Treasure Hunt and Money Shot. Premium Finnish disc golf discs for every shot.",
      keywords: "disc golf discs, drivers, fairway, midrange, putter, Jailbreak, Bank Robber, Treasure Hunt, Money Shot",
      label: "Our Discs",
      content: `<h1>Our Discs</h1><p>Premium Finnish disc golf discs: Jailbreak midrange, Bank Robber fairway driver, Treasure Hunt distance driver and Money Shot putter.</p>`,
    },
  },
  {
    fiPath: "/disc-guide",
    fi: {
      title: "Frisbeegolf kiekon valintaopas - lentonumerot haltuun | Lucky Discs",
      description:
        "Kiekkojen valintaopas: opi frisbeegolf kiekon numerot (speed, glide, turn, fade) ja valitse oikea kiekko taitotasosi mukaan. Vinkit aloittelijalle ja edistyneelle.",
      keywords: "frisbeegolf kiekko numerot, frisbeegolf numerot, lentonumerot, kiekon valinta, frisbeegolf opas, alivakaa kiekko, ylivakaa kiekko",
      label: "Kiekkojen valintaopas",
      content: `<h1>Kiekkojen valintaopas</h1><p>Opi frisbeegolf kiekon numerot — speed, glide, turn ja fade — ja valitse oikea kiekko jokaiseen tilanteeseen: putteri, keskari, fairway ja distance driver.</p>`,
    },
    en: {
      title: "Disc Selection Guide - Find Your Perfect Disc | Lucky Discs",
      description:
        "Disc golf selection guide: understand flight numbers (speed, glide, turn, fade) and choose the right disc for your skill level.",
      keywords: "disc golf guide, disc selection, flight numbers, beginner discs, understable disc",
      label: "Disc Selection Guide",
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
      label: "Jälleenmyynti",
      content: `<h1>Jälleenmyynti</h1><p>Kilpailukykyinen tukkuhinnoittelu ja suomalainen laatu jälleenmyyjille. Myös seurat, koulut ja yhdistykset — kysy suurtilauksia.</p>`,
    },
    en: {
      title: "Wholesale Disc Golf Equipment - B2B Partnership | Lucky Discs",
      description:
        "Partner with Lucky Discs for wholesale disc golf equipment. Competitive pricing, premium Finnish quality and reliable supply for retailers.",
      keywords: "wholesale disc golf, B2B disc golf, disc golf distributor, retail partnership",
      label: "Wholesale",
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
      label: "Brändi",
      content: `<h1>Lucky Discs -brändi</h1><p>Modernit kiekot. Villi tyyli. Suunniteltu ja valmistettu Nokialla, Suomessa — laatu jokaisessa kiekossa.</p>`,
    },
    en: {
      title: "Lucky Discs Brand Story - Finnish Disc Golf | Modern Discs, Wild Style",
      description:
        "The Lucky Discs story: modern discs, wild style and Finnish quality. Designed and made in Nokia, Finland.",
      keywords: "Lucky Discs brand, Finnish disc golf brand, made in Finland, Nokia",
      label: "Brand",
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
      label: "Tiimi",
      content: `<h1>Lucky Discs -tiimi</h1><p>Suomen mestaruus 2025. Tutustu pelaajiimme ja sponsorointiohjelmaamme.</p>`,
    },
    en: {
      title: "Team Lucky Discs - Finnish Championship 2025 | Disc Golf Team",
      description:
        "Team Lucky Discs and the 2025 Finnish Championship. Meet our players and sponsorship program — we're looking for new talent.",
      keywords: "Team Lucky Discs, disc golf team, Finnish champion 2025, sponsorship",
      label: "Team",
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
      label: "Yhteystiedot",
      content: `<h1>Yhteystiedot</h1><p>Kysymyksiä tuotteista, jälleenmyynnistä tai yhteistyöstä? asiakaspalvelu@luckydiscs.fi · Nokia, Suomi.</p>`,
    },
    en: {
      title: "Contact Lucky Discs - Customer Service & Inquiries",
      description:
        "Contact Lucky Discs for product inquiries, wholesale and partnerships. asiakaspalvelu@luckydiscs.fi · Nokia, Finland.",
      keywords: "contact Lucky Discs, customer service, disc golf inquiries Finland",
      label: "Contact",
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
      label: "UKK",
      content: `<h1>Usein kysytyt kysymykset</h1><p>Vastauksia toimituksesta, palautuksista, lentonumeroista ja jälleenmyynnistä.</p>`,
    },
    en: {
      title: "FAQ - Frequently Asked Questions | Lucky Discs",
      description:
        "Answers to common questions: shipping, returns, flight numbers, wholesale and disc golf. Lucky Discs FAQ.",
      keywords: "Lucky Discs FAQ, disc golf questions, shipping, returns",
      label: "FAQ",
      content: `<h1>Frequently Asked Questions</h1><p>Answers about shipping, returns, flight numbers and wholesale.</p>`,
    },
  },
  {
    fiPath: "/shop",
    fi: {
      title: "Osta frisbeegolf kiekot verkosta - Lucky Discs verkkokauppa",
      description:
        "Tilaa Lucky Discs premium-frisbeegolfkiekot suoraan kotiovelle. Turvallinen Paytrail-maksu, toimitus 1-3 arkipäivää, ilmainen yli 50 euron tilauksiin.",
      keywords: "osta frisbeegolfkiekkoja, frisbeegolf kiekot, frisbeegolf kiekkosetti, frisbeegolf verkkokauppa, Lucky Discs kauppa",
      label: "Verkkokauppa",
      content: `<h1>Verkkokauppa</h1><p>Osta suomalaiset premium-frisbeegolfkiekot verkkokaupastamme. Turvallinen maksu, nopea toimitus.</p>`,
    },
    en: {
      title: "Shop - Buy Disc Golf Discs | Lucky Discs",
      description:
        "Order Lucky Discs premium disc golf discs. Secure Paytrail payment, delivery in 1-3 business days within Finland.",
      keywords: "buy disc golf discs, disc golf shop, Lucky Discs store",
      label: "Shop",
      content: `<h1>Shop</h1><p>Buy premium Finnish disc golf discs from our webshop. Secure payment, fast delivery.</p>`,
    },
  },
  {
    fiPath: "/privacy",
    fi: {
      title: "Tietosuojaseloste | Lucky Discs",
      description: "Lucky Discsin tietosuojaseloste: miten käsittelemme henkilö- ja tilaustietoja. GDPR-yhteensopiva.",
      keywords: "Lucky Discs tietosuoja, GDPR, tietosuojaseloste",
      label: "Tietosuojaseloste",
      content: `<h1>Tietosuojaseloste</h1><p>Miten Lucky Discs käsittelee henkilö- ja tilaustietoja. GDPR-yhteensopiva.</p>`,
    },
    en: {
      title: "Privacy Policy | Lucky Discs",
      description: "Lucky Discs privacy policy: how we process personal and order data. GDPR compliant.",
      keywords: "Lucky Discs privacy policy, GDPR, data protection",
      label: "Privacy Policy",
      content: `<h1>Privacy Policy</h1><p>How Lucky Discs processes personal and order data. GDPR compliant.</p>`,
    },
  },
  {
    fiPath: "/terms",
    fi: {
      title: "Käyttöehdot & verkkokaupan ehdot | Lucky Discs",
      description: "Lucky Discsin käyttöehdot ja verkkokaupan ehdot: tilaaminen, maksaminen, toimitus ja 14 päivän peruutusoikeus.",
      keywords: "Lucky Discs käyttöehdot, verkkokaupan ehdot, peruutusoikeus",
      label: "Käyttöehdot",
      content: `<h1>Käyttöehdot</h1><p>Verkkokaupan ehdot: tilaaminen, maksaminen, toimitus ja 14 päivän peruutusoikeus.</p>`,
    },
    en: {
      title: "Terms of Service & Webshop Conditions | Lucky Discs",
      description: "Lucky Discs terms of service and webshop conditions: ordering, payment, delivery and 14-day right of withdrawal.",
      keywords: "Lucky Discs terms, webshop conditions, right of withdrawal",
      label: "Terms of Service",
      content: `<h1>Terms of Service</h1><p>Webshop conditions: ordering, payment, delivery and 14-day right of withdrawal.</p>`,
    },
  },
  {
    fiPath: "/blogi",
    enPath: "/blog",
    fi: {
      title: "Blogi - Frisbeegolfvinkit, oppaat & näkemykset | Lucky Discs",
      description: "Lucky Discs -blogi: frisbeegolfoppaat aloittelijalle, lentonumerot, kiekkovinkit ja markkinanäkemykset.",
      keywords: "frisbeegolf blogi, frisbeegolf opas, frisbeegolf kiekot aloittelijalle, lentonumerot",
      label: "Blogi",
      content: `<h1>Blogi</h1><p>Frisbeegolfvinkkejä, oppaita ja näkemyksiä — pelaajille ja jälleenmyyjille.</p>`,
    },
    en: {
      title: "Blog - Disc Golf Tips, Guides & Insights | Lucky Discs",
      description: "Lucky Discs blog: disc golf guides for beginners, flight numbers, disc tips and market insights.",
      keywords: "disc golf blog, disc golf guide, beginner discs, flight numbers",
      label: "Blog",
      content: `<h1>Blog</h1><p>Disc golf guides, tips and insights — for players and retailers alike.</p>`,
    },
  },
];

/**
 * Reitit jotka ON prerenderöitävä jottei niistä tule 404:ää, mutta joita EI
 * indeksoida eikä laiteta sitemapiin: kassa, tilausvahvistus ja admin.
 * 🔴 Nämä ovat olemassa vain siksi että vercel.jsonin catch-all rewrite on
 * poistettu — ilman tiedostoa suora lataus tai selaimen päivitys antaisi 404:n.
 */
const UTILITY_ROUTES = [
  { fiPath: "/shop/kassa", title: "Kassa | Lucky Discs", label: "Kassa", h1: "Kassa" },
  { fiPath: "/shop/vahvistus", title: "Tilausvahvistus | Lucky Discs", label: "Tilausvahvistus", h1: "Tilausvahvistus" },
  { fiPath: "/admin", title: "Ylläpito | Lucky Discs", label: "Ylläpito", h1: "Ylläpito" },
];

// ── Dynaaminen data ─────────────────────────────────────────────────────
const [productRows, variantRows, postRows] = await Promise.all([
  sb("products?select=*&active=eq.true&order=sort_order"),
  sb("product_variants?select=product_id,color,weight,stock,sold_out"),
  sb("blog_posts?select=slug,title,description,language,published_at,updated_at,hero_image,hero_alt,author,category,keywords&published=eq.true&order=published_at.desc"),
]);

if (!productRows.length) {
  console.error("[seo] VIRHE: 0 aktiivista tuotetta — ei generoida tyhjää kauppaa.");
  process.exit(1);
}

// Saatavuus lasketaan TÄSMÄLLEEN samalla säännöllä kuin ProductPage.tsx:ssä:
// varianititon tuote (Super Starter Pack, markkeri) ei ole koskaan loppuunmyyty.
// Pelkkä "varianttien summa > 0" merkitsisi ne virheellisesti OutOfStockiksi.
const variantsByProduct = {};
for (const v of variantRows) (variantsByProduct[v.product_id] ??= []).push(v);
const isInStock = (id) => {
  const vs = variantsByProduct[id];
  if (!vs || !vs.length) return true;
  return vs.some((v) => !v.sold_out && (v.stock || 0) > 0);
};

// 🔴 Nimi + variantti yhdessä. Pelkkä `name` on sama kolmella eri tuotteella
// ("Money Shot" Basic/Premium/Ultrium) ⇒ ilman varianttia kolme eri URLia saisi
// saman otsikon, mikä on juuri sitä duplikaattia jota tässä ollaan korjaamassa.
const products = productRows.map((p) => ({
  slug: p.id,
  name: [p.name, p.variant].filter(Boolean).join(" "),
  baseName: p.name,
  variant: p.variant || "",
  categoryLabel: p.category_label,
  price: p.price_cents / 100,
  description: (p.description || "").trim(),
  image: p.image_url || "",
  flight:
    p.flight_speed != null
      ? { speed: p.flight_speed, glide: p.flight_glide ?? 0, turn: p.flight_turn ?? 0, fade: p.flight_fade ?? 0 }
      : null,
  inStock: isInStock(p.id),
}));

const posts = postRows.map((p) => ({
  slug: p.slug,
  title: p.title,
  description: (p.description || "").trim(),
  lang: p.language === "en" ? "en" : "fi",
  published: p.published_at,
  updated: p.updated_at || p.published_at,
  image: p.hero_image || "",
  imageAlt: p.hero_alt || "",
  author: p.author || "Lucky Discs",
  keywords: p.keywords || "",
}));

// ── Sisäinen linkkilista (crawlattava navigaatio) ───────────────────────
// 🔴 Ilman näitä sivut ovat ORPOJA vaikka niillä olisi H1 ja sisältöä.
// LV-verkoston mittaus 13.8.: pelkkä lohko vei no-outgoing-links 100 -> 0
// mutta orphan-page pysyi 99/100, koska linkit osoittivat muihin domaineihin.
// Siksi tässä listataan sivuston OMAT reitit — myös tuotteet ja artikkelit,
// jotka muuten jäisivät kokonaan ilman sisääntulolinkkejä.
function internalLinks(lang) {
  const out = [{ url: lang === "en" ? `${BASE_URL}/en` : `${BASE_URL}/`, text: HOME[lang].label }];
  for (const r of routes) {
    const p = lang === "en" ? `/en${r.enPath || r.fiPath}` : r.fiPath;
    out.push({ url: BASE_URL + p, text: r[lang].label });
  }
  // Tuotesivut ovat vain suomeksi (shop on FI-only, ks. lib/i18n-routing.ts).
  if (lang === "fi") {
    for (const p of products) out.push({ url: `${BASE_URL}/shop/${p.slug}`, text: p.name });
  }
  for (const p of posts.filter((x) => x.lang === lang)) {
    out.push({ url: `${BASE_URL}${lang === "en" ? "/en/blog" : "/blogi"}/${p.slug}`, text: p.title });
  }
  return out;
}

const INTERNAL = { fi: internalLinks("fi"), en: internalLinks("en") };

/**
 * Esihydraatiolohko. Inline-tyylit, koska Tailwind-luokat on purgetettu
 * shellistä eivätkä ne pure. Värit peritään, joten tämä toimii sivuston omalla
 * tummalla taustalla ilman että mitään väriä kovakoodataan.
 */
function crawlableBlock({ content, lang, selfUrl }) {
  const wrap = "max-width:52rem;margin:0 auto;padding:12vh 1.5rem 4rem;color:inherit";
  const nav = "font-size:.8rem;opacity:.55;line-height:1.9;list-style:none;padding:0;margin:0";
  const items = INTERNAL[lang]
    .filter((l) => l.url !== selfUrl)
    .map(
      (l) =>
        `<li><a href="${esc(l.url)}" style="color:inherit;text-decoration:none">${esc(l.text)}</a></li>`
    )
    .join("");
  return (
    `<div id="ld-prerender" style="${wrap}">${content}` +
    `<nav aria-label="${lang === "en" ? "Site navigation" : "Sivuston navigaatio"}">` +
    `<ul style="${nav}">${items}</ul></nav></div>`
  );
}

// ── JSON-LD ─────────────────────────────────────────────────────────────
// 🔴 `data-seo="page-schema"` EI ole koriste: `useSEO`-hook etsii ajonaikaisesti
// tasan tällä valitsimella olemassa olevan skriptin ja KORVAA sen sisällön.
// Ilman attribuuttia hook luo oman rinnakkaisen skriptin ⇒ sivulla olisi kaksi
// Product-schemaa yhtä aikaa (mitattu selaimessa 14.8. ennen tätä korjausta).
const ldScript = (obj) =>
  `\n    <script type="application/ld+json" data-seo="page-schema">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function productLd(p) {
  const desc =
    p.description ||
    `${p.name} — suomalainen premium-frisbeegolfkiekko, valmistettu Nokialla.`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: desc,
    sku: p.slug,
    category: p.categoryLabel,
    brand: { "@type": "Brand", name: "Lucky Discs" },
    url: `${BASE_URL}/shop/${p.slug}`,
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/shop/${p.slug}`,
      price: p.price.toFixed(2),
      priceCurrency: "EUR",
      availability: p.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Lucky Discs" },
    },
  };
  if (p.image) ld.image = p.image.startsWith("http") ? p.image : BASE_URL + p.image;
  // Lentonumerot ovat kiekon todelliset ominaisuudet — ei keksittyjä arvoja.
  if (p.flight) {
    ld.additionalProperty = [
      ["Speed", p.flight.speed],
      ["Glide", p.flight.glide],
      ["Turn", p.flight.turn],
      ["Fade", p.flight.fade],
    ].map(([n, v]) => ({ "@type": "PropertyValue", name: n, value: String(v) }));
  }
  return ld;
}

function articleLd(p, url) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    inLanguage: p.lang,
    author: { "@type": "Organization", name: p.author },
    publisher: {
      "@type": "Organization",
      name: "Lucky Discs",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/lucky-discs-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
  if (p.published) ld.datePublished = p.published;
  if (p.updated) ld.dateModified = p.updated;
  if (p.image) ld.image = p.image.startsWith("http") ? p.image : BASE_URL + p.image;
  return ld;
}

// ── HTML-injektio ───────────────────────────────────────────────────────
/**
 * 🔴🔴 Riisu aiemmin injektoitu lohko ENNEN kuin shelliä käytetään pohjana.
 * Ilman tätä skripti ei ole idempotentti: `emit("/")` kirjoittaa
 * dist/index.html:n, ja jos skripti ajetaan uudestaan ilman tuoretta
 * `vite build`ia, pohjaksi luetaan oma edellinen tuloste. Silloin
 * `<div id="root"></div>` ei enää täsmää, injektio menee hiljaa ohi ja
 * JOKAINEN sivu perii etusivun H1:n ja tekstin.
 * Havaittu tässä työssä 14.8.: 50 sivua, kaikilla tasan 107 sanaa ja sama H1 —
 * portti ei olisi huomannut sitä, koska h1=1 ja linkit olivat kunnossa.
 */
function stripBlock(html) {
  return html.replace(
    /<div id="root"><div id="ld-prerender"[\s\S]*?<\/nav><\/div><\/div>/i,
    '<div id="root"></div>'
  );
}

const templateHtml = stripBlock(fs.readFileSync(path.join(DIST, "index.html"), "utf-8"));

if (!templateHtml.includes('<div id="root"></div>')) {
  console.error(
    "[seo] VIRHE: dist/index.html:stä ei löydy tyhjää <div id=\"root\"></div>.\n" +
      "       Lohkon injektio menisi hiljaa ohi ja kaikki sivut jäisivät tyhjiksi."
  );
  process.exit(1);
}

function applyMeta(html, { meta, canonicalUrl, fiUrl, enUrl, locale, lang, jsonLd, noindex }) {
  let out = html;
  const rep = (re, val) => {
    out = out.replace(re, val);
  };

  rep(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  rep(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(meta.description)}"`);
  if (meta.keywords) rep(/<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${esc(meta.keywords)}"`);
  rep(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);

  rep(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(meta.title)}"`);
  rep(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(meta.description)}"`);
  rep(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`);
  rep(/<meta property="og:locale" content="[^"]*"/, `<meta property="og:locale" content="${locale}"`);
  if (meta.ogType) rep(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${meta.ogType}"`);
  if (meta.image) {
    const abs = meta.image.startsWith("http") ? meta.image : BASE_URL + meta.image;
    rep(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${esc(abs)}"`);
    rep(/<meta property="og:image:secure_url" content="[^"]*"/, `<meta property="og:image:secure_url" content="${esc(abs)}"`);
    rep(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${esc(abs)}"`);
  }

  rep(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(meta.title)}"`);
  rep(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(meta.description)}"`);

  // hreflang: vain ne kielet joilla sivu OIKEASTI on olemassa.
  // Tuotesivut ja blogiartikkelit ovat yksikielisiä, joten niille ei valehdella paria.
  if (enUrl) {
    rep(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/, `$1${enUrl}$2`);
    rep(/(<link rel="alternate" hreflang="fi" href=")[^"]*(")/, `$1${fiUrl}$2`);
    rep(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${fiUrl}$2`);
  } else {
    out = out.replace(/\s*<link rel="alternate" hreflang="(en|fi|x-default)" href="[^"]*"\s*\/?>/g, "");
  }

  if (noindex) {
    out = out.replace(/<\/head>/, `    <meta name="robots" content="noindex,follow" />\n  </head>`);
  }
  if (jsonLd) {
    out = out.replace(/<\/head>/, `${ldScript(jsonLd)}\n  </head>`);
  }

  out = out.replace(
    '<div id="root"></div>',
    `<div id="root">${crawlableBlock({ content: meta.content, lang, selfUrl: canonicalUrl })}</div>`
  );
  return out;
}

function writeHtml(relPath, html) {
  const dir = path.join(DIST, relPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
}

const written = [];
function emit(relPath, opts) {
  writeHtml(relPath, applyMeta(templateHtml, opts));
  written.push({
    path: relPath,
    indexable: !opts.noindex,
    canonical: opts.canonicalUrl,
    title: opts.meta.title,
  });
}

// ── Etusivu (FI = juuri, EN = /en) ──────────────────────────────────────
emit("/", {
  meta: HOME.fi,
  canonicalUrl: BASE_URL,
  fiUrl: BASE_URL,
  enUrl: `${BASE_URL}/en`,
  locale: "fi_FI",
  lang: "fi",
});
emit("/en", {
  meta: HOME.en,
  canonicalUrl: `${BASE_URL}/en`,
  fiUrl: BASE_URL,
  enUrl: `${BASE_URL}/en`,
  locale: "en_US",
  lang: "en",
});

// ── Staattiset reitit ───────────────────────────────────────────────────
for (const route of routes) {
  const enPath = route.enPath || route.fiPath;
  const fiUrl = `${BASE_URL}${route.fiPath}`;
  const enUrl = `${BASE_URL}/en${enPath}`;
  emit(route.fiPath, { meta: route.fi, canonicalUrl: fiUrl, fiUrl, enUrl, locale: "fi_FI", lang: "fi" });
  emit(`/en${enPath}`, { meta: route.en, canonicalUrl: enUrl, fiUrl, enUrl, locale: "en_US", lang: "en" });
}

// ── Tuotesivut (FI) ─────────────────────────────────────────────────────
for (const p of products) {
  const url = `${BASE_URL}/shop/${p.slug}`;
  const eur = (n) => n.toFixed(2).replace(".", ",") + " €";
  const flight = p.flight
    ? ` Lentonumerot ${p.flight.speed}/${p.flight.glide}/${p.flight.turn}/${p.flight.fade}.`
    : "";
  // Kuvaus rakennetaan lyhyistä, tosista paloista: mitä se on, miten se lentää,
  // mitä maksaa. Ei täytecopya — kaikki kentät tulevat kannasta.
  const desc = [
    `${p.name} – ${p.categoryLabel.toLowerCase()}.`,
    flight.trim(),
    `${eur(p.price)}.`,
    "Suomalainen premium-frisbeegolfkiekko, valmistettu Nokialla.",
  ]
    .filter(Boolean)
    .join(" ");
  const title = `${p.name} – ${p.categoryLabel} | Lucky Discs`;
  emit(`/shop/${p.slug}`, {
    meta: {
      title: title.length > 60 ? `${p.name} – ${p.categoryLabel}`.slice(0, 60) : title,
      description: desc.slice(0, 158),
      keywords: `${p.name}, frisbeegolf kiekko, frisbeegolfkiekko, ${p.categoryLabel}, Lucky Discs`,
      image: p.image,
      ogType: "product",
      content:
        `<h1>${esc(p.name)}</h1><p>${esc(p.categoryLabel)} — ${esc(eur(p.price))}.${esc(flight)} ` +
        `${esc((p.description || "").replace(/\s+/g, " ").slice(0, 240))}</p>`,
    },
    canonicalUrl: url,
    fiUrl: url,
    enUrl: null,
    locale: "fi_FI",
    lang: "fi",
    jsonLd: productLd(p),
  });
}

// ── Blogiartikkelit ─────────────────────────────────────────────────────
// 🔴 hreflang-paria ei emitoida: kannassa ei ole saraketta joka kertoisi mikä
// EN-artikkeli vastaa mitäkin FI-artikkelia. Slugit eroavat, joten pari olisi
// arvaus. Arvattu hreflang on pahempi kuin puuttuva.
for (const p of posts) {
  const base = p.lang === "en" ? `${BASE_URL}/en/blog` : `${BASE_URL}/blogi`;
  const url = `${base}/${p.slug}`;
  emit(`${p.lang === "en" ? "/en/blog" : "/blogi"}/${p.slug}`, {
    meta: {
      // Sama sääntö kuin BlogPost.tsx:ssä: brändipääte vain jos se mahtuu.
      // Prerenderöity ja renderöity otsikko EIVÄT saa erota — muuten sivu
      // vaihtaa otsikkoa mountissa ja kaksi eri versiota kilpailee indeksissä.
      title: p.title.length + 14 <= 60 ? `${p.title} | Lucky Discs` : p.title,
      description: p.description.slice(0, 158),
      keywords: p.keywords,
      image: p.image,
      ogType: "article",
      content: `<h1>${esc(p.title)}</h1><p>${esc(p.description)}</p>`,
    },
    canonicalUrl: url,
    fiUrl: url,
    enUrl: null,
    locale: p.lang === "en" ? "en_US" : "fi_FI",
    lang: p.lang,
    jsonLd: articleLd(p, url),
  });
}

// ── Ei-indeksoitavat apureitit ──────────────────────────────────────────
for (const u of UTILITY_ROUTES) {
  emit(u.fiPath, {
    meta: {
      title: u.title,
      description: "Lucky Discs.",
      content: `<h1>${esc(u.h1)}</h1>`,
    },
    canonicalUrl: BASE_URL + u.fiPath,
    fiUrl: BASE_URL + u.fiPath,
    enUrl: null,
    locale: "fi_FI",
    lang: "fi",
    noindex: true,
  });
}

console.log(
  `[seo] ${written.length} sivua: ${routes.length * 2 + 2} staattista + ` +
    `${products.length} tuotetta + ${posts.length} artikkelia + ${UTILITY_ROUTES.length} apureittiä`
);

// ── Kattavuusportti ─────────────────────────────────────────────────────
// 🔴🔴 vercel.jsonin catch-all rewrite on POISTETTU, jotta tuntematon polku
// antaa aidon 404:n eikä 200 OK + etusivun HTML. Se on turvallista VAIN jos
// jokaisella App.tsx:n reitillä on oikeasti tiedosto. Tämä portti lukee reitit
// suoraan App.tsx:stä ja kaataa buildin jos yksikin puuttuu — muuten uusi reitti
// lisättäisiin joskus koodiin ja se 404:äisi tuotannossa hiljaa.
const appTsx = fs.readFileSync(path.join(ROOT, "src", "App.tsx"), "utf-8");
const appRoutes = [...appTsx.matchAll(/<Route\s+path="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== "*");

// Reitti on katettu myös silloin kun vercel.json ohjaa sen pois (301). Luetaan
// ohjaukset tiedostosta eikä kovakoodata listaa tänne: kaksi rinnakkaista
// totuutta eriytyisi ensimmäisellä muutoksella, ja juuri sitä tämä portti estää.
const vercelCfg = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf-8"));
const normalize = (p) => p.replace(/\/:[A-Za-z_]+\*?/g, "/*").replace(/\/+$/, "") || "/";
const redirected = new Set((vercelCfg.redirects || []).map((r) => normalize(r.source)));

const missing = [];
for (const r of appRoutes) {
  if (redirected.has(normalize(r))) continue;
  const dynamic = r.includes(":");
  if (dynamic) {
    // Dynaamiset reitit katetaan datalla; tarkistetaan että ainakin yksi on olemassa.
    const prefix = r.slice(0, r.indexOf("/:"));
    const any = written.some((w) => w.path.startsWith(prefix + "/") && w.path !== prefix);
    if (!any) missing.push(`${r} (ei yhtään generoitua sivua eikä ohjausta vercel.jsonissa)`);
    continue;
  }
  for (const p of [r, r === "/" ? "/en" : `/en${r}`]) {
    // /shop/* ja /admin ovat vain suomeksi — EN-vastinetta ei vaadita.
    if (p.startsWith("/en/shop/") || p === "/en/admin") continue;
    if (p.startsWith("/en/blogi")) continue; // FI-slugi ei esiinny EN-puolella
    if (p === "/en/blog" || p === "/blog") continue; // katetaan /blogi-reitin enPathilla
    if (!fs.existsSync(path.join(DIST, p, "index.html"))) missing.push(p);
  }
}
if (missing.length) {
  console.error(
    "[seo] VIRHE: App.tsx:ssä on reittejä joille ei generoitu sivua:\n  " +
      missing.join("\n  ") +
      "\n  Lisää reitti tähän skriptiin tai palauta catch-all rewrite vercel.jsoniin."
  );
  process.exit(1);
}
console.log(`[seo] kattavuusportti OK — ${appRoutes.length} App.tsx-reittiä katettu`);

// ── Duplikaattiportti ───────────────────────────────────────────────────
// 🔴 Kaksi eri URLia samalla otsikolla tai canonicalilla on juuri se vika jota
// tässä korjataan. Ensimmäinen versio tästä skriptistä tuotti kolme Money Shot
// -sivua samalla otsikolla, koska `products.name` ei sisällä varianttia — se
// jäi kiinni vasta erillisessä mittauksessa. Nyt build kaatuu siihen.
const dupes = [];
for (const [field, get] of [
  ["title", (w) => w.title],
  ["canonical", (w) => w.canonical],
]) {
  const by = {};
  for (const w of written) (by[get(w)] ??= []).push(w.path);
  for (const [val, paths] of Object.entries(by)) {
    if (paths.length > 1) dupes.push(`sama ${field} (${val}) → ${paths.join(", ")}`);
  }
}
if (dupes.length) {
  console.error("[seo] VIRHE: duplikaatteja:\n  " + dupes.join("\n  "));
  process.exit(1);
}
console.log("[seo] duplikaattiportti OK — jokaisella sivulla oma otsikko ja canonical");

// ── Sitemap ─────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const priorityFor = (p) =>
  p === "/" ? "1.0" : p === "/shop" || p === "/discs" ? "0.9" : p.startsWith("/shop/") ? "0.8" : p.startsWith("/en") ? "0.6" : "0.7";

const smEntries = [];
const seen = new Set();
for (const w of written) {
  if (!w.indexable || seen.has(w.canonical)) continue;
  seen.add(w.canonical);
  const rel = w.path === "/" ? "/" : w.path;
  smEntries.push(
    `  <url>\n    <loc>${w.canonical}</loc>\n    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>weekly</changefreq>\n    <priority>${priorityFor(rel)}</priority>\n  </url>`
  );
}
fs.writeFileSync(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${smEntries.join("\n")}\n</urlset>\n`,
  "utf-8"
);
console.log(`[seo] sitemap.xml: ${smEntries.length} URLia (apureitit jätetty pois)`);
