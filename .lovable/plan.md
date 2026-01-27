
# Daniel Davidsson -tiimisivun päivitys

## Tilanne

Daniel Davidsson ei enää jatka Lucky Discs -tiimissä vuonna 2026. Vuonna 2025 hän voitti Suomen mestaruuden Lucky Discs -tiimissä.

## Päivitykset

### 1. Team.tsx - Sivu muutetaan kokonaan

**Nykyinen sisältö:** Daniel esitellään aktiivisena tiimin kapteenina
**Uusi sisältö:** 
- Daniel esitellään "menneisyyden menestystarinana" - vuonna 2025 voitti SM-kullan Lucky Discs -tiimissä
- Selkeä maininta: "Sopimus ei jatkunut vuodelle 2026"
- Uusi CTA-osio: "Oletko sinä seuraava tähtipelaajamme?" 
- Kutsu pelaajia hakemaan tiimiin yhteystietoineen

**Poistettavat osiot:**
- "Team Captain" -titteli
- Danielin sitaatti aktiivisena pelaajana
- "Danielin nimikirjoituskiekko" -osio (Money Shot jää mallistoon, mutta ei ole enää Danielin signature disc)
- PDGA-pelaaja kortti (henkilökohtaiset tiedot)

**Lisättävät osiot:**
- "Hall of Fame" / "Mestaruushistoria 2025" -osio
- "Haemme uusia tiimipelaajia" -osio
- Hakemuslomake tai linkki yhteystietoihin

### 2. Käännökset (useTranslation.tsx)

**Päivitettävät avaimet (englanti + suomi):**
- `team.subtitle` → Tiimisivu päivitetään kertomaan menneestä menestyksestä ja tulevista mahdollisuuksista
- `team.meetChampion` → "Our 2025 Championship Story" / "Mestaruustarivamme 2025"
- `team.championSubtitle` → Maininta että sopimus ei jatkunut
- `team.danielTitle` → "Finnish Champion 2025 with Lucky Discs"
- `team.danielQuote` → Poistetaan tai muutetaan historialliseksi
- `team.signatureDisc` → Poistetaan
- `team.signatureDiscDesc` → Poistetaan

**Uudet avaimet:**
- `team.lookingForStars` → "Are You Our Next Star?" / "Oletko sinä seuraava tähtipelaajamme?"
- `team.joinTeamDesc` → Kuvaus mitä tarjoamme tiimipelaajille
- `team.applyNow` → "Apply Now" / "Hae mukaan"
- `team.contractEnded` → "Contract ended after 2025 season" / "Sopimus päättyi kauden 2025 jälkeen"

### 3. FAQ.tsx - Daniel-kysymyksen päivitys

**Päivitettävät avaimet:**
- `faq.danielCollaboration.question` → "Who won the Finnish Championship with Lucky Discs in 2025?"
- `faq.danielCollaboration.answer` → Historiallinen kuvaus Danielin mestaruudesta

### 4. NotFound.tsx - Poistetaan Daniel-viittaukset

**Nykyinen:** "Read About Daniel" -nappi ja Danielin kuva
**Uusi:** Yleinen "Explore Our Team" -nappi ja Lucky Discs -kuva tai jokin muu

### 5. SEO-päivitykset Team.tsx:ssä

- Päivitetään meta title: "Lucky Discs Team - 2025 Finnish Championship | Join Our Team"
- Päivitetään meta description
- Päivitetään structured data (Person → HistoricalEvent tai poistetaan)

## Tekninen toteutus

**Muutettavat tiedostot:**
1. `src/pages/Team.tsx` - Suurin muutos, koko sivun uudelleenrakentaminen
2. `src/hooks/useTranslation.tsx` - Käännösten päivitys (EN + FI)
3. `src/pages/FAQ.tsx` - Pieni muutos, kysymys päivitetään
4. `src/pages/NotFound.tsx` - Daniel-kuva ja -nappi poistetaan

## Sivun uusi rakenne

```text
+------------------------------------------+
|           LUCKY DISCS TEAM               |
|  Championship mindset, future stars      |
+------------------------------------------+
|                                          |
|     2025 CHAMPIONSHIP HISTORY            |
|  +------------------------------------+  |
|  | Daniel Davidsson kuva              |  |
|  | "Suomen mestari 2025 Lucky Discs   |  |
|  |  tiimissä"                         |  |
|  | Sopimus päättyi kauden 2025 jälkeen|  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
|                                          |
|     CHAMPIONSHIP MINDSET                 |
|  (säilytetään nykyinen filosofia-osio)   |
|                                          |
+------------------------------------------+
|                                          |
|     ARE YOU OUR NEXT STAR?               |
|  +------------------------------------+  |
|  | Haemme uusia tiimipelaajia!        |  |
|  | - Mitä tarjoamme                   |  |
|  | - Mitä haemme                      |  |
|  | [HAE MUKAAN] -nappi -> /contact    |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
|                                          |
|     FOLLOW OUR JOURNEY                   |
|  (säilytetään sosiaalisen median linkit) |
|                                          |
+------------------------------------------+
```

## Huomioitavaa

- Money Shot -kiekko jää mallistoon, mutta ei ole enää "Danielin signature disc"
- Danielin kuvia voidaan käyttää historiallisessa kontekstissa
- Uusi fokus: tiimin kasvu ja uusien pelaajien rekrytointi
