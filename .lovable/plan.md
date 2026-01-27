

# UKK-sivun korjaukset: Sisältö ja visuaalinen luettavuus

## Ongelmat

### 1. Virheellinen toimitus- ja maksutieto
Nykyinen sisältö väittää, että Lucky Discs toimittaa maailmanlaajuisesti kuluttajille. Todellisuudessa:
- Lucky Discs ei myy suoraan kuluttajille ulkomaille
- Ulkomaiset asiakkaat voivat kysyä paikalliselta frisbeegolf-kauppiaalta, ottaisiko hän Lucky Discs -kiekot myyntiin

### 2. Valkoinen teksti liian kirkas/raskas silmille
Sama ongelma kuin Team-sivulla: `font-semibold` ja `text-gray-100` yhdistelmä on liian kirkas tummalla taustalla.

---

## Päivitykset

### Vaihe 1: Käännösten päivitys (useTranslation.tsx)

**Englanti:**
```
faq.shipping.question: "Do you ship worldwide?"
faq.shipping.answer: "Currently, we do not ship directly to consumers worldwide. However, you can inquire with your local disc golf retailer about stocking Lucky Discs. For Finnish customers, free shipping is available on orders over €50. International customers may be responsible for customs duties."

faq.payment.question: "What payment methods do you accept?"
faq.payment.answer: "We accept all major credit cards, PayPal, and bank transfers. For wholesale customers, we offer Net 30 payment terms after account approval."
```

**Suomi:**
```
faq.shipping.question: "Toimitatteko maailmanlaajuisesti?"
faq.shipping.answer: "Emme tällä hetkellä toimita suoraan kuluttajille ulkomaille. Voit kuitenkin kysyä paikalliselta frisbeegolf-kauppiaaltasi, ottaisiko hän Lucky Discs -kiekot myyntiin. Suomalaiset asiakkaat saavat ilmaisen toimituksen yli 50€ tilauksista."

faq.payment.question: "Mitä maksutapoja hyväksytte?"
faq.payment.answer: "Hyväksymme kaikki suurimmat luottokortit, PayPalin ja pankkisiirrot. Jälleenmyyjäasiakkaille tarjoamme 30 päivän maksuehdon tilin hyväksynnän jälkeen."
```

### Vaihe 2: FAQ.tsx visuaaliset parannukset

**Tekstien kevennys (kuten Team-sivulla):**
- AccordionTrigger: `font-semibold` → `font-medium`
- Osioiden otsikot (h2): `text-gray-100` → `text-gray-200`
- Accordion tekstit: `text-xl md:text-2xl` → `text-lg md:text-xl` (hieman pienempi)
- Hero otsikko: `font-bold` → `font-semibold`

**Rivit ja muutokset:**
- Rivi 77: `font-bold` → `font-semibold` (Hero H1)
- Rivi 91: `text-gray-100` → `text-gray-200` (General Questions otsikko)
- Rivi 96, 105, 114, 123: `font-semibold` → `font-medium` (Accordion kysymykset)
- Rivi 134: `text-gray-100` → `text-gray-200` (Ordering & Shipping otsikko)
- Rivi 139, 148, 157, 166: `font-semibold` → `font-medium`
- Rivi 177: `text-gray-100` → `text-gray-200` (Products otsikko)
- Rivi 182, 191, 200: `font-semibold` → `font-medium`
- Rivi 212: `text-gray-100` → `text-gray-200` (Still Have Questions otsikko)

---

## Yhteenveto muutoksista

| Tiedosto | Muutos |
|----------|--------|
| `src/hooks/useTranslation.tsx` | Päivitetään `faq.shipping.answer` (EN + FI) kuvaamaan, ettei suoraa toimitusta ulkomaille ole |
| `src/hooks/useTranslation.tsx` | Päivitetään `faq.payment.answer` (EN + FI) vastaamaan jälleenmyyjäasiakkaita |
| `src/pages/FAQ.tsx` | Kevennetään `font-weight` arvoja: `font-bold` → `font-semibold`, `font-semibold` → `font-medium` |
| `src/pages/FAQ.tsx` | Pehmennetään otsikkovärejä: `text-gray-100` → `text-gray-200` |

---

## Tekninen toteutus

### useTranslation.tsx - rivit 427-430 (EN) ja 858-861 (FI)

**Englanti (rivit 427-430):**
```typescript
'faq.shipping.question': 'Do you ship worldwide?',
'faq.shipping.answer': 'Currently, we do not ship directly to consumers worldwide. However, you can inquire with your local disc golf retailer about stocking Lucky Discs. For Finnish customers, free shipping is available on orders over €50.',
'faq.payment.question': 'What payment methods do you accept?',
'faq.payment.answer': 'We accept all major credit cards, PayPal, and bank transfers. For wholesale customers, we offer Net 30 payment terms after account approval.',
```

**Suomi (rivit 858-861):**
```typescript
'faq.shipping.question': 'Toimitatteko maailmanlaajuisesti?',
'faq.shipping.answer': 'Emme tällä hetkellä toimita suoraan kuluttajille ulkomaille. Voit kuitenkin kysyä paikalliselta frisbeegolf-kauppiaaltasi, ottaisiko hän Lucky Discs -kiekot myyntiin. Suomalaiset asiakkaat saavat ilmaisen toimituksen yli 50€ tilauksista.',
'faq.payment.question': 'Mitä maksutapoja hyväksytte?',
'faq.payment.answer': 'Hyväksymme kaikki suurimmat luottokortit, PayPalin ja pankkisiirrot. Jälleenmyyjäasiakkaille tarjoamme 30 päivän maksuehdon tilin hyväksynnän jälkeen.',
```

### FAQ.tsx - visuaaliset muutokset

```tsx
// Rivi 77: Hero otsikko
<h1 className="text-4xl md:text-6xl font-semibold mb-6 ...">

// Rivit 91, 134, 177, 212: Osioiden otsikot
<h2 className="text-3xl md:text-4xl font-heading mb-6 text-gray-200">

// Kaikki AccordionTrigger komponentit
<AccordionTrigger className="text-left font-medium text-gray-200 text-lg md:text-xl hover:text-lucky-green">
```

---

## Lopputulos

Tämän korjauksen jälkeen:
- FAQ-sivu kertoo oikein, ettei suoraa kuluttajamyyntiä ulkomaille ole
- Asiakkaita ohjataan kysymään paikalliselta jälleenmyyjältä
- Valkoinen teksti on pehmeämpää ja helpommin luettavaa tummalla taustalla
- Yhtenäinen visuaalinen tyyli Team-sivun kanssa

