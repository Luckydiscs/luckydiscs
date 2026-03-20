/**
 * Post-build SEO page generator for Lucky Discs SPA.
 *
 * Creates route-specific index.html files in dist/ so that:
 *   1. Each route has its own <title>, <meta description>, canonical, OG tags
 *   2. Googlebot (and other crawlers) see meaningful HTML content even without JS
 *   3. The SPA still hydrates and takes over once JS loads
 *
 * Run after `vite build`: node scripts/generate-seo-pages.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const BASE_URL = "https://www.luckydiscs.fi";

// ── Route SEO definitions ──────────────────────────────────────────────
const routes = [
  {
    path: "/discs",
    title: "Lucky Discs Collection - Premium Disc Golf Discs | Drivers, Fairways, Midranges & Putters",
    description:
      "Browse Lucky Discs complete collection of premium disc golf discs. Professional drivers, fairway discs, midranges and putters including Bank Robber, Treasure Hunt, Money Shot and Jailbreak.",
    keywords: "disc golf discs, drivers, fairway discs, mid-range discs, putters, Bank Robber, Treasure Hunt, Money Shot, Jailbreak, Lucky Discs collection",
    content: `<h1>Lucky Discs Collection</h1>
      <p>Browse our complete lineup of premium disc golf discs, designed and tested in Finland.</p>
      <h2>Our Discs</h2>
      <ul>
        <li><strong>Bank Robber</strong> — High-speed distance driver (13 / 5 / -1 / 3). A premium overstable distance driver for experienced players seeking maximum control.</li>
        <li><strong>Treasure Hunt</strong> — Control fairway driver (7 / 5 / -1 / 1). A versatile fairway driver that flies true in any conditions.</li>
        <li><strong>Money Shot</strong> — All-purpose midrange (5 / 5 / -1 / 1). A straight-flying midrange disc that's perfect for approaches and accurate lines.</li>
        <li><strong>Jailbreak</strong> — Stable putting putter (2 / 3 / 0 / 1). A reliable, stable putter designed for confident putting inside and outside the circle.</li>
      </ul>`,
  },
  {
    path: "/disc-guide",
    title: "Disc Golf Selection Guide - Find Your Perfect Disc | Lucky Discs",
    description:
      "Complete disc golf selection guide. Learn how to choose the right disc for your skill level and play style. Understand flight numbers, disc types, and expert recommendations.",
    keywords: "disc golf guide, disc selection, how to choose disc golf disc, flight numbers explained, beginner disc golf, disc types guide",
    content: `<h1>Disc Golf Selection Guide</h1>
      <p>Find the perfect disc for your game. Whether you're a beginner or a seasoned pro, our guide helps you choose the right disc for every situation.</p>
      <h2>Understanding Flight Numbers</h2>
      <p>Every disc has four flight numbers: Speed, Glide, Turn, and Fade. These numbers describe how a disc will fly through the air.</p>
      <h2>Disc Types</h2>
      <p>Distance Drivers, Fairway Drivers, Midranges, and Putters — each type serves a different purpose on the course.</p>`,
  },
  {
    path: "/wholesale",
    title: "Wholesale Disc Golf Equipment - B2B Partnership | Lucky Discs",
    description:
      "Partner with Lucky Discs for wholesale disc golf equipment. Competitive pricing, premium Finnish quality, reliable supply chain for retailers and distributors worldwide.",
    keywords: "wholesale disc golf, B2B disc golf, disc golf distributor, bulk disc golf discs, retail partnership, Lucky Discs wholesale",
    content: `<h1>Wholesale Partnership</h1>
      <p>Partner with Lucky Discs for premium disc golf equipment at competitive wholesale pricing. We supply retailers and distributors worldwide with high-quality Finnish-made discs.</p>
      <h2>Why Partner With Us</h2>
      <p>Premium quality, competitive margins, reliable supply chain, and marketing support for your retail business.</p>`,
  },
  {
    path: "/brand",
    title: "Lucky Discs Brand Story - Finnish Disc Golf Heritage | Modern Discs, Wild Style",
    description:
      "Discover the Lucky Discs brand story. Finnish-designed premium disc golf equipment combining Nordic innovation with bold style. Modern Discs. Wild Style. Lucky Throws.",
    keywords: "Lucky Discs brand, Finnish disc golf brand, disc golf manufacturer Finland, disc golf history, VESITIIVIS Oy",
    content: `<h1>The Lucky Discs Brand</h1>
      <p>Modern Discs. Wild Style. Lucky Throws. Born in Nokia, Finland, Lucky Discs combines Nordic innovation with bold design philosophy.</p>
      <p>Every disc is engineered and tested in Finland, bringing premium quality to disc golfers worldwide.</p>`,
  },
  {
    path: "/team",
    title: "Team Lucky Discs - Our Sponsored Athletes & Players",
    description:
      "Meet Team Lucky Discs. Our sponsored athletes and ambassadors represent the brand in tournaments and events worldwide. Join the Lucky Discs family.",
    keywords: "Team Lucky Discs, disc golf sponsored athletes, disc golf team, Lucky Discs players, disc golf ambassadors",
    content: `<h1>Team Lucky Discs</h1>
      <p>Meet the talented athletes who represent Lucky Discs on courses around the world. Our team members are passionate disc golfers who push the limits of the sport.</p>`,
  },
  {
    path: "/contact",
    title: "Contact Lucky Discs - Get in Touch | Customer Service & Inquiries",
    description:
      "Contact Lucky Discs for product inquiries, wholesale partnerships, sponsorship opportunities, or general questions. Based in Nokia, Finland.",
    keywords: "contact Lucky Discs, disc golf customer service, Lucky Discs email, disc golf inquiries Finland",
    content: `<h1>Contact Us</h1>
      <p>Have questions about Lucky Discs products, wholesale opportunities, or sponsorships? We'd love to hear from you.</p>
      <p>Email: sales@luckydiscs.fi</p>
      <p>Location: Nokia, Finland</p>`,
  },
  {
    path: "/faq",
    title: "FAQ - Frequently Asked Questions | Lucky Discs",
    description:
      "Find answers to frequently asked questions about Lucky Discs products, ordering, shipping, wholesale partnerships, and disc golf equipment.",
    keywords: "Lucky Discs FAQ, disc golf questions, Lucky Discs shipping, disc golf equipment FAQ",
    content: `<h1>Frequently Asked Questions</h1>
      <p>Find answers to common questions about Lucky Discs products, ordering, shipping, and more.</p>`,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Lucky Discs",
    description: "Lucky Discs privacy policy. Learn how we collect, use, and protect your personal data. GDPR compliant.",
    keywords: "Lucky Discs privacy policy, GDPR, data protection",
    content: `<h1>Privacy Policy</h1><p>Lucky Discs is committed to protecting your privacy. This policy explains how we handle your personal data.</p>`,
  },
  {
    path: "/terms",
    title: "Terms of Service | Lucky Discs",
    description: "Lucky Discs terms of service. Read our terms and conditions for using our website and purchasing our products.",
    keywords: "Lucky Discs terms of service, terms and conditions",
    content: `<h1>Terms of Service</h1><p>These terms govern your use of the Lucky Discs website and services.</p>`,
  },
];

// ── Main ───────────────────────────────────────────────────────────────
const templateHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

let created = 0;

for (const route of routes) {
  const canonicalUrl = `${BASE_URL}${route.path}`;

  let html = templateHtml;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${route.description}"`
  );

  // Replace meta keywords
  if (route.keywords) {
    html = html.replace(
      /<meta name="keywords" content="[^"]*"/,
      `<meta name="keywords" content="${route.keywords}"`
    );
  }

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${route.title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${route.description}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${route.title}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${route.description}"`
  );

  // Replace hreflang URLs
  html = html.replace(
    /(<link rel="alternate" hreflang="en" href=")[^"]*(")/,
    `$1${canonicalUrl}$2`
  );
  html = html.replace(
    /(<link rel="alternate" hreflang="fi" href=")[^"]*(")/,
    `$1${canonicalUrl}$2`
  );
  html = html.replace(
    /(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/,
    `$1${canonicalUrl}$2`
  );

  // Inject SEO content inside <noscript> block right after <div id="root">
  // This gives crawlers meaningful content even without JavaScript
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript>\n      <div class="seo-content">\n        ${route.content}\n        <p><a href="${BASE_URL}">Lucky Discs</a> — Modern Discs. Wild Style. Lucky Throws.</p>\n      </div>\n    </noscript>`
  );

  // Write to dist/{route}/index.html
  const routeDir = path.join(DIST, route.path);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
  created++;

  console.log(`  ✓ ${route.path}/index.html`);
}

console.log(`\n✅ Generated ${created} pre-rendered SEO pages in dist/`);
