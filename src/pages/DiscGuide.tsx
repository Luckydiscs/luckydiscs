import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useSEO from "@/hooks/useSEO";
import { useTranslation } from "@/hooks/useTranslation";
import discs from "@/data/discs";

// Kaksikielinen sisältö samassa tiedostossa (sisältöpainotteinen sivu —
// selkeämpää kuin ~60 erillistä t()-avainta, ja listat ovat oikeita taulukoita).
const CONTENT = {
  fi: {
    seo: {
      title: "Frisbeegolfopas aloittelijalle | Lucky Discs",
      description: "Frisbeegolfopas aloittelijoille: kiekkotyypit, lentoluvut ja heittotekniikat. Kattava opas kaikentasoisille pelaajille.",
      keywords: "frisbeegolfopas, kiekko-opas, aloittelijan opas, lentoluvut, heittotekniikka, kiekkotyypit",
      schemaName: "Kattava frisbeegolfopas aloittelijalle",
      schemaDesc: "Opi frisbeegolfin perusteet: kiekkotyypit, lentoluvut, heittotekniikat ja kentän strategia",
    },
    hero: {
      title: "Lucky Discs -kiekko-opas",
      subtitle: "Opi frisbeegolfin perusteet kattavan oppaamme avulla. Käymme läpi kaiken perusheitoista kentän strategiaan Lucky Discsin premium-välineillä.",
    },
    toc: {
      navLabel: "Oppaan navigointi",
      title: "Mitä opit",
      discTypes: "🥏 Kiekkotyypit ja valinta",
      flightNumbers: "📊 Lentolukujen ymmärtäminen",
      techniques: "💪 Heittotekniikat",
    },
    discTypes: {
      title: "Kiekkotyypit tutuiksi",
      recommendation: "Lucky Discsin suositus:",
      distance: {
        title: "Distance driverit",
        badge: "Speed 10–14",
        alt: "Treasure Hunt -distance driver",
        desc: "Distance driverit on suunniteltu maksimaaliseen heittopituuteen. Ne vaativat huomattavaa käsivartennopeutta lentääkseen oikein ja sopivat parhaiten kokeneille pelaajille.",
        rec: "– lippulaivamme distance driver, Speed 12. Täydellinen avoimille väylille ja pisimpiin heittoihin.",
      },
      fairway: {
        title: "Fairway driverit",
        badge: "Speed 7–9",
        alt: "Bank Robber -fairway driver",
        desc: "Fairway driverit tarjoavat tasapainon pituuden ja tarkkuuden välillä. Ne ovat anteeksiantavampia kuin distance driverit ja sopivat keskitason pelaajille.",
        rec: "– monipuolinen Speed 8 -fairway driver, joka loistaa teknisillä väylillä luotettavalla lentoradalla.",
      },
      midrange: {
        title: "Keskarit (midrange)",
        badge: "Speed 4–6",
        alt: "Jailbreak -keskari",
        desc: "Keskarit ovat frisbeegolfin työjuhtia. Ne tarjoavat erinomaisen hallinnan ja tarkkuuden lähestymisheittoihin ja sopivat täydellisesti aloittelijalle oikean heittotekniikan opetteluun.",
        rec: "– Speed 5 -keskari, joka on saatavilla kestävässä Ultrium-muovissa hallittuihin lähestymisheittoihin.",
      },
      putter: {
        title: "Putterit",
        badge: "Speed 1–4",
        alt: "Money Shot -putteri",
        desc: "Putterit on suunniteltu lyhyisiin, tarkkoihin heittoihin korin lähellä. Niillä on kaikkein ennustettavin lentorata, ja ne ovat välttämättömiä väylien onnistuneeseen päättämiseen.",
        rec: "– luotettava putteri ja approach-kiekko uskomattomalla otteella ja tarkkuudella varmoihin lähestymisiin.",
      },
    },
    flight: {
      title: "Lentoluvut haltuun",
      intro: "Jokaisella kiekolla on neljä lentolukua, jotka kuvaavat sen lento-ominaisuuksia. Näiden lukujen ymmärtäminen on ratkaisevaa oikean kiekon valinnassa kuhunkin heittoon.",
      speed: {
        title: "Speed eli nopeus (1–14)",
        desc: "Speed kertoo, kuinka paljon voimaa kiekko tarvitsee lentääkseen tarkoitetulla tavalla. Korkeamman nopeuden kiekot vaativat enemmän käsivartenvoimaa mutta yltävät pidemmälle.",
        levels: [
          { l: "Aloittelija:", v: "Speed 1–6 (putterit ja keskarit)" },
          { l: "Keskitaso:", v: "Speed 7–9 (fairway driverit)" },
          { l: "Edistynyt:", v: "Speed 10+ (distance driverit)" },
        ],
      },
      glide: {
        title: "Glide eli liito (1–7)",
        desc: "Glide kuvaa kiekon kykyä pysyä ilmassa lennon aikana. Korkeampi glide-arvo auttaa kiekkoa lentämään pidemmälle pienemmällä vaivalla, mikä on ihanteellista aloittelevalle pelaajalle.",
        levels: [
          { l: "Matala glide (1–3):", v: "ennustettavampi, kestää tuulta" },
          { l: "Korkea glide (5–7):", v: "pidemmät lennot, vähemmän voimaa tarvitaan" },
        ],
      },
      turn: {
        title: "Turn eli kääntyvyys (-5…1)",
        desc: "Turn kuvaa kiekon taipumusta kaartua oikealle (oikeakätisellä rystyheitolla) lennon nopean alkuvaiheen aikana. Negatiiviset luvut tarkoittavat enemmän kääntyvyyttä.",
        levels: [
          { l: "Ylivakaa (0…1):", v: "vastustaa kääntymistä, luotettava" },
          { l: "Alivakaa (-1…-5):", v: "kääntyy oikealle, lisää pituutta" },
        ],
      },
      fade: {
        title: "Fade eli sivuvienti (0–5)",
        desc: "Fade on kiekon taipumus kaartua vasemmalle (oikeakätisellä rystyheitolla) lennon lopussa, kun se hidastuu. Suuremmat luvut tarkoittavat voimakkaampaa sivuvientiä.",
        levels: [
          { l: "Matala fade (0–1):", v: "suorempi loppulento" },
          { l: "Korkea fade (3–5):", v: "voimakas kaarros vasemmalle, luotettava lasku" },
        ],
      },
    },
    tech: {
      title: "Tärkeimmät heittotekniikat",
      backhand: {
        title: "Rystyheitto",
        badge: "Yleisin",
        desc: "Frisbeegolfin perusheitto, samaan tapaan kuin frisbeetä heitettäessä.",
        steps: [
          "Ota kiekosta ote neljällä sormella alapuolelta",
          "Astu eteen vastakkaisella jalalla",
          "Vedä kiekko vartalon poikki",
          "Irrota ranteen napsautuksella",
        ],
      },
      forehand: {
        title: "Kämmenheitto",
        badge: "Edistynyt",
        desc: "Tunnetaan myös sivuheittona; heitetään vartalon sivulta.",
        steps: [
          "Ota kahden sormen ote kiekon reunasta",
          "Pidä kiekko vaakatasossa ja vakaana",
          "Heitä ranteen napsautusliikkeellä",
          "Erinomainen esteiden kiertämiseen",
        ],
      },
      overhand: {
        title: "Yläkautta-heitot",
        badge: "Erikoisheitto",
        desc: "Heitetään pään yli omalaatuisia lentoratoja ja esteiden ylitystä varten.",
        steps: [
          "Tomahawk: yläkautta rystyotteella",
          "Thumber: yläkautta kämmenotteella",
          "Hyödyllinen puiden ylittämiseen",
          "Luo näyttäviä lentoratoja",
        ],
      },
    },
    strategy: {
      title: "Kentän strategia ja vinkit",
      beginner: {
        title: "Aloittelijan strategia",
        points: [
          "Aloita vakailla, hitaammilla kiekoilla",
          "Keskity tarkkuuteen pituuden sijaan",
          "Harjoittele puttaamista paljon",
          "Opettele yksi heittotyyppi kunnolla ennen muita",
          "Pelaa varman päälle ja vältä rangaistuksia",
        ],
      },
      advanced: {
        title: "Edistyneen strategia",
        points: [
          "Tutki väylien muodot ja tuuliolosuhteet",
          "Kanna mukana useita kiekkotyyppejä ja muoveja",
          "Hallitse sekä rysty- että kämmenheitto",
          "Opi muotoilemaan heitot esteiden ympäri",
          "Harjoittele erilaisia puttaustyylejä",
        ],
      },
    },
    cta: {
      title: "Valmiina aloittamaan frisbeegolfmatkasi?",
      descPre: "Tutustu kattavaan valikoimaamme premium-frisbeegolfvälineitä, jotka on suunniteltu kaikentasoisille pelaajille. Käy ",
      teamLink: "tiimisivullamme",
      descPost: " näkemässä Lucky Discs tositoimissa.",
      browse: "Selaa kiekkoja",
      wholesale: "Jälleenmyyntitiedustelu",
    },
  },
  en: {
    seo: {
      title: "Disc Golf Guide for Beginners | Lucky Discs",
      description: "A disc golf guide for beginners: disc types, flight numbers and throwing techniques. A complete guide for players of all levels.",
      keywords: "disc golf guide, disc guide, beginner guide, flight numbers, throwing technique, disc types",
      schemaName: "Complete disc golf guide for beginners",
      schemaDesc: "Learn the basics of disc golf: disc types, flight numbers, throwing techniques and course strategy",
    },
    hero: {
      title: "Lucky Discs Disc Guide",
      subtitle: "Learn the fundamentals of disc golf with our complete guide. We cover everything from basic throws to course strategy with Lucky Discs premium gear.",
    },
    toc: {
      navLabel: "Guide navigation",
      title: "What you will learn",
      discTypes: "🥏 Disc types and selection",
      flightNumbers: "📊 Understanding flight numbers",
      techniques: "💪 Throwing techniques",
    },
    discTypes: {
      title: "Get to know the disc types",
      recommendation: "Lucky Discs recommendation:",
      distance: {
        title: "Distance drivers",
        badge: "Speed 10–14",
        alt: "Treasure Hunt distance driver",
        desc: "Distance drivers are built for maximum distance. They need considerable arm speed to fly correctly and are best suited to experienced players.",
        rec: "– our flagship distance driver, Speed 12. Perfect for open fairways and the longest throws.",
      },
      fairway: {
        title: "Fairway drivers",
        badge: "Speed 7–9",
        alt: "Bank Robber fairway driver",
        desc: "Fairway drivers offer a balance between distance and accuracy. They are more forgiving than distance drivers and suit intermediate players.",
        rec: "– a versatile Speed 8 fairway driver that shines on technical holes with a reliable flight path.",
      },
      midrange: {
        title: "Midranges",
        badge: "Speed 4–6",
        alt: "Jailbreak midrange",
        desc: "Midranges are the workhorses of disc golf. They offer excellent control and accuracy on approach shots and are perfect for beginners learning proper technique.",
        rec: "– a Speed 5 midrange, available in durable Ultrium plastic for controlled approach shots.",
      },
      putter: {
        title: "Putters",
        badge: "Speed 1–4",
        alt: "Money Shot putter",
        desc: "Putters are designed for short, accurate throws near the basket. They have the most predictable flight and are essential for finishing holes.",
        rec: "– a dependable putter and approach disc with incredible grip and accuracy for confident approaches.",
      },
    },
    flight: {
      title: "Master the flight numbers",
      intro: "Every disc has four flight numbers that describe how it flies. Understanding these numbers is crucial for choosing the right disc for each throw.",
      speed: {
        title: "Speed (1–14)",
        desc: "Speed tells you how much power a disc needs to fly as intended. Higher-speed discs require more arm power but reach farther.",
        levels: [
          { l: "Beginner:", v: "Speed 1–6 (putters and midranges)" },
          { l: "Intermediate:", v: "Speed 7–9 (fairway drivers)" },
          { l: "Advanced:", v: "Speed 10+ (distance drivers)" },
        ],
      },
      glide: {
        title: "Glide (1–7)",
        desc: "Glide describes a disc's ability to stay in the air. A higher glide value helps a disc fly farther with less effort, which is ideal for newer players.",
        levels: [
          { l: "Low glide (1–3):", v: "more predictable, handles wind" },
          { l: "High glide (5–7):", v: "longer flights, less power needed" },
        ],
      },
      turn: {
        title: "Turn (-5…1)",
        desc: "Turn describes a disc's tendency to bank right (for a right-handed backhand) during the fast, early part of its flight. More negative numbers mean more turn.",
        levels: [
          { l: "Overstable (0…1):", v: "resists turning, reliable" },
          { l: "Understable (-1…-5):", v: "turns right, adds distance" },
        ],
      },
      fade: {
        title: "Fade (0–5)",
        desc: "Fade is a disc's tendency to hook left (for a right-handed backhand) at the end of its flight as it slows. Higher numbers mean a stronger fade.",
        levels: [
          { l: "Low fade (0–1):", v: "straighter finish" },
          { l: "High fade (3–5):", v: "strong hook left, reliable landing" },
        ],
      },
    },
    tech: {
      title: "Key throwing techniques",
      backhand: {
        title: "Backhand",
        badge: "Most common",
        desc: "The fundamental disc golf throw, similar to throwing a regular frisbee.",
        steps: [
          "Grip the disc with four fingers underneath",
          "Step forward with your opposite foot",
          "Pull the disc across your body",
          "Release with a wrist snap",
        ],
      },
      forehand: {
        title: "Forehand",
        badge: "Advanced",
        desc: "Also known as the flick or sidearm; thrown from the side of the body.",
        steps: [
          "Use a two-finger grip on the rim",
          "Keep the disc flat and stable",
          "Throw with a wrist snap",
          "Excellent for shaping shots around obstacles",
        ],
      },
      overhand: {
        title: "Overhand throws",
        badge: "Specialty",
        desc: "Thrown over the head for unique flight paths and clearing obstacles.",
        steps: [
          "Tomahawk: overhand with a backhand grip",
          "Thumber: overhand with a thumb grip",
          "Useful for clearing trees",
          "Creates dramatic flight paths",
        ],
      },
    },
    strategy: {
      title: "Course strategy and tips",
      beginner: {
        title: "Beginner strategy",
        points: [
          "Start with stable, slower discs",
          "Focus on accuracy over distance",
          "Practice your putting a lot",
          "Learn one throw type well before others",
          "Play it safe and avoid penalties",
        ],
      },
      advanced: {
        title: "Advanced strategy",
        points: [
          "Read the hole shapes and wind conditions",
          "Carry several disc types and plastics",
          "Master both backhand and forehand",
          "Learn to shape shots around obstacles",
          "Practice different putting styles",
        ],
      },
    },
    cta: {
      title: "Ready to start your disc golf journey?",
      descPre: "Explore our full range of premium disc golf gear, designed for players of all levels. Visit ",
      teamLink: "our team page",
      descPost: " to see Lucky Discs in action.",
      browse: "Browse discs",
      wholesale: "Wholesale inquiry",
    },
  },
};

