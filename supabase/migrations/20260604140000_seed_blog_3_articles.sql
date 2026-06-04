-- Lucky Discs — 3 uutta blogiartikkelia (2026-06-04)
-- B2C-näkökulmat: aloittelijan ostoopas, lentonumerot, suomalainen valmistus.
-- Sisältö E-string-muodossa: \n\n erottaa kappaleet, ## ja ### ovat otsikoita
-- (sama muoto kuin blog-renderöijä BlogPost.tsx odottaa).

insert into public.blog_posts
  (slug, title, description, content, category, keywords, reading_time, author, hero_image, hero_alt, published, published_at)
values
(
  'aloittelijan-opas-ensimmaiset-kiekot',
  'Aloittelijan opas: näin valitset ensimmäiset frisbeegolfkiekkosi',
  'Aloitatko frisbeegolfin? Älä osta kymmentä kiekkoa kerralla. Näillä kolmella kiekolla pääset alkuun ja kehityt nopeammin — putteri, keskari ja hallittu fairway driver.',
  E'Frisbeegolf on yksi helpoimmista lajeista aloittaa: tarvitset vain kiekon ja lähimmän radan. Moni aloittelija tekee silti saman virheen — ostaa heti pussillisen nopeita drivereitä, joita on lähes mahdoton heittää suoraan. Tässä oppaassa kerromme, miksi kolme oikein valittua kiekkoa vie sinut pidemmälle kuin kymmenen vääränlaista.\n\n## Aloita kolmella kiekolla\n\nKokeneetkin pelaajat kiertävät usein radan kolmella kiekolla: putterilla, keskarilla (midari) ja yhdellä hallittavalla driverillä. Aloittelijalle tämä on täydellinen valikoima. Opit jokaisen kiekon lentoradan kunnolla sen sijaan, että arpoisit kymmenen erilaisen kiekon välillä. Vähemmän on tässä lajissa enemmän.\n\n## Putteri — tarkkuutta lähelle koria\n\nPutteri on tärkein kiekkosi. Sillä viimeistelet väylät ja sillä opit puhtaan heittotekniikan. Hidas ja vakaa putteri lentää ennustettavasti eikä karkaa käsistä. Lucky Discsin Money Shot on juuri tällainen luotettava putteri: matala nopeus ja tasainen lento tekevät siitä anteeksiantavan myös lähestymisheitoissa. Harjoittele puttausta kotipihalla — se on nopein tapa pudottaa tuloksia.\n\n## Keskari eli midari — monipuolisin työkalu\n\nKeskari on kiekko, jolla pelaat suurimman osan väylistä alkuvaiheessa. Se lentää suoraan, on helppo hallita ja antaa riittävästi pituutta ilman, että vaatii kovaa heittovoimaa. Lucky Discsin Jailbreak on vakaa midari, joka kestää aloittelijankin heittovirheet ja palkitsee puhtaan heiton suoralla lennolla. Jailbreak on saatavilla kestävässä Ultrium-muovissa, joka säilyttää lento-ominaisuutensa pitkään.\n\n## Fairway driver — pituutta hallitusti\n\nKun perustekniikka alkaa olla hallussa, hallittu fairway driver tuo lisää pituutta ilman, että lento muuttuu arvaamattomaksi. Lucky Discsin Bank Robber on nopeudeltaan maltillinen (speed 8) fairway driver, joka loistaa teknisillä väylillä luotettavalla lentoradalla. Se on selvästi helpompi kuin varsinaiset distance driverit, joten siitä on iloa pitkään.\n\n## Älä aloita nopeimmista drivereista\n\nDistance driverit, kuten Lucky Discsin Treasure Hunt (speed 12), ovat houkuttelevia, koska niillä saa kovassa kädessä huikeita pituuksia. Aloittelijan kädessä ne kuitenkin kääntyvät ja sukeltavat hallitsemattomasti, koska ne vaativat paljon heittovoimaa toimiakseen oikein. Säästä distance driver siihen hetkeen, kun heittotekniikkasi ja -voimasi ovat kehittyneet — silloin siitä on aitoa hyötyä.\n\n## Paino ja muovi\n\nKevyempi kiekko lähtee pienemmälläkin voimalla ja sopii usein aloittelijalle. Muovilaadulla taas vaikutat kestävyyteen ja tuntumaan: kestävä muovi sietää osumat puihin ja säilyttää lentonsa pidempään. Älä murehdi tätä liikaa alussa — tärkeintä on päästä heittämään.\n\n## Yhteenveto\n\nPutteri, keskari ja yksi hallittava driver. Sillä yhdistelmällä opit lajin perusteet nopeammin ja pysyt väylällä paremmin kuin täydellä bägillä nopeita kiekkoja. Tutustu koko mallistoomme verkkokaupassa ja lue lisää lentonumeroista Kiekkojen valintaoppaastamme — autamme mielellämme löytämään sinulle sopivat ensikiekot.',
  'Aloittelijoille',
  'aloittelijan frisbeegolf, ensimmäiset kiekot, frisbeegolf aloittelija opas, putteri midari driver, mitä kiekkoja aloittelijalle',
  7,
  'Lucky Discs',
  '/images/brand/blog-disc-golf-forest.webp',
  'Frisbeegolfkiekkoja metsäradalla',
  true,
  '2026-05-14'
),
(
  'lentonumerot-haltuun-speed-glide-turn-fade',
  'Lentonumerot haltuun: mitä Speed, Glide, Turn ja Fade oikeasti tarkoittavat',
  'Jokaisessa kiekossa on neljä numeroa. Kun ymmärrät mitä Speed, Glide, Turn ja Fade tarkoittavat, osaat valita oikean kiekon jokaiseen heittoon — selitämme ne selkokielellä.',
  E'Jokaisen frisbeegolfkiekon kyljessä on neljä numeroa, esimerkiksi 8 / 5 / -1 / 2. Ne kertovat, miten kiekko lentää. Kun opit lukemaan numerot, et enää arvaa kiekkovalintaa vaan tiedät, mitä kädessäsi tapahtuu. Käydään ne läpi yksi kerrallaan oikean käden rystyheiton näkökulmasta.\n\n## Speed eli nopeus (1–14)\n\nNopeus kertoo, kuinka lujaa kiekkoa pitää heittää, jotta se lentää suunnitellusti. Suuret numerot vaativat enemmän heittovoimaa ja ovat tyypillisesti matkadrivereita. Pienet numerot taas toimivat pehmeälläkin heitolla. Esimerkiksi Lucky Discsin Money Shot on hidas putteri (speed 4), kun taas Treasure Hunt on nopea distance driver (speed 12). Aloittelijan kannattaa suosia matalia nopeuksia — niillä lento onnistuu ilman täyttä voimaa.\n\n## Glide eli liito (1–7)\n\nLiito kuvaa kiekon kykyä pysyä ilmassa. Suurempi liito auttaa kiekkoa lentämään pidemmälle pienemmällä voimalla, mikä on aloittelijalle eduksi. Pienempi liito tekee lennosta hallitumman ja ennustettavamman tuulessa. Liito on usein aliarvostettu numero, mutta se vaikuttaa pituuteen yllättävän paljon.\n\n## Turn eli kääntyvyys (-5…1)\n\nTurn kuvaa kiekon taipumusta kääntyä oikealle lennon nopean alkuvaiheen aikana. Mitä pienempi (negatiivisempi) luku, sitä enemmän kiekko kääntyy oikealle. Negatiivinen turn (esimerkiksi -2 tai -3) tekee kiekosta alivakaan ja helpomman heittää aloittelijalle, koska se vastustaa vähemmän. Lähellä nollaa oleva turn taas tekee lennosta suoremman ja luotettavamman kovassa kädessä.\n\n## Fade eli sivuvienti (0–5)\n\nFade kertoo, kuinka voimakkaasti kiekko kääntyy vasemmalle lennon lopussa, kun se hidastuu. Matala fade (0–1) tarkoittaa suorempaa loppulentoa, korkea fade (3–5) taas voimakasta kaarrosta vasemmalle ja luotettavaa laskua. Fade on hyödyllinen, kun haluat kiekon palaavan vasemmalle väylän mutkassa tai laskeutuvan hallitusti koria kohti.\n\n## Esimerkki: näin luet kiekon\n\nLucky Discsin Bank Robber on numeroiltaan 8 / 5 / -1 / 2. Se tarkoittaa kohtuullista nopeutta (toimii ilman äärimmäistä voimaa), hyvää liitoa, lievää oikealle kääntymistä alussa ja maltillista vasemmalle laskua lopussa. Käytännössä se on monipuolinen ja hallittava fairway driver — juuri sellainen, jonka aloittelijakin oppii heittämään.\n\n## Tärkein neuvo\n\nÄlä takerru pelkkiin numeroihin. Ne ovat suuntaa-antavia ja muuttuvat heittovoiman, tuulen ja muovin mukaan. Tärkeintä on heittää paljon ja oppia, miten oma kätesi saa kunkin kiekon lentämään. Numerot auttavat valitsemaan oikean työkalun — loput opit kentällä. Tutustu kaikkien Lucky Discs -kiekkojen lentonumeroihin verkkokaupassa.',
  'Opas',
  'frisbeegolf lentonumerot, speed glide turn fade, mitä lentonumerot tarkoittavat, disc golf flight numbers suomeksi',
  6,
  'Lucky Discs',
  '/images/brand/disc-rainbow.webp',
  'Frisbeegolfkiekkoja eri väreissä',
  true,
  '2026-05-22'
),
(
  'miksi-suomalainen-frisbeegolfkiekko-kannattaa',
  'Miksi suomalainen kiekko kannattaa — laatu, vastuullisuus ja nopea toimitus',
  'Lucky Discs -kiekot valmistetaan Nokialla, Suomessa. Kerromme, miksi kotimainen valmistus näkyy laadussa, toimitusnopeudessa ja siinä, kenen taskuun rahasi menee.',
  E'Frisbeegolfkiekon voi tilata mistä päin maailmaa tahansa. Silti yhä useampi suomalainen pelaaja valitsee kotimaisen kiekon. Syyt eivät ole pelkkää tunnetta — kotimainen valmistus näkyy konkreettisesti laadussa, toimitusajassa ja siinä, mihin rahasi päätyy. Lucky Discs valmistetaan Nokialla, Suomessa.\n\n## Valmistettu Nokialla, Suomessa\n\nLucky Discs -kiekot valmistetaan Suomessa korkeimpien laatustandardien mukaan premium-eurooppalaisista polymeereistä. Kun valmistus on lähellä, laadunvalvonta on tiukkaa ja jokainen erä on tasalaatuinen. Kiekkomme on suunniteltu säilyttämään lento-ominaisuutensa tuhansien heittojen läpi — se on kestävyyttä, joka näkyy kentällä.\n\n## Nopea toimitus, ei tullimaksuja\n\nKun tilaat ulkomailta, mukaan voi tulla pitkät toimitusajat, tullikäsittelyt ja yllättävät lisämaksut. Kotimaisesta verkkokaupasta paketti on perillä nopeasti: toimitamme tilaukset 1–3 arkipäivässä Postin kautta, ja saat seurantatunnuksen sähköpostiisi heti kun tilaus lähtee. Toimitus maksaa 5,90 euroa ja on ilmainen yli 50 euron tilauksiin.\n\n## Tuki kotimaiselle\n\nKun ostat suomalaisen kiekon, tuet kotimaista työtä, osaamista ja lajin kehitystä Suomessa. Frisbeegolf kasvaa Suomessa kovaa vauhtia, ja kotimaiset toimijat rakentavat lajille tulevaisuutta — uusia ratoja, tapahtumia ja yhteisöä. Sinun ostoksesi on osa sitä.\n\n## Asiakaspalvelu omalla kielellä\n\nKotimaisuus näkyy myös ostamisen jälkeen. Saat palvelun suomeksi, palautukset ja reklamaatiot hoituvat lähellä, ja sinulla on lakisääteinen 14 päivän palautusoikeus. Jos jokin mietityttää, vastaamme nopeasti osoitteessa asiakaspalvelu@luckydiscs.fi.\n\n## Kiekkoja kaikille tasoille\n\nMallistostamme löytyy kiekko sekä aloittelijalle että kokeneelle: Money Shot -putteri tarkkoihin lähestymisiin, Jailbreak-keskari monipuoliseen peliin, Bank Robber -fairway driver hallittuun pituuteen ja Treasure Hunt -distance driver pisimpiin heittoihin. Kaikki samalla kotimaisella laadulla.\n\n## Yhteenveto\n\nSuomalainen kiekko tarkoittaa tasaista laatua, nopeaa ja edullista toimitusta, sujuvaa asiakaspalvelua ja tukea kotimaiselle lajille. Tutustu mallistoon verkkokaupassamme — ja jos olet jälleenmyyjä, urheiluseura, koulu tai yhdistys, kysy suurempia eriä suoraan asiakaspalvelustamme.',
  'Brändi',
  'suomalaiset frisbeegolfkiekot, kotimainen disc golf, valmistettu Suomessa Nokia, suomalainen kiekko',
  6,
  'Lucky Discs',
  '/images/brand/finnish-sunset-course.webp',
  'Suomalainen frisbeegolfrata auringonlaskussa',
  true,
  '2026-05-30'
)
on conflict (slug) do update set
  title=excluded.title, description=excluded.description, content=excluded.content,
  category=excluded.category, keywords=excluded.keywords, reading_time=excluded.reading_time,
  hero_image=excluded.hero_image, hero_alt=excluded.hero_alt,
  published=excluded.published, published_at=excluded.published_at, updated_at=now();
