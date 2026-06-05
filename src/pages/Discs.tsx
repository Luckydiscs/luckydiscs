
import { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FeaturedVideos from "@/components/FeaturedVideos";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";
import useSEO from "@/hooks/useSEO";
import allDiscs from "@/data/discs";
import { Rocket, Send, Target, CircleDot, Gauge, Wind, CornerUpRight, CornerUpLeft, Truck, RotateCcw, Mail } from "lucide-react";

const tabValues = ["all", "driver", "fairway", "midrange", "putter"] as const;

const Discs = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState("all");
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredDiscs = selectedType === "all"
    ? allDiscs
    : allDiscs.filter(disc => disc.type === selectedType);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Lucky Discs Collection",
    "description": "Lucky Discs premium frisbeegolfkiekot - complete disc golf disc collection from Finland.",
    "url": "https://www.luckydiscs.fi/discs",
    "numberOfItems": allDiscs.length,
    "itemListElement": allDiscs.map((disc, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": disc.name,
        "description": t(disc.descriptionKey),
        "image": `https://www.luckydiscs.fi${disc.imageSrc}`,
        "url": `https://www.luckydiscs.fi/discs`,
        "brand": { "@type": "Brand", "name": "Lucky Discs" },
        "manufacturer": { "@type": "Organization", "name": "Lucky Discs", "url": "https://www.luckydiscs.fi" },
        "category": "Disc Golf Discs",
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Speed", "value": String(disc.speed) },
          { "@type": "PropertyValue", "name": "Glide", "value": String(disc.glide) },
          { "@type": "PropertyValue", "name": "Turn", "value": String(disc.turn) },
          { "@type": "PropertyValue", "name": "Fade", "value": String(disc.fade) },
          { "@type": "PropertyValue", "name": "Disc Type", "value": disc.type }
        ],
        "offers": {
          "@type": "Offer",
          "availability": disc.name === "Jailbreak" ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
          "priceCurrency": "EUR",
          "seller": { "@type": "Organization", "name": "Lucky Discs" }
        }
      }
    }))
  }), [t]);

  useSEO({
    title: "Lucky Discs Kiekot - Frisbeegolfkiekot | Disc Golf Discs Collection",
    description: "Lucky Discs kiekkovalikoima: Bank Robber, Treasure Hunt, Money Shot & Jailbreak. Premium frisbeegolfkiekot Suomesta. Drivers, fairways & putters for all levels.",
    keywords: "frisbeegolfkiekot, disc golf discs, drivers, fairway, putterit, Bank Robber, Treasure Hunt, Money Shot, Jailbreak, Lucky Discs",
    canonicalPath: "/discs",
    ogImage: "https://www.luckydiscs.fi/lovable-uploads/4c26d096-cfa9-4173-afe7-93b4f8b28426.webp",
    structuredData,
  });

  useEffect(() => {
    if (headerRef.current) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100");
            e.target.classList.remove("opacity-0", "translate-y-10");
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(headerRef.current);

      return () => {
        if (headerRef.current) {
          observer.unobserve(headerRef.current);
        }
      };
    }
  }, []);

  // Shared grid component — replaces 5 identical TabsContent blocks
  const DiscGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredDiscs.map((disc) => (
        <ProductCard
          key={disc.id}
          imageSrc={disc.imageSrc}
          name={disc.name}
          description={t(disc.descriptionKey)}
          speed={disc.speed}
          glide={disc.glide}
          turn={disc.turn}
          fade={disc.fade}
          isNewRelease={disc.isNewRelease}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            {t('discs.title')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('discs.subtitle')}
          </p>
        </div>
      </section>

      {/* Disc Filtering Tabs */}
      <div className="py-8 bg-black/50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 h-auto gap-1 mb-8 bg-black/30 p-1">
              <TabsTrigger
                value="all"
                onClick={() => setSelectedType("all")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-white"
              >
                {t('discs.allDiscs')}
              </TabsTrigger>
              <TabsTrigger
                value="driver"
                onClick={() => setSelectedType("driver")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-white"
              >
                {t('discs.drivers')}
              </TabsTrigger>
              <TabsTrigger
                value="fairway"
                onClick={() => setSelectedType("fairway")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-white"
              >
                {t('discs.fairway')}
              </TabsTrigger>
              <TabsTrigger
                value="midrange"
                onClick={() => setSelectedType("midrange")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-white"
              >
                {t('discs.midRange')}
              </TabsTrigger>
              <TabsTrigger
                value="putter"
                onClick={() => setSelectedType("putter")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-white"
              >
                {t('discs.putters')}
              </TabsTrigger>
            </TabsList>

            {/* Single shared grid for all tabs */}
            {tabValues.map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <DiscGrid />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Disc Categories Explained */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-6">
              {t('discs.categoriesTitle')}
            </h2>
            <p className="text-gray-300 text-lg">
              {t('discs.categoriesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { Icon: Rocket, title: t('discs.drivers'), desc: t('discs.driversDesc'), speed: '9–14' },
              { Icon: Send, title: `${t('discs.fairway')} Drivers`, desc: t('discs.fairwayDesc'), speed: '6–8' },
              { Icon: Target, title: t('discs.midRange'), desc: t('discs.midRangeDesc'), speed: '4–5' },
              { Icon: CircleDot, title: t('discs.putters'), desc: t('discs.puttersDesc'), speed: '1–4' },
            ].map(({ Icon, title, desc, speed }) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl p-6 border border-white/10 hover:border-lucky-green/50 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-lucky-green/15 border border-lucky-green/30 flex items-center justify-center text-lucky-green group-hover:bg-lucky-green group-hover:text-black transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-heading mb-2 text-white">{title}</h3>
                <span className="inline-block mb-3 text-[11px] uppercase tracking-wider font-bold text-lucky-green bg-lucky-green/10 border border-lucky-green/20 rounded-full px-3 py-0.5">
                  Speed {speed}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {desc.split('\n')[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Flight Numbers */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading mb-6 text-center">
              {t('discs.flightNumbersTitle')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { Icon: Gauge, label: 'Speed', range: '1–14', desc: t('discs.speedDesc') },
                { Icon: Wind, label: 'Glide', range: '1–7', desc: t('discs.glideDesc') },
                { Icon: CornerUpRight, label: 'Turn', range: '–5…1', desc: t('discs.turnDesc') },
                { Icon: CornerUpLeft, label: 'Fade', range: '0–5', desc: t('discs.fadeDesc') },
              ].map(({ Icon, label, range, desc }) => (
                <div key={label} className="group bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl p-5 border border-white/10 hover:border-lucky-green/50 transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-9 h-9 rounded-lg bg-lucky-green/15 border border-lucky-green/30 flex items-center justify-center text-lucky-green group-hover:bg-lucky-green group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="font-heading text-white leading-none">{label}</div>
                      <div className="text-[11px] text-lucky-green font-bold tracking-wide">{range}</div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Toimitus + jälleenmyyjä/suurtilaus -info */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-lucky-green" /> {t("discs.shipping")}</span>
              <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-lucky-green" /> {t("discs.returns")}</span>
            </div>
            <p className="mt-3 text-center text-sm text-gray-400">
              <Mail className="inline w-4 h-4 text-lucky-green mr-1" />
              {t("discs.bulkInquiry")} <a href="mailto:asiakaspalvelu@luckydiscs.fi" className="text-lucky-green hover:underline">asiakaspalvelu@luckydiscs.fi</a>
            </p>

            <div className="mt-8 text-center">
              <p className="text-gray-300">
                {t('discs.needHelp')}
              </p>
              <Button
                className="mt-4 bg-lucky-green text-white hover:bg-white hover:text-black"
                onClick={() => window.location.href = '/disc-guide'}
              >
                {t('discs.selectionGuide')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedVideos />

      <Footer />
    </div>
  );
};

export default Discs;
