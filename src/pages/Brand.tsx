
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import DiscPromotion from "@/components/DiscPromotion";
import bankRobberDisc from "@/assets/bank-robber-disc.png";

// Import images properly
import proPlayerImage from "/public/lovable-uploads/e7e6ee87-35bb-4435-9449-5b810a26bb17.png";
import blueDiscImage from "/public/lovable-uploads/682fc2dd-badc-4562-8574-aaab40a86d03.png";
import pinkDiscImage from "/public/lovable-uploads/4c26d096-cfa9-4173-afe7-93b4f8b28426.png";
import treasureDiscImage from "/public/lovable-uploads/f2a202e9-26ab-435b-bcf0-d30e31980a8b.png";
import goldDiscImage from "/public/lovable-uploads/6c56f0b3-a367-4e99-b234-5ce2b5e8c32c.png";

const Brand = () => {
  const { t } = useTranslation();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // SEO Meta Tags
    const pageTitle = "Lucky Discs Brand - Finnish Premium Disc Golf Manufacturer Story";
    const pageDescription = "Lucky Discs brand story - Founded in 2022 in Finland. Premium disc golf manufacturer with casino-inspired designs, Finnish quality, and championship performance.";
    const pageKeywords = "Lucky Discs brand, Finnish disc golf manufacturer, disc golf company, casino design discs, Nokia Finland, premium disc golf brand, disc golf innovation";
    const canonicalUrl = "https://www.luckydiscs.fi/brand";
    const ogImage = "https://www.luckydiscs.fi/lovable-uploads/f2a202e9-26ab-435b-bcf0-d30e31980a8b.png";
    
    document.title = pageTitle;
    
    // Meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', pageDescription);
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', pageKeywords);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', pageDescription);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    
    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) ogImageTag.setAttribute('content', ogImage);
    
    // Twitter Card
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', pageDescription);
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', ogImage);
    
    // Hreflang
    const updateOrCreateHreflang = (lang: string, url: string) => {
      let hreflang = document.querySelector(`link[hreflang="${lang}"]`);
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', lang);
        document.head.appendChild(hreflang);
      }
      hreflang.setAttribute('href', url);
    };
    
    updateOrCreateHreflang('en', canonicalUrl);
    updateOrCreateHreflang('fi', canonicalUrl);
    updateOrCreateHreflang('x-default', canonicalUrl);
    
    // Structured Data - Brand & Organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lucky Discs",
      "description": pageDescription,
      "foundingDate": "2022",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nokia",
          "addressCountry": "FI"
        }
      },
      "logo": "https://www.luckydiscs.fi/lucky-discs-logo.png",
      "image": ogImage,
      "url": "https://www.luckydiscs.fi",
      "sameAs": [
        "https://www.instagram.com/luckydiscsofficial",
        "https://www.facebook.com/LuckyDiscs",
        "https://www.youtube.com/@LuckyDiscsofficial"
      ],
      "brand": {
        "@type": "Brand",
        "name": "Lucky Discs",
        "slogan": "Modern Discs. Wild Style. Lucky Throws."
      }
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-20");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Lucky Discs Brand
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            {t('brand.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-lucky-green">2022</div>
              <div className="text-sm text-gray-400">{t('brand.founded')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lucky-green">Growing</div>
              <div className="text-sm text-gray-400">{t('brand.retailerNetwork')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lucky-green">1000+</div>
              <div className="text-sm text-gray-400">{t('brand.happyCustomers')}</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-gradient-to-b from-black/50 to-black">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center opacity-0 translate-y-20 transition-all duration-1000"
            ref={(el) => (sectionRefs.current[0] = el)}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-heading mb-8">
                {t('brand.howItBegan')}
              </h2>
              
              <div className="space-y-6 text-lg">
                <p className="text-gray-300">
                  <span className="text-lucky-green font-semibold">{t('brand.founded')} 2022</span> {t('brand.foundedStory')}
                </p>
                
                <p className="text-gray-300">
                  {t('brand.growingStory')}
                </p>
                
                <div className="bg-gradient-to-r from-lucky-green/20 to-transparent p-6 rounded-lg border-l-4 border-lucky-green mb-4">
                  <h4 className="text-white font-bold text-lg mb-2">🇫🇮 {t('brand.madeInFinland')}</h4>
                  <p className="text-gray-300">
                    {t('brand.madeInFinlandDesc')}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-lucky-green/10 to-transparent p-6 rounded-lg border-l-4 border-lucky-green">
                  <h4 className="text-white font-bold text-lg mb-4">{t('brand.connectShop')}</h4>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/discs">
                      <Button className="bg-lucky-green text-black hover:bg-white hover:text-black">
                        {t('brand.shopDiscs')}
                      </Button>
                    </Link>
                    <a 
                      href="https://www.instagram.com/luckydiscsofficial" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lucky-green hover:text-white transition-colors font-semibold"
                    >
                      {t('brand.followInstagram')}
                    </a>
                    <a 
                      href="https://www.facebook.com/LuckyDiscs" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lucky-green hover:text-white transition-colors font-semibold"
                    >
                      {t('brand.likeOnFacebook')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={proPlayerImage} 
                alt="Professional disc golf player" 
                className="rounded-lg shadow-2xl max-w-full mx-auto"
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-12 bg-lucky-green/30 rounded-full blur-2xl"></div>
              <div className="absolute top-4 right-4 bg-lucky-green text-black px-4 py-2 rounded-full font-bold text-sm">
                {t('brand.proTeam')}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Lucky */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 text-center">
              {t('brand.whyChoose')}
            </h2>
            <p className="text-gray-300 text-center mb-16 text-xl max-w-3xl mx-auto">
              {t('brand.whyChooseDesc')}
            </p>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 translate-y-20 transition-all duration-1000"
              ref={(el) => (sectionRefs.current[1] = el)}
            >
              <div className="bg-gradient-to-b from-lucky-green/10 to-black/30 p-8 rounded-xl border border-lucky-green/20 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black font-bold text-2xl">P</span>
                </div>
                <h3 className="text-2xl font-heading mb-4 text-white">{t('brand.boldInnovation')}</h3>
                <p className="text-gray-300 mb-4">
                  {t('brand.boldInnovationDesc')}
                </p>
                <div className="text-lucky-green font-semibold">{t('brand.premiumMaterialsDesign')}</div>
              </div>
              
              <div className="bg-gradient-to-b from-lucky-green/10 to-black/30 p-8 rounded-xl border border-lucky-green/20 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black font-bold text-2xl">E</span>
                </div>
                <h3 className="text-2xl font-heading mb-4 text-white">{t('brand.qualityFirst')}</h3>
                <p className="text-gray-300 mb-4">
                  {t('brand.qualityFirstDesc')}
                </p>
                <div className="text-lucky-green font-semibold">{t('brand.tournamentGrade')}</div>
              </div>
              
              <div className="bg-gradient-to-b from-lucky-green/10 to-black/30 p-8 rounded-xl border border-lucky-green/20 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black font-bold text-2xl">S</span>
                </div>
                <h3 className="text-2xl font-heading mb-4 text-white">{t('brand.communityGrowth')}</h3>
                <p className="text-gray-300 mb-4">
                  {t('brand.communityGrowthDesc')}
                </p>
                <div className="text-lucky-green font-semibold">{t('brand.playerSponsorships')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Design Approach */}
      <section className="py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center opacity-0 translate-y-20 transition-all duration-1000"
            ref={(el) => (sectionRefs.current[2] = el)}
          >
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={blueDiscImage} 
                  alt="Blue Bank Robber Disc" 
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src={pinkDiscImage} 
                  alt="Pink Bank Robber Disc" 
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src={treasureDiscImage} 
                  alt="Treasure Hunt Disc" 
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src={goldDiscImage} 
                  alt="Gold Treasure Hunt Disc" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-heading mb-6">
                {t('brand.designPhilosophy')}
              </h2>
              
              <p className="text-gray-300 mb-4">
                {t('brand.designDesc1')}
              </p>
              
              <p className="text-gray-300 mb-4">
                {t('brand.designDesc2')}
              </p>
              
              <p className="text-gray-300">
                {t('brand.designDesc3')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sponsorships & Community */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto opacity-0 translate-y-20 transition-all duration-1000"
            ref={(el) => (sectionRefs.current[3] = el)}
          >
            <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
              {t('brand.sponsorshipsCommunity')}
            </h2>
            
            <p className="text-gray-300 text-center mb-10 max-w-3xl mx-auto">
              {t('brand.sponsorshipsDesc')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-4">{t('brand.playerSponsorshipsTitle')}</h3>
                <p className="text-gray-400 mb-4">
                  {t('brand.playerSponsorshipsDesc')}
                </p>
                <p className="text-gray-400">
                  {t('brand.interestedSponsorships')}
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-4">{t('brand.tournamentSupport')}</h3>
                <p className="text-gray-400 mb-4">
                  {t('brand.tournamentSupportDesc')}
                </p>
                <p className="text-gray-400">
                  {t('brand.planningEvent')}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/contact">
                <Button className="bg-lucky-green text-black hover:bg-white hover:text-black">
                  {t('brand.contactPartnerships')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-lucky-green text-black">
        <div className="container mx-auto px-4">
          {/* Bank Robber Disc Promotion */}
          <div className="mb-12">
            <DiscPromotion 
              discName="bankRobber"
              discImage={bankRobberDisc}
              flightNumbers={{ speed: 8, glide: 5, turn: -1, fade: 2 }}
              buyUrl="https://kesapelit.fi/tuote/premium-bank-robber"
              variant="inline"
            />
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              {t('brand.joinLuckyFamily')}
            </h2>
          <p className="text-black/80 max-w-2xl mx-auto mb-8 text-lg">
            {t('brand.joinDesc')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/discs">
              <Button className="bg-black text-white hover:bg-white hover:text-black">
                {t('brand.shopOurDiscs')}
              </Button>
            </Link>
            
            <Link to="/wholesale">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                {t('brand.becomeRetailer')}
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Brand;
