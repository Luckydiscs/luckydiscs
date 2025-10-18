import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import danielVictoryImage from "@/assets/daniel-victory-photo.png";
import danielSignatureDisc from "@/assets/daniel-signature-disc.jpg";
import moneyShotDisc from "@/assets/money-shot-disc.png";
import DiscPromotion from "@/components/DiscPromotion";
import { Trophy, Calendar, MapPin, ExternalLink, Users, Disc, ShoppingCart, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Team = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // SEO Meta Tags
    const pageTitle = "Lucky Discs Team - Daniel Davidsson Finnish Champion 2025 | Professional Disc Golf Team";
    const pageDescription = "Meet the Lucky Discs professional team featuring Daniel Davidsson, 2025 Finnish Disc Golf Champion. Championship mindset, professional athletes, and tournament excellence.";
    const pageKeywords = "Daniel Davidsson, Finnish Champion 2025, professional disc golf team, Lucky Discs team, disc golf athletes, tournament champions, Money Shot signature disc";
    const canonicalUrl = "https://www.luckydiscs.fi/team";
    const ogImage = "https://www.luckydiscs.fi/lovable-uploads/a0e4d1ed-42e7-46bc-bc28-313aebe1023a.png";
    
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
    
    // Structured Data - Person & Athlete
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Daniel Davidsson",
      "jobTitle": "Professional Disc Golf Player",
      "affiliation": {
        "@type": "Organization",
        "name": "Lucky Discs"
      },
      "award": "Finnish Champion 2025",
      "sport": "Disc Golf",
      "image": ogImage,
      "description": "Professional disc golf player and 2025 Finnish Champion representing Lucky Discs"
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
          <div className="container mx-auto text-center relative z-10 px-4">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
              Lucky Discs Team
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
              {t('team.subtitle')}
            </p>
          </div>
        </section>

        {/* Daniel Davidsson Profile */}
        <section className="py-20 px-4 bg-black">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-semibold mb-4 text-white">{t('team.meetChampion')}</h2>
                <p className="text-xl text-gray-300">{t('team.championSubtitle')}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="relative">
                  <img 
                    src={danielVictoryImage} 
                    alt="Daniel Davidsson - 2025 Finnish Champion"
                    className="w-full rounded-lg shadow-2xl"
                  />
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-semibold mb-4 text-white">Daniel Davidsson</h3>
                    <p className="text-lg text-lucky-green font-semibold mb-4">{t('team.danielTitle')}</p>
                    
                    <div className="bg-gradient-to-r from-lucky-green/10 to-transparent p-6 rounded-lg border-l-4 border-lucky-green">
                      <p className="text-white font-medium">
                        {t('team.danielQuote')}
                      </p>
                      <p className="text-lucky-green mt-2 text-sm">- Daniel Davidsson, Finnish Champion 2025</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                      <div className="text-2xl font-bold text-lucky-green mb-2">2025</div>
                      <p className="text-white font-medium">{t('team.finnishChampion')}</p>
                      <p className="text-gray-400 text-sm">{t('team.openDivisionGold')}</p>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                      <div className="text-2xl font-bold text-lucky-green mb-2">#76456</div>
                      <p className="text-white font-medium">{t('team.pdgaPlayer')}</p>
                      <p className="text-gray-400 text-sm">{t('team.professionalRating')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Philosophy */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-900/50 to-black">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-white">Championship Mindset</h2>
              <p className="text-lg text-gray-300 mb-8">
                "Lucky isn't just our name - it's our philosophy. We believe that preparation meets opportunity on every throw, 
                and our discs are designed to help players create their own luck on the course."
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Excellence</h3>
                  <p className="text-sm text-gray-400">
                    Championship-level performance in every disc we create.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Team Spirit</h3>
                  <p className="text-sm text-gray-400">
                    Building success through collaboration and shared vision.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Disc className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Innovation</h3>
                  <p className="text-sm text-gray-400">
                    Constantly pushing the boundaries of disc golf performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daniel's Signature Disc */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900/50 to-black">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-white">{t('team.signatureDisc')}</h3>
                    <p className="text-lg text-gray-300 mb-6">
                      {t('team.signatureDiscDesc')}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 md:p-6 rounded-lg border border-gray-800">
                      <h4 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                        <span className="break-words">{t('team.getLuckyDiscs')}</span>
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-lucky-green font-medium text-sm md:text-base">{t('team.finlandResidents')}</p>
                          <p className="text-gray-300 text-xs md:text-sm break-words">
                            {t('team.finlandDesc')}{" "}
                            <a 
                              href="https://kesapelit.fi/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-lucky-green hover:underline font-medium"
                            >
                              kesapelit.fi
                            </a>
                          </p>
                        </div>
                        <div>
                          <p className="text-lucky-green font-medium flex items-center gap-2 text-sm md:text-base">
                            <Globe className="h-4 w-4 flex-shrink-0" />
                            <span>{t('team.internationalCustomers')}</span>
                          </p>
                          <p className="text-gray-300 text-xs md:text-sm break-words">
                            {t('team.internationalDesc')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2 relative">
                  <div className="bg-gradient-to-br from-lucky-green/10 to-transparent p-8 rounded-xl">
                    <img 
                      src={danielSignatureDisc} 
                      alt="Daniel Davidsson's Signature Money Shot Disc"
                      className="w-full max-w-md mx-auto rounded-full shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Stats */}
        <section className="py-16 px-4 bg-black">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">{t('team.championshipResults')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-lg border border-gray-700 text-center">
                <div className="text-4xl font-bold text-lucky-green mb-2">🥇</div>
                <p className="text-lg font-semibold text-white">{t('team.finnishNational')}</p>
                <p className="text-sm text-gray-400">{t('team.championshipGold')}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-lg border border-gray-700 text-center">
                <div className="text-4xl font-bold text-lucky-green mb-2">15+</div>
                <p className="text-lg font-semibold text-white">{t('team.tournaments')}</p>
                <p className="text-sm text-gray-400">{t('team.competedIn2025')}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-lg border border-gray-700 text-center">
                <div className="text-4xl font-bold text-lucky-green mb-2">100%</div>
                <p className="text-lg font-semibold text-white">{t('team.luckyDiscs')}</p>
                <p className="text-sm text-gray-400">{t('team.championshipSetup')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-900/30 to-black">
          <div className="container mx-auto">
            {/* Money Shot Disc Promotion */}
            <div className="mb-16">
              <DiscPromotion 
                discName="moneyShot"
                discImage={moneyShotDisc}
                flightNumbers={{ speed: 4, glide: 3, turn: 1, fade: 3 }}
                buyUrl="https://kesapelit.fi/tuote/premium-money-shot"
                variant="inline"
              />
            </div>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-white">{t('team.followJourney')}</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('team.followDesc')}
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
              <Button variant="outline" size="lg" className="border-lucky-green text-lucky-green hover:bg-lucky-green hover:text-black" asChild>
                <a href="https://www.instagram.com/luckydiscsofficial" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Instagram
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-lucky-green text-lucky-green hover:bg-lucky-green hover:text-black" asChild>
                <a href="https://www.facebook.com/LuckyDiscs" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Facebook
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-lucky-green text-lucky-green hover:bg-lucky-green hover:text-black" asChild>
                <a href="https://www.youtube.com/@LuckyDiscs" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  YouTube
                </a>
              </Button>
            </div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;