import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useSEO from "@/hooks/useSEO";
import discs from "@/data/discs";

const DiscGuide = () => {
  const navigate = useNavigate();

  // Extract disc references from centralized data
  const bankRobberDisc = discs.find(d => d.name === "Bank Robber")!;
  const treasureHuntDisc = discs.find(d => d.name === "Treasure Hunt")!;
  const moneyShotDisc = discs.find(d => d.name === "Money Shot")!;
  const jailbreakDisc = discs.find(d => d.name === "Jailbreak")!;

  useSEO({
    title: "Frisbeegolfopas aloittelijalle | Lucky Discs",
    description: "Frisbeegolfopas aloittelijoille: kiekkotyypit, lentoluvut ja heittotekniikat. Kattava opas kaikentasoisille pelaajille.",
    keywords: "frisbeegolfopas, kiekko-opas, aloittelijan opas, lentoluvut, heittotekniikka, kiekkotyypit",
    canonicalPath: "/disc-guide",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Guide",
      "name": "Kattava frisbeegolfopas aloittelijalle",
      "description": "Opi frisbeegolfin perusteet: kiekkotyypit, lentoluvut, heittotekniikat ja kentän strategia",
      "author": {
        "@type": "Organization",
        "name": "Lucky Discs"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Lucky Discs"
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-sans antialiased">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Lucky Discs -kiekko-opas
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Opi frisbeegolfin perusteet kattavan oppaamme avulla. Käymme läpi kaiken perusheitoista kentän strategiaan Lucky Discsin premium-välineillä.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="py-8 bg-black/30" aria-label="Oppaan navigointi">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading mb-6 text-center text-white">Mitä opit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('disc-types')?.scrollIntoView({behavior: 'smooth'})}>
              🥏 Kiekkotyypit ja valinta
            </Button>
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('flight-numbers')?.scrollIntoView({behavior: 'smooth'})}>
              📊 Lentolukujen ymmärtäminen
            </Button>
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('throwing-techniques')?.scrollIntoView({behavior: 'smooth'})}>
              💪 Heittotekniikat
            </Button>
          </div>
        </div>
      </nav>

      {/* Disc Types Section */}
      <section id="disc-types" className="py-16 bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Kiekkotyypit tutuiksi
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Distance drivers */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img src={treasureHuntDisc.imageSrc} alt="Treasure Hunt -distance driver" className="w-20 h-20 object-contain" />
                  <div>
                    <CardTitle className="text-lucky-green">Distance driverit</CardTitle>
                    <Badge variant="secondary">Speed 10–14</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Distance driverit on suunniteltu maksimaaliseen heittopituuteen. Ne vaativat huomattavaa
                  käsivartennopeutta lentääkseen oikein ja sopivat parhaiten kokeneille pelaajille.
                </p>
                <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                  <h4 className="font-semibold text-lucky-green mb-2">Lucky Discsin suositus:</h4>
                  <p><strong>Treasure Hunt</strong> – lippulaivamme distance driver, Speed 12. Täydellinen avoimille väylille ja pisimpiin heittoihin.</p>
                </div>
              </CardContent>
            </Card>

            {/* Fairway drivers */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img src={bankRobberDisc.imageSrc} alt="Bank Robber -fairway driver" className="w-20 h-20 object-contain" />
                  <div>
                    <CardTitle className="text-lucky-green">Fairway driverit</CardTitle>
                    <Badge variant="secondary">Speed 7–9</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Fairway driverit tarjoavat tasapainon pituuden ja tarkkuuden välillä. Ne ovat anteeksiantavampia
                  kuin distance driverit ja sopivat keskitason pelaajille.
                </p>
                <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                  <h4 className="font-semibold text-lucky-green mb-2">Lucky Discsin suositus:</h4>
                  <p><strong>Bank Robber</strong> – monipuolinen Speed 8 -fairway driver, joka loistaa teknisillä väylillä luotettavalla lentoradalla.</p>
                </div>
              </CardContent>
            </Card>

            {/* Midrange */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img src={jailbreakDisc.imageSrc} alt="Jailbreak -keskari" className="w-20 h-20 object-contain" />
                  <div>
                    <CardTitle className="text-lucky-green">Keskarit (midrange)</CardTitle>
                    <Badge variant="secondary">Speed 4–6</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Keskarit ovat frisbeegolfin työjuhtia. Ne tarjoavat erinomaisen hallinnan ja tarkkuuden
                  lähestymisheittoihin ja sopivat täydellisesti aloittelijalle oikean heittotekniikan opetteluun.
                </p>
                <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                  <h4 className="font-semibold text-lucky-green mb-2">Lucky Discsin suositus:</h4>
                  <p><strong>Jailbreak</strong> – Speed 5 -keskari, joka on saatavilla kestävässä Ultrium-muovissa hallittuihin lähestymisheittoihin.</p>
                </div>
              </CardContent>
            </Card>

            {/* Putters */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img src={moneyShotDisc.imageSrc} alt="Money Shot -putteri" className="w-20 h-20 object-contain" />
                  <div>
                    <CardTitle className="text-lucky-green">Putterit</CardTitle>
                    <Badge variant="secondary">Speed 1–4</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Putterit on suunniteltu lyhyisiin, tarkkoihin heittoihin korin lähellä. Niillä on kaikkein
                  ennustettavin lentorata, ja ne ovat välttämättömiä väylien onnistuneeseen päättämiseen.
                </p>
                <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                  <h4 className="font-semibold text-lucky-green mb-2">Lucky Discsin suositus:</h4>
                  <p><strong>Money Shot</strong> – luotettava putteri ja approach-kiekko uskomattomalla otteella ja tarkkuudella varmoihin lähestymisiin.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Flight Numbers Section */}
      <section id="flight-numbers" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Lentoluvut haltuun
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-12 text-center">
              Jokaisella kiekolla on neljä lentolukua, jotka kuvaavat sen lento-ominaisuuksia. Näiden lukujen
              ymmärtäminen on ratkaisevaa oikean kiekon valinnassa kuhunkin heittoon.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green flex items-center gap-2">
                    <span className="text-2xl font-bold">S</span>
                    Speed eli nopeus (1–14)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    Speed kertoo, kuinka paljon voimaa kiekko tarvitsee lentääkseen tarkoitetulla tavalla. Korkeamman
                    nopeuden kiekot vaativat enemmän käsivartenvoimaa mutta yltävät pidemmälle.
                  </p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <strong>Aloittelija:</strong> Speed 1–6 (putterit ja keskarit)<br/>
                      <strong>Keskitaso:</strong> Speed 7–9 (fairway driverit)<br/>
                      <strong>Edistynyt:</strong> Speed 10+ (distance driverit)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green flex items-center gap-2">
                    <span className="text-2xl">🪶</span>
                    Glide eli liito (1–7)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    Glide kuvaa kiekon kykyä pysyä ilmassa lennon aikana. Korkeampi glide-arvo auttaa kiekkoa
                    lentämään pidemmälle pienemmällä vaivalla, mikä on ihanteellista aloittelevalle pelaajalle.
                  </p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <strong>Matala glide (1–3):</strong> ennustettavampi, kestää tuulta<br/>
                      <strong>Korkea glide (5–7):</strong> pidemmät lennot, vähemmän voimaa tarvitaan
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green flex items-center gap-2">
                    <span className="text-2xl">↪️</span>
                    Turn eli kääntyvyys (-5…1)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    Turn kuvaa kiekon taipumusta kaartua oikealle (oikeakätisellä rystyheitolla) lennon
                    nopean alkuvaiheen aikana. Negatiiviset luvut tarkoittavat enemmän kääntyvyyttä.
                  </p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <strong>Ylivakaa (0…1):</strong> vastustaa kääntymistä, luotettava<br/>
                      <strong>Alivakaa (-1…-5):</strong> kääntyy oikealle, lisää pituutta
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green flex items-center gap-2">
                    <span className="text-2xl">↩️</span>
                    Fade eli sivuvienti (0–5)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    Fade on kiekon taipumus kaartua vasemmalle (oikeakätisellä rystyheitolla) lennon lopussa,
                    kun se hidastuu. Suuremmat luvut tarkoittavat voimakkaampaa sivuvientiä.
                  </p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <strong>Matala fade (0–1):</strong> suorempi loppulento<br/>
                      <strong>Korkea fade (3–5):</strong> voimakas kaarros vasemmalle, luotettava lasku
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Throwing Techniques */}
      <section id="throwing-techniques" className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Tärkeimmät heittotekniikat
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Rystyheitto</CardTitle>
                  <Badge variant="outline" className="w-fit border-lucky-green/40 bg-lucky-green/10 text-lucky-green">Yleisin</Badge>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">Frisbeegolfin perusheitto, samaan tapaan kuin frisbeetä heitettäessä.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Ota kiekosta ote neljällä sormella alapuolelta</li>
                    <li>• Astu eteen vastakkaisella jalalla</li>
                    <li>• Vedä kiekko vartalon poikki</li>
                    <li>• Irrota ranteen napsautuksella</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Kämmenheitto</CardTitle>
                  <Badge variant="outline" className="w-fit border-lucky-green/40 bg-lucky-green/10 text-lucky-green">Edistynyt</Badge>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">Tunnetaan myös sivuheittona; heitetään vartalon sivulta.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Ota kahden sormen ote kiekon reunasta</li>
                    <li>• Pidä kiekko vaakatasossa ja vakaana</li>
                    <li>• Heitä ranteen napsautusliikkeellä</li>
                    <li>• Erinomainen esteiden kiertämiseen</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Yläkautta-heitot</CardTitle>
                  <Badge variant="outline" className="w-fit border-lucky-green/40 bg-lucky-green/10 text-lucky-green">Erikoisheitto</Badge>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">Heitetään pään yli omalaatuisia lentoratoja ja esteiden ylitystä varten.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Tomahawk: yläkautta rystyotteella</li>
                    <li>• Thumber: yläkautta kämmenotteella</li>
                    <li>• Hyödyllinen puiden ylittämiseen</li>
                    <li>• Luo näyttäviä lentoratoja</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Strategy */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Kentän strategia ja vinkit
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Aloittelijan strategia</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-3">
                    <li>• Aloita vakailla, hitaammilla kiekoilla</li>
                    <li>• Keskity tarkkuuteen pituuden sijaan</li>
                    <li>• Harjoittele puttaamista paljon</li>
                    <li>• Opettele yksi heittotyyppi kunnolla ennen muita</li>
                    <li>• Pelaa varman päälle ja vältä rangaistuksia</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Edistyneen strategia</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-3">
                    <li>• Tutki väylien muodot ja tuuliolosuhteet</li>
                    <li>• Kanna mukana useita kiekkotyyppejä ja muoveja</li>
                    <li>• Hallitse sekä rysty- että kämmenheitto</li>
                    <li>• Opi muotoilemaan heitot esteiden ympäri</li>
                    <li>• Harjoittele erilaisia puttaustyylejä</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-black via-lucky-green/10 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-6">
            Valmiina aloittamaan frisbeegolfmatkasi?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Tutustu kattavaan valikoimaamme premium-frisbeegolfvälineitä, jotka on suunniteltu kaikentasoisille pelaajille. Käy <button className="text-lucky-green underline hover:text-white transition-colors" onClick={() => navigate('/team')}>tiimisivullamme</button> näkemässä Lucky Discs tositoimissa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-lucky-green text-white hover:bg-white hover:text-black font-semibold"
              onClick={() => navigate('/discs')}
            >
              Selaa kiekkoja
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-semibold"
              onClick={() => navigate('/wholesale')}
            >
              Jälleenmyyntitiedustelu
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiscGuide;