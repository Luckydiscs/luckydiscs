

# UKK-sisällön korjaukset: Liiketoimintamalli

## Ongelmat

UKK-sivun "Tilaaminen ja toimitus" -osio sisältää virheellistä tietoa Lucky Discsin liiketoimintamallista:

1. **Toimitus**: Väittää että suomalaiset saavat ilmaisen toimituksen yli 50€ tilauksista – mutta Lucky Discs ei myy suoraan kuluttajille
2. **Maksutavat**: Puhuu kuluttajille suunnatuista maksutavoista, vaikka myynti tapahtuu jälleenmyyjien kautta
3. **Palautuskäytäntö**: Lupaa 30 päivän tyytyväisyystakuun suoraan Lucky Discsilta
4. **Mukautetut leimasimet**: Epäoleellinen kysymys, jota ei tarvita

## Korjaukset

### Vaihe 1: Päivitä käännökset (useTranslation.tsx)

**Suomi:**

| Avain | Uusi teksti |
|-------|-------------|
| `faq.shipping.question` | "Mistä voin ostaa Lucky Discs -kiekkoja?" |
| `faq.shipping.answer` | "Suomessa Lucky Discs -kiekkoja myy kesapelit.fi. Ulkomaiset asiakkaat voivat kysyä paikalliselta frisbeegolf-kauppiaalta, ottaisiko hän Lucky Discs -kiekot myyntiin." |
| `faq.payment.question` | "Miten jälleenmyyjäksi ryhtyminen toimii?" |
| `faq.payment.answer` | "Käy Jälleenmyynti-sivullamme ja täytä hakulomake. Käsittelemme hakemukset 2 arkipäivässä ja otamme yhteyttä tarkemmilla tiedoilla." |
| `faq.returns.question` | "Mikä on palautuskäytäntö?" |
| `faq.returns.answer` | "Palautuskäytännöt riippuvat jälleenmyyjästä, jolta kiekon ostit. Ota yhteyttä suoraan kyseiseen kauppaan palautusasioissa." |

**Englanti:**

| Avain | Uusi teksti |
|-------|-------------|
| `faq.shipping.question` | "Where can I buy Lucky Discs?" |
| `faq.shipping.answer` | "In Finland, Lucky Discs are available at kesapelit.fi. International customers can ask their local disc golf retailer about stocking Lucky Discs products." |
| `faq.payment.question` | "How does becoming a retailer work?" |
| `faq.payment.answer` | "Visit our Wholesale page and fill out the application form. We process applications within 2 business days and will contact you with details." |
| `faq.returns.question` | "What is the return policy?" |
| `faq.returns.answer` | "Return policies depend on the retailer where you purchased your disc. Please contact that store directly for return inquiries." |

### Vaihe 2: Poista turha kysymys

Poistetaan "mukautetut kiekkoleimasimet" -kysymys kokonaan:

**FAQ.tsx**: Poistetaan AccordionItem "custom-stamps" (rivit 199-206)

**useTranslation.tsx**: Poistetaan käännösavaimet:
- `faq.customStamps.question` (FI + EN)
- `faq.customStamps.answer` (FI + EN)

### Vaihe 3: Poista duplikaatti jälleenmyyjä-kysymys

Nykyinen "Miten ryhdyn jälleenmyyjäksi?" (`faq.wholesale`) on nyt päällekkäinen uuden `faq.payment` -kysymyksen kanssa. 

**Vaihtoehto**: Muutetaan `faq.wholesale` muuksi hyödylliseksi kysymykseksi tai poistetaan se.

---

## Yhteenveto

| Tiedosto | Muutos |
|----------|--------|
| `src/hooks/useTranslation.tsx` | Päivitetään shipping, payment, returns -vastaukset vastaamaan liiketoimintamallia |
| `src/hooks/useTranslation.tsx` | Poistetaan customStamps-käännökset |
| `src/pages/FAQ.tsx` | Poistetaan "custom-stamps" AccordionItem |

## Lopputulos

FAQ kertoo oikein:
- Lucky Discs ei myy suoraan kuluttajille
- Suomalaiset ostavat kesapelit.fi:stä
- Ulkomaalaiset kysyvät paikallisilta kauppiailta
- Palautukset hoidetaan jälleenmyyjän kautta