const DiscGuide = () => {
  const navigate = useNavigate();
  const { language } = useTranslation();
  const c = CONTENT[language === "fi" ? "fi" : "en"];

  // Extract disc references from centralized data
  const bankRobberDisc = discs.find(d => d.name === "Bank Robber")!;
  const treasureHuntDisc = discs.find(d => d.name === "Treasure Hunt")!;
  const moneyShotDisc = discs.find(d => d.name === "Money Shot")!;
  const jailbreakDisc = discs.find(d => d.name === "Jailbreak")!;

  useSEO({
    title: c.seo.title,
    description: c.seo.description,
    keywords: c.seo.keywords,
    canonicalPath: "/disc-guide",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Guide",
      "name": c.seo.schemaName,
      "description": c.seo.schemaDesc,
      "author": { "@type": "Organization", "name": "Lucky Discs" },
      "publisher": { "@type": "Organization", "name": "Lucky Discs" },
    },
  });

  const discCards = [
    { disc: treasureHuntDisc, data: c.discTypes.distance, name: "Treasure Hunt" },
    { disc: bankRobberDisc, data: c.discTypes.fairway, name: "Bank Robber" },
    { disc: jailbreakDisc, data: c.discTypes.midrange, name: "Jailbreak" },
    { disc: moneyShotDisc, data: c.discTypes.putter, name: "Money Shot" },
  ];

  const flightNumbers = [
    { icon: <span className="text-2xl font-bold">S</span>, data: c.flight.speed },
    { icon: <span className="text-2xl">🪶</span>, data: c.flight.glide },
    { icon: <span className="text-2xl">↪️</span>, data: c.flight.turn },
    { icon: <span className="text-2xl">↩️</span>, data: c.flight.fade },
  ];

  const techniques = [c.tech.backhand, c.tech.forehand, c.tech.overhand];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-sans antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            {c.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {c.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="py-8 bg-black/30" aria-label={c.toc.navLabel}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading mb-6 text-center text-white">{c.toc.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('disc-types')?.scrollIntoView({behavior: 'smooth'})}>
              {c.toc.discTypes}
            </Button>
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('flight-numbers')?.scrollIntoView({behavior: 'smooth'})}>
              {c.toc.flightNumbers}
            </Button>
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('throwing-techniques')?.scrollIntoView({behavior: 'smooth'})}>
              {c.toc.techniques}
            </Button>
          </div>
        </div>
      </nav>

      {/* Disc Types Section */}
      <section id="disc-types" className="py-16 bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            {c.discTypes.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {discCards.map(({ disc, data, name }) => (
              <Card key={name} className="bg-white/5 border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img src={disc.imageSrc} alt={data.alt} className="w-20 h-20 object-contain" />
                    <div>
                      <CardTitle className="text-lucky-green">{data.title}</CardTitle>
                      <Badge variant="secondary">{data.badge}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">{data.desc}</p>
                  <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                    <h4 className="font-semibold text-lucky-green mb-2">{c.discTypes.recommendation}</h4>
                    <p><strong>{name}</strong> {data.rec}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flight Numbers Section */}
      <section id="flight-numbers" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            {c.flight.title}
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-12 text-center">
              {c.flight.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {flightNumbers.map(({ icon, data }) => (
                <Card key={data.title} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lucky-green flex items-center gap-2">
                      {icon}
                      {data.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <p className="mb-4">{data.desc}</p>
                    <div className="bg-gray-800 p-3 rounded">
                      <p className="text-sm">
                        {data.levels.map((lv, i) => (
                          <span key={i}>
                            <strong>{lv.l}</strong> {lv.v}
                            {i < data.levels.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Throwing Techniques */}
      <section id="throwing-techniques" className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            {c.tech.title}
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {techniques.map((tech) => (
                <Card key={tech.title} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lucky-green">{tech.title}</CardTitle>
                    <Badge variant="outline" className="w-fit border-lucky-green/40 bg-lucky-green/10 text-lucky-green">{tech.badge}</Badge>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <p className="mb-4">{tech.desc}</p>
                    <ul className="space-y-2 text-sm">
                      {tech.steps.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Strategy */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            {c.strategy.title}
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[c.strategy.beginner, c.strategy.advanced].map((strat) => (
                <Card key={strat.title} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lucky-green">{strat.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <ul className="space-y-3">
                      {strat.points.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-black via-lucky-green/10 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-6">
            {c.cta.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {c.cta.descPre}<button className="text-lucky-green underline hover:text-white transition-colors" onClick={() => navigate('/team')}>{c.cta.teamLink}</button>{c.cta.descPost}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-lucky-green text-white hover:bg-white hover:text-black font-semibold"
              onClick={() => navigate('/discs')}
            >
              {c.cta.browse}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-semibold"
              onClick={() => navigate('/wholesale')}
            >
              {c.cta.wholesale}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiscGuide;
