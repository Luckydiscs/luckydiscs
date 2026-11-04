#!/usr/bin/env node
/**
 * Blogiportti: tarkistaa julkaistut artikkelit (Supabase) ja julkaisua odottavat
 * luonnokset (_blog-drafts/valmiit/*.md) ennen kuin ne näkyvät lukijalle.
 *
 *   node scripts/check-blog.mjs   (npm run check:blog; ajetaan myös buildissa)
 *
 * Mitä tarkistetaan ja miksi (4.11.2026, kolme elokuun luonnosta):
 *  1. Merkinnät: vain src/lib/blogMarkup.tsx:n tuntemat. Muu näkyy lukijalle raakana.
 *  2. Sisäiset linkit osuvat olemassa olevaan reittiin, artikkeliin tai tuotteeseen,
 *     ja suomenkielinen juttu linkittää /blogi/-polkuun, englanninkielinen /blog/-polkuun.
 *  3. Tuotteen nimi + lentonumerot "Money Shot (4 / 3 / 1 / 3)" vastaavat tuotetaulua.
 *  4. Jokainen hinta "12,90 €" / "€12.90" on jonkin aktiivisen tuotteen hinta.
 *  5. Kansikuva on olemassa, eikä samaa valokuvaa (scripts/blog-images.json) ole
 *     kahden eri artikkeliparin kannessa.
 *  6. Jokaisella fi-artikkelilla on en-pari ja päinvastoin.
 *  7. Kuvaus mahtuu hakutulokseen (≤ 160 merkkiä), slug on siisti.
 *  8. Tekoälytyylin ja kiellettyjen ilmausten lista.
 * Portti joka luki 0 artikkelia on kaatunut, ei vihreä.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// BLOG_DRAFTS: portin itsetesti (scripts/check-blog.selftest.mjs) osoittaa rikkinäisiin näytteisiin.
const DRAFTS = process.env.BLOG_DRAFTS || path.join(ROOT, "_blog-drafts", "valmiit");

function env(key) {
  if (process.env[key]) return process.env[key];
  for (const f of [".env", ".env.local"]) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, "utf-8").match(new RegExp(`^${key}=["']?([^"'\\r\\n]+)`, "m"));
    if (m) return m[1];
  }
  return "";
}
const SB_URL = env("VITE_SUPABASE_URL");
const SB_KEY = env("VITE_SUPABASE_PUBLISHABLE_KEY");
async function sb(q) {
  const r = await fetch(`${SB_URL}/rest/v1/${q}`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } });
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${q}`);
  return r.json();
}

// ── Aineisto ────────────────────────────────────────────────────────────
const [products, published] = await Promise.all([
  sb("products?select=id,name,price_cents,flight_speed,flight_glide,flight_turn,flight_fade&active=eq.true"),
  sb("blog_posts?select=slug,title,description,content,language,hero_image,published,published_at&published=eq.true"),
]);

function readDraft(file) {
  const raw = fs.readFileSync(file, "utf-8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n(.*?)\n---\n(.*)$/s);
  if (!m) return { file, error: "otsakelohko puuttuu" };
  const meta = Object.fromEntries(m[1].split("\n").filter(Boolean).map((l) => {
    const i = l.indexOf(": ");
    return [l.slice(0, i), l.slice(i + 2)];
  }));
  return { ...meta, content: m[2].trim(), file: path.basename(file), draft: true };
}
const readDir = (dir) => fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => readDraft(path.join(dir, f)))
  : [];
const drafts = readDir(DRAFTS);
// Korjatut versiot julkaistuista (sama slug): tarkistetaan korjattu teksti julkaistun tilalle.
const fixes = readDir(process.env.BLOG_FIXES || path.join(ROOT, "_blog-drafts", "korjatut"));
const fixedSlugs = new Set(fixes.map((f) => f.slug));

// Jo julkaistu luonnos tarkistetaan julkaistuna rivinä, ei toista kertaa luonnoksena.
const publishedSlugs = new Set(published.map((p) => p.slug));
const posts = [
  ...published.map((p) => (fixedSlugs.has(p.slug)
    ? { ...fixes.find((f) => f.slug === p.slug), published_at: p.published_at, where: `korjattu ${p.slug}` }
    : { ...p, where: `julkaistu ${p.slug}` })),
  ...drafts.filter((d) => !publishedSlugs.has(d.slug)).map((d) => ({ ...d, where: `luonnos ${d.file}` })),
];
const errors = [];
const err = (p, msg) => errors.push(`${p.where}: ${msg}`);
for (const d of [...drafts, ...fixes]) if (d.error) err({ where: d.file }, d.error);
for (const f of fixes) if (!published.some((p) => p.slug === f.slug)) errors.push(`korjattu ${f.file}: slugia ${f.slug} ei ole julkaistuna`);

if (!published.length) errors.push("0 julkaistua artikkelia luettu — portti ei mitannut mitään");
if (!products.length) errors.push("0 tuotetta luettu");

// ── Reitit App.tsx:stä ──────────────────────────────────────────────────
const app = fs.readFileSync(path.join(ROOT, "src", "App.tsx"), "utf-8");
const staticRoutes = new Set([...app.matchAll(/path="([^"*:]+)"/g)].map((m) => m[1]));
const slugs = new Map(posts.map((p) => [p.slug, p.language]));
const productIds = new Set(products.map((p) => p.id));

// ── Kuvaryhmät ──────────────────────────────────────────────────────────
const groups = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "blog-images.json"), "utf-8")).ryhmat;
const photoOf = (img) => {
  const f = path.basename(img || "");
  for (const [g, files] of Object.entries(groups)) if (files.includes(f)) return g;
  return f;
};

// ── Tuotteet ────────────────────────────────────────────────────────────
const flightByName = new Map();
for (const p of products) {
  if (p.flight_speed == null) continue;
  flightByName.set(p.name.toLowerCase(), [p.flight_speed, p.flight_glide, p.flight_turn, p.flight_fade].join("/"));
}
const prices = new Set(products.map((p) => p.price_cents));

const BANNED = [
  /tässä on koko juttu/i, /here is the whole thing/i, /kannattaa ymmärtää yksi asia/i,
  /none of this is marketing/i, /eivät ole markkinointipuhetta/i, /in this article we/i,
  /tässä artikkelissa (käymme|tutustumme)/i, /\bstunning\b/i, /\bbreathtaking\b/i, /world-class/i,
  /yliampuva/i,
  // Money Shot on putti- ja lähestymiskiekko (Vesa 4.11.2026), vaikka tuotetaulun
  // category on 'midrange'. Väite "Lucky Discsillä ei ole putteria" on väärä.
  /ei ole putteri/i, /putteria (valikoima|mallisto)\S* ei ole/i, /ei (myy|valmista|tee) putter/i, /(doesn.t|does not|don.t) (make|sell|have) a putter/i,
  /no putter in (the|our) range/i, /money shot[^.\n]{0,40}(midrange|midari)/i,
];

// ── Tarkistukset per artikkeli ─────────────────────────────────────────
for (const p of posts) {
  const c = p.content || "";
  if (!c.trim()) { err(p, "sisältö tyhjä"); continue; }
  if (!["fi", "en"].includes(p.language)) err(p, `kieli "${p.language}" ei ole fi/en`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug || "")) err(p, `slug "${p.slug}" ei ole siisti`);
  if (!p.description || p.description.length > 160) err(p, `kuvaus ${p.description?.length ?? 0} merkkiä (raja 160)`);

  // 1. Merkinnät
  for (const block of c.replace(/\r\n/g, "\n").split(/\n{2,}/)) {
    const b = block.trim();
    if (/^#(?!##? )/.test(b)) err(p, `tuntematon otsikkotaso: "${b.slice(0, 40)}"`);
    if (/^>/m.test(b)) err(p, `lainausmerkintä ">" ei renderöidy: "${b.slice(0, 40)}"`);
    if (/^\|/m.test(b)) err(p, `taulukko ei renderöidy: "${b.slice(0, 40)}"`);
    if (/<\/?[a-z][^>]*>/i.test(b)) err(p, `HTML-tagi tekstissä: "${b.slice(0, 40)}"`);
    if (/(^|\s)__\S|\*\*\*/.test(b)) err(p, `tuntematon korostus: "${b.slice(0, 40)}"`);
    const lines = b.split("\n");
    const listy = lines.filter((l) => /^\s*([-*]|\d+[.)]) +/.test(l)).length;
    if (listy && listy !== lines.length) err(p, `luettelo ja teksti samassa kappaleessa (lisää tyhjä rivi): "${b.slice(0, 40)}"`);
    const stripped = b.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[[^\]]+\]\([^)\s]+\)/g, "");
    if ((stripped.match(/\*\*/g) || []).length % 2) err(p, `pariton ** : "${b.slice(0, 40)}"`);
    if (/\]\(|\[[^\]]*\]\s*\(/.test(stripped)) err(p, `rikkinäinen linkki: "${b.slice(0, 60)}"`);
  }

  // 2. Linkit
  for (const [, label, href] of c.matchAll(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g)) {
    if (/^https?:\/\//.test(href)) continue;
    if (!href.startsWith("/")) { err(p, `linkki "${href}" ei ole /polku eikä https`); continue; }
    const [pathname] = href.split(/[?#]/);
    const blog = pathname.match(/^\/(blogi|blog)\/([^/]+)$/);
    const shop = pathname.match(/^\/shop\/([^/]+)$/);
    if (blog) {
      const [, base, slug] = blog;
      if (!slugs.has(slug)) err(p, `linkki "${label}" → ${href}: artikkelia ei ole`);
      else if (slugs.get(slug) !== p.language) err(p, `linkki ${href} on eri kielellä kuin juttu`);
      if (base !== (p.language === "fi" ? "blogi" : "blog")) err(p, `linkki ${href}: ${p.language}-jutun polku on /${p.language === "fi" ? "blogi" : "blog"}/`);
    } else if (shop) {
      if (!productIds.has(shop[1]) && !staticRoutes.has(pathname)) err(p, `linkki ${href}: tuotetta ei ole`);
    } else if (!staticRoutes.has(pathname)) err(p, `linkki ${href}: reittiä ei ole`);
  }

  // 3. Lentonumerot
  // Nimi taipuu ("Bank Robberin", "the Jailbreak"), joten tuotteen nimeä haetaan
  // sulkeita edeltävistä sanoista eikä vaadita tarkkaa osumaa.
  for (const [, before, s, g, t, f] of c.matchAll(/((?:\S+ ){1,3})\((\d+) \/ (\d+) \/ ([-+]?\d+) \/ (\d+)\)/g)) {
    const name = [...flightByName.keys()].find((n) => before.toLowerCase().includes(n));
    const got = [s, g, Number(t), f].join("/");
    if (!name) err(p, `lentonumerot ${got} "${before.trim()}" kohdalla, mutta tuotetaulusta ei löydy nimeä`);
    else if (flightByName.get(name) !== got) err(p, `${name} ${got} ≠ tuotetaulu ${flightByName.get(name)}`);
  }

  // 4. Hinnat
  for (const m of c.matchAll(/(\d+),(\d{2}) ?€|€ ?(\d+)\.(\d{2})/g)) {
    const cents = Number(m[1] ?? m[3]) * 100 + Number(m[2] ?? m[4]);
    if (!prices.has(cents)) err(p, `hinta "${m[0]}" ei ole minkään aktiivisen tuotteen hinta`);
  }

  // 5. Kansikuva on olemassa
  if (!p.hero_image) err(p, "kansikuva puuttuu");
  else if (p.hero_image.startsWith("/") && !fs.existsSync(path.join(ROOT, "public", p.hero_image))) err(p, `kansikuvaa ${p.hero_image} ei ole`);

  // 8. Kielletyt ilmaukset
  for (const re of BANNED) if (re.test(c) || re.test(p.title || "")) err(p, `kielletty ilmaus ${re}`);
}

// 5–6. Parit ja kuvat: pari = luonnoksen pair-avain, julkaistuilla julkaisupäivä + kansikuva
// (fi ja en julkaistaan samana päivänä samalla kuvalla; 4.11.2026 julkaistiin neljä paria
// samana päivänä). Kaksi paria samalla kuvalla samana päivänä näkyy kieliversiovirheenä.
const pairKey = (p) => p.pair || `julkaistu ${p.published_at} ${p.hero_image}`;
const pairs = new Map();
for (const p of posts) {
  const k = pairKey(p);
  if (!pairs.has(k)) pairs.set(k, []);
  pairs.get(k).push(p);
}
const photoUse = new Map();
for (const [k, ps] of pairs) {
  const langs = ps.map((p) => p.language).sort().join(",");
  if (langs !== "en,fi") errors.push(`${k}: kieliversiot [${langs}], pitää olla tasan fi + en (${ps.map((p) => p.slug).join(", ")})`);
  const photo = photoOf(ps[0].hero_image);
  if (photoUse.has(photo)) errors.push(`sama kansikuva (${photo}) kahdella eri jutulla: ${photoUse.get(photo)} ja ${ps[0].slug}`);
  else photoUse.set(photo, ps[0].slug);
}

console.log(`Blogiportti: ${published.length} julkaistua + ${drafts.length} luonnosta, ${products.length} tuotetta.`);
if (errors.length) {
  console.error(`✗ ${errors.length} löydöstä:\n  - ${errors.join("\n  - ")}`);
  process.exitCode = 1; // ei process.exit(): Windowsin Node kaatuu avoimiin fetch-kahvoihin
} else {
  console.log("✓ kunnossa");
}
