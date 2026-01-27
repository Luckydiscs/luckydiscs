

# SEO-parannukset: Favicon, Sitelinkit & Structured Data

## Ongelma 1: Google näyttää väärän kuvan faviconina

### Tilanne
Google näyttää hakutuloksissa oranssin/kultaisen kiekon kuvan, ei Lucky Discs -logoa jossa on musta pataässä. Tämä johtuu useista tekijöistä:
- Favicon on vain yksi PNG-tiedosto (512x512)
- Google saattaa valita OG-kuvan tai muun sivuston kuvan
- Selainvälimuisti ja Googlen indeksi eivät ole päivittyneet

### Ratkaisu
1. **Lisätään useita favicon-kokoja ja formaatteja** (index.html):
   - 16x16, 32x32, 48x48 PNG-kuvat
   - Apple Touch Icon (180x180)
   - `manifest.json` PWA-tuki
   - Varmistetaan että kuvat käyttävät mustalla pataässällä varustettua logoa

2. **Päivitetään OG-kuva** kaikille sivuille osoittamaan samaan logoon

## Ongelma 2: Vain 2 sitelinkkiä näkyy

### Tilanne
Google näyttää vain 2 sitelinkkiä ("Lucky Discs Discs" ja "Professional Team"). Tämä on normaalia uusille/pienille sivustoille.

### Syyt
- Sivuston ikä ja auktoriteetti
- Puutteellinen structured data navigaatiolle
- Sitemapin prioriteettiarvot

### Ratkaisu
1. **Lisätään WebSite structured data** (index.html):
   - Sisältää `potentialAction` SearchAction-elementin
   - Auttaa Googlea ymmärtämään sivuston rakennetta

2. **Lisätään SiteNavigationElement structured data**:
   - Määrittelee tärkeimmät sivut navigaatioelementeiksi
   - Parantaa mahdollisuuksia saada lisää sitelinkkejä

3. **Päivitetään sitemap.xml**:
   - Päivitetään `lastmod` -päivämäärät ajankohtaisiksi
   - Tarkistetaan prioriteetit

## Ongelma 3: Muut SEO-korjaukset

### Virheet
1. **ContactPoint URL väärä** (index.html rivi 76):
   - Nykyinen: `https://luckydiscs.com/contact`
   - Pitäisi olla: `https://www.luckydiscs.fi/contact`

2. **Sitemap vanhentunut**:
   - lastmod: 2025-01-19 → 2026-01-27

---

## Muutettavat tiedostot

### 1. index.html
- Päivitetään favicon-linkit (useita kokoja)
- Lisätään Apple Touch Icon
- Korjataan contactPoint URL
- Lisätään WebSite structured data
- Lisätään SiteNavigationElement structured data

### 2. public/sitemap.xml
- Päivitetään lastmod-päivämäärät

### 3. Uudet tiedostot (valinnainen)
- `public/manifest.json` - PWA-tuki, parantaa favicon-näkyvyyttä

---

## Tekninen toteutus

### index.html - Favicon-osio

```html
<!-- Favicon Suite -->
<link rel="icon" type="image/png" sizes="32x32" href="/lucky-discs-logo.png">
<link rel="icon" type="image/png" sizes="16x16" href="/lucky-discs-logo.png">
<link rel="apple-touch-icon" sizes="180x180" href="/lucky-discs-logo.png">
<link rel="manifest" href="/manifest.json">
```

### index.html - WebSite Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lucky Discs",
  "url": "https://www.luckydiscs.fi",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.luckydiscs.fi/discs?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### index.html - SiteNavigationElement

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Discs",
      "url": "https://www.luckydiscs.fi/discs"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Team",
      "url": "https://www.luckydiscs.fi/team"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Wholesale",
      "url": "https://www.luckydiscs.fi/wholesale"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Contact",
      "url": "https://www.luckydiscs.fi/contact"
    }
  ]
}
```

### public/manifest.json (uusi tiedosto)

```json
{
  "name": "Lucky Discs",
  "short_name": "Lucky Discs",
  "icons": [
    {
      "src": "/lucky-discs-logo.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#008800",
  "background_color": "#000000",
  "display": "standalone"
}
```

---

## Huomioitavaa

### Favicon-kuvan vaihto
Jos haluat vaihtaa faviconin kuvaan jossa on **musta pataässä**, sinun tulee toimittaa kyseinen kuvatiedosto (esim. 512x512 PNG). Tällä hetkellä `public/lucky-discs-logo.png` on käytössä oleva kuva. Jos sinulla on eri logo pataässällä, lähetä se niin korvaan nykyisen.

### Googlen indeksin päivittyminen
- Muutokset eivät näy heti Googlessa
- Google indeksoi sivustot omalla aikataulullaan (päivistä viikkoihin)
- Voit nopeuttaa pyytämällä uudelleenindeksointia Google Search Consolessa

### Sitelinkkien lisääminen
- Google päättää itse kuinka monta sitelinkkiä näytetään
- Structured data parantaa mahdollisuuksia, mutta ei takaa tuloksia
- Sivuston kasvaessa ja saadessa lisää liikennettä, sitelinkkejä tulee lisää

---

## Yhteenveto muutoksista

| Tiedosto | Muutos |
|----------|--------|
| `index.html` | Favicon-linkit, Apple Touch Icon, manifest-linkki |
| `index.html` | Korjataan contactPoint URL (.com → .fi) |
| `index.html` | Lisätään WebSite structured data |
| `index.html` | Lisätään SiteNavigationElement structured data |
| `public/sitemap.xml` | Päivitetään lastmod-päivämäärät |
| `public/manifest.json` | Uusi tiedosto PWA-tueksi |

