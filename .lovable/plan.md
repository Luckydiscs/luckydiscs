
# Korjaussuunnitelma: Brand-sivu kontrastiongelma & Team-sivu tekstityyli

## Ongelma 1: Brand-sivun vihreä osio (CTA Section)

### Syy
Brand-sivun alaosassa (rivit 410-446) on vihreä tausta (`bg-lucky-green`), mutta sen sisällä oleva DiscPromotion-komponentti käyttää `text-primary` (vihreä) ja `text-muted-foreground` (harmaa) värejä tekstiin. Tämä aiheuttaa vihreä-vihreällä -tilanteen, jossa kontrasti on olematon.

### Ratkaisu
Luodaan DiscPromotion-komponenttiin uusi `lightBackground` prop, joka vaihtaa värit sopiviksi vaaleilla/vihreillä taustoilla:
- Pääväri: musta (`text-black`) vihreän sijaan
- Kuvausten teksti: tumma harmaa (`text-gray-700`) vaalean harmaan sijaan
- Taustalaatikko: tumma gradient vaalean sijaan

### Muutettavat tiedostot
1. **src/components/DiscPromotion.tsx**
   - Lisätään `lightBackground?: boolean` prop
   - Muutetaan inline-variantin värit dynaamisiksi: kun `lightBackground=true`, käytetään tummia värejä

2. **src/pages/Brand.tsx** (rivi 414-420)
   - Lisätään `lightBackground={true}` DiscPromotion-kutsuun

---

## Ongelma 2: Team-sivun liian boldattu/hohtava valkoinen teksti

### Syy
Team-sivulla käytetään useita font-weight luokkia (`font-semibold`, `font-bold`) valkoiselle tekstille tummalla taustalla. Bebas Neue -heading-fontti on jo luonnostaan paksu, ja ylimääräinen boldaus tekee siitä visuaalisesti raskaan ja vaikeasti luettavan.

### Ratkaisu
Kevennetään tekstien painotusta:
- `font-bold` → `font-semibold` tai `font-medium`
- `font-semibold` → `font-medium` tai `font-normal`
- Pienennetään heading-fontin käyttöä pienemmissä otsikoissa

### Muutettavat tiedostot
**src/pages/Team.tsx**
- Rivi 111: `font-semibold` → `font-medium` (Hero H1)
- Rivi 128: `font-semibold` → `font-medium` (Hall of Fame otsikko)
- Rivi 148: `font-semibold` → `font-medium` (Daniel nimi)
- Rivi 187: `font-bold` → `font-semibold` (Championship Mindset)
- Rivi 197, 206, 215: `font-semibold` → `font-medium` (Excellence, Team Spirit, Innovation)
- Rivi 233: `font-bold` → `font-semibold` (Are You Our Next Star)
- Rivi 293: `font-bold` → `font-semibold` (Championship Results)
- Rivi 329: `font-bold` → `font-semibold` (Follow Journey)

---

## Tekninen toteutus

### Vaihe 1: DiscPromotion.tsx päivitys

```typescript
interface DiscPromotionProps {
  // ... olemassa olevat propsit
  lightBackground?: boolean;  // UUSI
}

// Inline-variantissa (rivit 44-101):
// Muutetaan värit dynaamisiksi:
const textPrimary = lightBackground ? 'text-black' : 'text-primary';
const textMuted = lightBackground ? 'text-gray-700' : 'text-muted-foreground';
const bgGradient = lightBackground 
  ? 'bg-gradient-to-r from-black/10 to-black/20 border-black/30' 
  : 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20';
```

### Vaihe 2: Brand.tsx päivitys

```tsx
<DiscPromotion 
  discName="bankRobber"
  discImage={bankRobberDisc}
  flightNumbers={{ speed: 8, glide: 5, turn: -1, fade: 2 }}
  buyUrl="https://kesapelit.fi/tuote/premium-bank-robber"
  variant="inline"
  lightBackground={true}  // LISÄTÄÄN
/>
```

### Vaihe 3: Team.tsx tekstipainotusten kevennys

Kaikki `font-bold` → `font-semibold`
Kaikki `font-semibold` → `font-medium`

---

## Yhteenveto

| Sivu | Ongelma | Ratkaisu |
|------|---------|----------|
| Brand | Vihreä teksti vihreällä taustalla | `lightBackground` prop + mustat tekstit |
| Team | Liian paksut valkoiset tekstit | Kevennetään font-weight arvoja |

Molemmat korjaukset parantavat luettavuutta ja kontrastia merkittävästi ilman visuaalisen identiteetin muuttamista.
