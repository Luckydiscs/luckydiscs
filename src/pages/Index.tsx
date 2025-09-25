
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturedDisc from "@/components/FeaturedDisc";
import ProductCard from "@/components/ProductCard";
import SocialMediaShowcase from "@/components/SocialMediaShowcase";
import performanceChart from "@/assets/performance-chart-simple.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Disc, TruckIcon, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

import bankRobberDisc from "@/assets/bank-robber-disc.png";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.png";
import moneyShotDisc from "@/assets/money-shot-disc.png";
import jailbreakDisc from "@/assets/jailbreak-disc.png";

const featuredProducts = [
  {
    id: 1,
    name: "Bank Robber",
    imageSrc: bankRobberDisc,
    descriptionKey: "disc.bankRobber.description",
    speed: 8,
    glide: 5,
    turn: -1,
    fade: 2,
    isNewRelease: true
  },
  {
    id: 2,
    name: "Treasure Hunt", 
    imageSrc: treasureHuntDisc,
    descriptionKey: "disc.treasureHunt.description",
    speed: 12,
    glide: 6,
    turn: -1,
    fade: 3,
    isNewRelease: false
  },
  {
    id: 3,
    name: "Money Shot",
    imageSrc: moneyShotDisc, 
    descriptionKey: "disc.moneyShot.description",
    speed: 4,
    glide: 3,
    turn: 1,
    fade: 3,
    isNewRelease: false
  },
  {
    id: 4,
    name: "Jailbreak",
    imageSrc: jailbreakDisc,
    descriptionKey: "disc.jailbreak.description",
    speed: "?",
    glide: "?",
    turn: "?",
    fade: "?",
    isNewRelease: true
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // SEO optimization
    document.title = "Lucky Discs - Premium Disc Golf Equipment | Modern Discs with Wild Style";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lucky Discs premium disc golf equipment with tournament-tested quality. Modern discs with wild style featuring the Bank Robber, Treasure Hunt, Money Shot and mysterious Jailbreak discs.');
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Lucky Discs - Premium Disc Golf Equipment | Wild Style Tournament Discs');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Modern Discs. Wild Style. Lucky Throws. Discover our premium disc golf collection including Bank Robber, Treasure Hunt, and Money Shot discs.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Disc - Overlapping Hero */}
      <FeaturedDisc />
      
      {/* Featured Products */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">{t('featured.title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                imageSrc={product.imageSrc}
                name={product.name}
                description={t(product.descriptionKey)}
                speed={product.speed}
                glide={product.glide}
                turn={product.turn}
                fade={product.fade}
                isNewRelease={product.isNewRelease}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('/discs')}
              className="bg-lucky-green text-black hover:bg-white hover:text-black transition-all text-lg px-8"
            >
              {t('featured.viewAllDiscs')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Action Shots */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-lucky-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading mb-6 text-white font-semibold">
              {t('action.title')}
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              {t('action.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/lovable-uploads/8ae2dde2-ac3a-4144-9b11-35d02bc07d57.png" 
                alt="Professional disc golf tournament action shot showing perfect throwing form" 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-heading text-lg font-semibold mb-1">{t('action.tournamentPlay')}</h3>
                <p className="text-sm text-gray-300">{t('action.professionalPrecision')}</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/lovable-uploads/e7e6ee87-35bb-4435-9449-5b810a26bb17.png" 
                alt="Professional female disc golf player demonstrating perfect throwing technique" 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-heading text-lg font-semibold mb-1">{t('action.elitePerformance')}</h3>
                <p className="text-sm text-gray-300">{t('action.championshipLevel')}</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/lovable-uploads/770642ce-cd09-4bd5-ad75-cfdf0deeac1c.png" 
                alt="PDGA Pro Worlds tournament coverage showcasing elite level disc golf competition" 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-heading text-lg font-bold mb-1">{t('action.worldChampionship')}</h3>
                <p className="text-sm text-gray-300">{t('action.globalCompetition')}</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/lovable-uploads/a0e4d1ed-42e7-46bc-bc28-313aebe1023a.png" 
                alt="Top professional disc golf action shots from major tournaments" 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-heading text-lg font-bold mb-1">{t('action.professionalAction')}</h3>
                <p className="text-sm text-gray-300">{t('action.tournamentHighlights')}</p>
              </div>
            </div>
          </div>
          
          {/* Performance Visualization */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-lucky-green/20 p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <h3 className="text-3xl font-heading font-semibold text-white mb-4 drop-shadow-lg">
                  {t('action.performanceUnderPressure')}
                </h3>
                <p className="text-gray-100 mb-6 leading-relaxed text-base font-normal drop-shadow-md">
                  {t('action.performanceDescription')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <Button 
                    size="lg"
                    className="bg-lucky-green hover:bg-white text-black font-semibold transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                    onClick={() => navigate('/discs')}
                  >
                    {t('action.shopTournamentDiscs')}
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg w-full sm:w-auto"
                    onClick={() => navigate('/team')}
                  >
                    {t('action.meetOurTeam')}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={performanceChart} 
                  alt="Performance improvement chart showing consistency gains with Lucky Discs" 
                  className="w-full rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lucky-green/10 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">{t('features.title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black">
                <Disc size={32} />
              </div>
              <h3 className="text-xl font-heading">{t('features.premiumMaterials')}</h3>
              <p className="text-gray-400">
                {t('features.premiumMaterialsDesc')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black">
                <TruckIcon size={32} />
              </div>
              <h3 className="text-xl font-heading">{t('features.fastShipping')}</h3>
              <p className="text-gray-400">
                {t('features.fastShippingDesc')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-heading">{t('features.tournamentTested')}</h3>
              <p className="text-gray-400">
                {t('features.tournamentTestedDesc')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-heading">{t('features.communitySupport')}</h3>
              <p className="text-gray-400">
                {t('features.communitySupportDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-lucky-green text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">{t('cta.title')}</h2>
          <p className="text-black/80 max-w-2xl mx-auto mb-8 text-lg">
            {t('cta.subtitle')}
          </p>
          
          <Button 
            className="bg-black text-white hover:bg-white hover:text-black text-lg px-8 py-6"
            onClick={() => navigate('/wholesale')}
          >
            {t('cta.applyForWholesale')}
          </Button>
        </div>
      </section>
      
      {/* Social Media Showcase */}
      <SocialMediaShowcase />
      
      <Footer />
    </div>
  );
};

export default Index;
