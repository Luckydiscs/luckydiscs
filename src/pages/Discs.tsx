
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.png";
import bankRobberDisc from "@/assets/bank-robber-disc.png";
import moneyShotDisc from "@/assets/money-shot-disc.png";
import jailbreakDisc from "@/assets/jailbreak-disc.png";

const discs = [
  {
    id: 1,
    name: "Bank Robber",
    imageSrc: bankRobberDisc,
    descriptionKey: "discs.bankRobberDesc",
    speed: 8,
    glide: 5,
    turn: -1,
    fade: 2,
    type: "fairway",
    isNewRelease: true
  },
  {
    id: 2,
    name: "Treasure Hunt",
    imageSrc: treasureHuntDisc,
    descriptionKey: "discs.treasureHuntDesc",
    speed: 12,
    glide: 6,
    turn: -1,
    fade: 3,
    type: "driver",
    isNewRelease: true
  },
  {
    id: 3,
    name: "Money Shot",
    imageSrc: moneyShotDisc,
    descriptionKey: "discs.moneyShotDesc",
    speed: 4,
    glide: 3,
    turn: 1,
    fade: 3,
    type: "putter",
    isNewRelease: true
  },
  {
    id: 4,
    name: "Jailbreak",
    imageSrc: jailbreakDisc,
    descriptionKey: "discs.jailbreakDesc",
    speed: "?",
    glide: "?",
    turn: "?",
    fade: "?",
    type: "driver",
    isNewRelease: true
  }
];

const Discs = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState("all");
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredDiscs = selectedType === "all" 
    ? discs 
    : discs.filter(disc => disc.type === selectedType);

  useEffect(() => {
    // SEO optimization
    document.title = "Lucky Discs Discs - Premium Disc Golf Collection | Complete Range";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lucky Discs discs collection of premium disc golf equipment. Featuring Lucky Discs Bank Robber, Treasure Hunt, Money Shot and Jailbreak discs with detailed specifications.');
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Lucky Discs Collection - Premium Disc Golf Equipment');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Complete Lucky Discs collection: drivers, fairway discs, mid-range and putters. Tournament-approved discs with distinctive designs and reliable performance.');
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Lucky Discs Discs
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
            <TabsList className="grid grid-cols-5 mb-8 bg-black/30">
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedType("all")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                {t('discs.allDiscs')}
              </TabsTrigger>
              <TabsTrigger 
                value="driver" 
                onClick={() => setSelectedType("driver")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                {t('discs.drivers')}
              </TabsTrigger>
              <TabsTrigger 
                value="fairway" 
                onClick={() => setSelectedType("fairway")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                {t('discs.fairway')}
              </TabsTrigger>
              <TabsTrigger 
                value="midrange" 
                onClick={() => setSelectedType("midrange")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                {t('discs.midRange')}
              </TabsTrigger>
              <TabsTrigger 
                value="putter" 
                onClick={() => setSelectedType("putter")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                {t('discs.putters')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
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
            </TabsContent>
            
            <TabsContent value="driver" className="mt-0">
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
            </TabsContent>
            
            <TabsContent value="fairway" className="mt-0">
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
            </TabsContent>
            
            <TabsContent value="midrange" className="mt-0">
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
            </TabsContent>
            
            <TabsContent value="putter" className="mt-0">
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
            </TabsContent>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 text-center">
              <h3 className="text-xl font-heading mb-3 text-lucky-green">{t('discs.drivers')}</h3>
              <p className="text-gray-300 text-sm" style={{ whiteSpace: 'pre-line' }}>
                {t('discs.driversDesc')}
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 text-center">
              <h3 className="text-xl font-heading mb-3 text-lucky-green">{t('discs.fairway')} Drivers</h3>
              <p className="text-gray-300 text-sm" style={{ whiteSpace: 'pre-line' }}>
                {t('discs.fairwayDesc')}
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 text-center">
              <h3 className="text-xl font-heading mb-3 text-lucky-green">{t('discs.midRange')}</h3>
              <p className="text-gray-300 text-sm" style={{ whiteSpace: 'pre-line' }}>
                {t('discs.midRangeDesc')}
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 text-center">
              <h3 className="text-xl font-heading mb-3 text-lucky-green">{t('discs.putters')}</h3>
              <p className="text-gray-300 text-sm" style={{ whiteSpace: 'pre-line' }}>
                {t('discs.puttersDesc')}
              </p>
            </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-4 text-lucky-green">{t('discs.speedGlide')}</h3>
                <p className="mb-4 text-gray-300">
                  <strong>Speed (1-14):</strong> {t('discs.speedDesc')}
                </p>
                <p className="text-gray-300">
                  <strong>Glide (1-7):</strong> {t('discs.glideDesc')}
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-4 text-lucky-green">{t('discs.turnFade')}</h3>
                <p className="mb-4 text-gray-300">
                  <strong>Turn (-5 to 1):</strong> {t('discs.turnDesc')}
                </p>
                <p className="text-gray-300">
                  <strong>Fade (0-5):</strong> {t('discs.fadeDesc')}
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                {t('discs.needHelp')}
              </p>
              <Button 
                className="mt-4 bg-lucky-green text-black hover:bg-white hover:text-black"
                onClick={() => window.location.href = '/disc-guide'}
              >
                {t('discs.selectionGuide')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Discs;
