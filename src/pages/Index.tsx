
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturedDisc from "@/components/FeaturedDisc";

import SocialMediaShowcase from "@/components/SocialMediaShowcase";

import { Button } from "@/components/ui/button";
import { ArrowRight, Disc, TruckIcon, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import useSEO from "@/hooks/useSEO";
import discs from "@/data/discs";

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Lucky Discs Premium Disc Golf Equipment",
    "description": "Lucky Discs - Premium Finnish disc golf equipment.",
    "url": "https://www.luckydiscs.fi",
    "itemListElement": discs.map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": product.name,
      "description": t(product.descriptionKey),
      "image": `https://www.luckydiscs.fi${product.imageSrc}`,
      "brand": { "@type": "Brand", "name": "Lucky Discs" },
      "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "EUR" }
    }))
  }), [t]);

  useSEO({
    title: "Lucky Discs - Premium Frisbeegolfkiekot Suomesta | Disc Golf Equipment Finland",
    description: "Lucky Discs - suomalaisia premium-frisbeegolfkiekkoja. Bank Robber, Treasure Hunt & Money Shot. Finnish disc golf discs for tournaments and recreation.",
    keywords: "frisbeegolf kiekot, disc golf discs, Lucky Discs, suomalainen frisbeegolf, Finnish disc golf, Bank Robber, Treasure Hunt, Money Shot, tournament discs",
    canonicalPath: "",
    structuredData,
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* NYT AVATTU — oma verkkokauppa (FI) */}
      {language === 'fi' && (
        <section className="bg-gradient-to-r from-lucky-green via-emerald-500 to-lucky-green text-black">
          <div className="container mx-auto px-4 py-4 md:py-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
            <p className="font-heading text-lg md:text-2xl font-bold tracking-wide">
              🎉 Nyt avattu — Lucky Discs oma verkkokauppa!
            </p>
            <Button
              className="bg-black text-white hover:bg-gray-900 font-bold rounded-full px-6 shrink-0"
              onClick={() => navigate('/shop')}
            >
              Siirry kauppaan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      )}

      {/* Featured Disc - Premium promo images */}
      <FeaturedDisc />
      
      {/* Action Shots */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-lucky-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-heading mb-3 text-white font-semibold">
              {t('action.title')}
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              {t('action.subtitle')}
            </p>
          </div>
          
          {/* Premium product band — floating studio discs */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-lucky-green/20 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              <div className="p-8 md:p-14 flex flex-col justify-center">
                <span className="text-lucky-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">Lucky Discs</span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-5 leading-tight">
                  {t('action.performanceUnderPressure')}
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg">
                  {t('action.performanceDescription')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-lucky-green hover:bg-lucky-green/90 text-white font-semibold rounded-full px-8 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => navigate(language === 'fi' ? '/shop' : '/wholesale')}
                  >
                    {t('action.shopTournamentDiscs')} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 transition-all duration-300 bg-transparent"
                    onClick={() => navigate('/team')}
                  >
                    {t('action.meetOurTeam')}
                  </Button>
                </div>
              </div>

              {/* Floating transparent studio discs on emerald glow */}
              <div className="relative min-h-[320px] md:min-h-[460px] flex items-center justify-center p-6">
                <div className="absolute w-60 h-60 md:w-80 md:h-80 bg-lucky-green/25 rounded-full blur-3xl" />
                <img
                  src="/images/products/treasure-hunt-ultrium.png"
                  alt="Lucky Discs Treasure Hunt"
                  className="absolute w-36 md:w-48 drop-shadow-2xl -rotate-[14deg] -translate-x-[4.5rem] md:-translate-x-28 translate-y-6"
                  loading="lazy"
                />
                <img
                  src="/images/products/jailbreak.png"
                  alt="Lucky Discs Jailbreak"
                  className="absolute w-36 md:w-48 drop-shadow-2xl rotate-[14deg] translate-x-[4.5rem] md:translate-x-28 translate-y-6"
                  loading="lazy"
                />
                <img
                  src="/images/products/money-shot-premium.png"
                  alt="Lucky Discs Money Shot"
                  className="relative z-10 w-44 md:w-60 drop-shadow-2xl -translate-y-2"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* "Ready for Jackpot?" banner - FI only */}
      {language === 'fi' && (
        <section className="py-10 md:py-16 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/images/brand/ready-for-jackpot.webp"
                  alt="Lucky Discs - Ready for Jackpot?"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={600}
                  height={600}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center gap-6">
                <div>
                  <p className="text-lucky-gold text-sm font-bold uppercase tracking-widest mb-2">Lucky Discs</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4 leading-tight">
                    {t('jackpot.title')}
                  </h2>
                  <div className="w-16 h-1 bg-lucky-green mb-6 rounded-full" />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {t('jackpot.description')}
                </p>
                <div>
                  <Button
                    className="bg-lucky-green hover:bg-white text-black font-semibold transition-all duration-300"
                    onClick={() => navigate('/shop')}
                  >
                    {t('jackpot.buyButton')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-10 md:py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">{t('features.title')}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div 
            className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white">
                <Disc size={32} />
              </div>
              <h3 className="text-xl font-heading">{t('features.premiumMaterials')}</h3>
              <p className="text-gray-300">
                {t('features.premiumMaterialsDesc')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white">
                <TruckIcon size={32} />
              </div>
              <h3 className="text-xl font-heading">{t('features.fastShipping')}</h3>
              <p className="text-gray-300">
                {t('features.fastShippingDesc')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-heading">{t('features.tournamentTested')}</h3>
              <p className="text-gray-300">
                {t('features.tournamentTestedDesc')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-heading">{t('features.communitySupport')}</h3>
              <p className="text-gray-300">
                {t('features.communitySupportDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Summer Sale / Kesätarjous - FI only */}
      {language === 'fi' && (
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/brand/discs-spain-beach.webp')" }}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="inline-block bg-lucky-green text-black text-sm font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-6">
              {t('summerSale.badge')}
            </div>
            <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-4 drop-shadow-lg">
              {t('summerSale.packTitle')}
            </h2>
            <div className="flex flex-col items-center gap-2 mb-6">
              <p className="text-white/90 text-lg md:text-xl font-medium">
                {t('summerSale.packContents')}
              </p>
              <span className="text-lucky-green text-5xl md:text-6xl font-black">{t('summerSale.packPrice')}</span>
              <p className="text-white/70 text-base">
                {t('summerSale.singlePrice')}
              </p>
            </div>
            <Button
              size="lg"
              className="bg-lucky-green hover:bg-white text-black font-bold text-xl px-12 py-6 shadow-2xl transition-all duration-300 mb-6"
              onClick={() => navigate('/shop')}
            >
              {t('summerSale.buyButton')} <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <p className="text-white/60 text-sm uppercase tracking-widest">
              {t('summerSale.limitedStock')}
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-lucky-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">{t('cta.title')}</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
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
