import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import useSEO from "@/hooks/useSEO";
import danielVictoryImage from "@/assets/daniel-victory-photo.webp";
import moneyShotDisc from "@/assets/money-shot-disc.webp";
import DiscPromotion from "@/components/DiscPromotion";
import { Trophy, Users, Disc, ExternalLink, Star, Target, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Team = () => {
  const { t } = useTranslation();

  const ogImage = "https://www.luckydiscs.fi/lovable-uploads/a0e4d1ed-42e7-46bc-bc28-313aebe1023a.webp";

  useSEO({
    title: "Lucky Discs Team - 2025 Finnish Championship History | Join Our Team",
    description: "Lucky Discs team history featuring our 2025 Finnish Championship success. Looking for new team players - apply now to join our growing disc golf team!",
    keywords: "Lucky Discs team, disc golf team Finland, Finnish Championship 2025, join disc golf team, professional disc golf, disc golf sponsorship",
    canonicalPath: "/team",
    ogImage: ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SportsTeam",
      "name": "Lucky Discs Team",
      "sport": "Disc Golf",
      "description": "Professional disc golf team representing Lucky Discs brand",
      "award": "Finnish Championship 2025",
      "image": ogImage
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
          <div className="container mx-auto text-center relative z-10 px-4">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium mb-4 md:mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
              Lucky Discs Team
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
              {t('team.subtitle')}
            </p>
          </div>
        </section>

        {/* 2025 Championship History */}
        <section className="py-20 px-4 bg-black">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="bg-lucky-green/20 text-lucky-green border-lucky-green mb-4">
                  {t('team.hallOfFame')}
                </Badge>
                <h2 className="text-4xl font-medium mb-4 text-white">{t('team.meetChampion')}</h2>
                <p className="text-xl text-gray-300">{t('team.championSubtitle')}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="relative">
                  <img 
                    src={danielVictoryImage} 
                    alt="Daniel Davidsson - 2025 Finnish Champion with Lucky Discs"
                    className="w-full rounded-lg shadow-2xl"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500/90 text-black font-bold">
                      🏆 2025
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-medium mb-4 text-white">Daniel Davidsson</h3>
                    <p className="text-lg text-lucky-green font-semibold mb-4">{t('team.danielTitle')}</p>
                    
                    <div className="bg-gradient-to-r from-lucky-green/10 to-transparent p-6 rounded-lg border-l-4 border-lucky-green mb-6">
                      <p className="text-white font-medium">
                        {t('team.danielAchievement')}
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="text-yellow-500">⚠️</span>
                        {t('team.contractEnded')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                      <div className="text-2xl font-bold text-lucky-green mb-2">🥇</div>
                      <p className="text-white font-medium">{t('team.finnishChampion')}</p>
                      <p className="text-gray-400 text-sm">{t('team.openDivisionGold')}</p>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                      <div className="text-2xl font-bold text-lucky-green mb-2">2025</div>
                      <p className="text-white font-medium">{t('team.championshipYear')}</p>
                      <p className="text-gray-400 text-sm">{t('team.withLuckyDiscs')}</p>
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
              <h2 className="text-3xl font-semibold mb-8 text-white">Championship Mindset</h2>
              <p className="text-lg text-gray-300 mb-8">
                "Lucky isn't just our name - it's our philosophy. We believe that preparation meets opportunity on every throw, 
                and our discs are designed to help players create their own luck on the course."
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">Excellence</h3>
                  <p className="text-sm text-gray-400">
                    Championship-level performance in every disc we create.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">Team Spirit</h3>
                  <p className="text-sm text-gray-400">
                    Building success through collaboration and shared vision.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Disc className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">Innovation</h3>
                  <p className="text-sm text-gray-400">
                    Constantly pushing the boundaries of disc golf performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Are You Our Next Star? */}
        <section className="py-20 px-4 bg-gradient-to-br from-lucky-green/10 to-black">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-lucky-green text-black font-bold mb-4">
                  {t('team.nowRecruiting')}
                </Badge>
                <h2 className="text-4xl font-semibold mb-4 text-white">{t('team.lookingForStars')}</h2>
                <p className="text-xl text-gray-300">
                  {t('team.lookingForStarsDesc')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Star className="h-5 w-5 text-lucky-green" />
                      {t('team.whatWeOffer')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-3">
                    <p>✓ {t('team.offer1')}</p>
                    <p>✓ {t('team.offer2')}</p>
                    <p>✓ {t('team.offer3')}</p>
                    <p>✓ {t('team.offer4')}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-lucky-green" />
                      {t('team.whatWeLookFor')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-3">
                    <p>✓ {t('team.looking1')}</p>
                    <p>✓ {t('team.looking2')}</p>
                    <p>✓ {t('team.looking3')}</p>
                    <p>✓ {t('team.looking4')}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-lucky-green text-black hover:bg-lucky-green/90 font-bold text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/contact">
                    <Award className="h-5 w-5 mr-2" />
                    {t('team.applyNow')}
                  </Link>
                </Button>
                <p className="text-gray-400 mt-4 text-sm">
                  {t('team.applyHint')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Stats */}
        <section className="py-16 px-4 bg-black">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12 text-white">{t('team.championshipResults')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-lg border border-gray-700 text-center">
                <div className="text-4xl font-bold text-lucky-green mb-2">🥇</div>
                <p className="text-lg font-semibold text-white">{t('team.finnishNational')}</p>
                <p className="text-sm text-gray-400">{t('team.championshipGold')}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-lg border border-gray-700 text-center">
                <div className="text-4xl font-bold text-lucky-green mb-2">2025</div>
                <p className="text-lg font-semibold text-white">{t('team.historicYear')}</p>
                <p className="text-sm text-gray-400">{t('team.firstChampionship')}</p>
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
              <h2 className="text-3xl font-semibold mb-8 text-white">{t('team.followJourney')}</h2>
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