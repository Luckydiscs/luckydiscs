import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import danielVictoryImage from "@/assets/daniel-victory-photo.png";
import danielSignatureDisc from "@/assets/daniel-signature-disc.jpg";
import { Trophy, Calendar, MapPin, ExternalLink, Users, Disc, ShoppingCart, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Team = () => {
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
              Championship-proven performance. Our team represents Lucky Discs at the highest level, 
              bringing victory and visibility to our brand on international tournament fields.
            </p>
          </div>
        </section>

        {/* Daniel Davidsson Profile */}
        <section className="py-20 px-4 bg-black">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-semibold mb-4 text-white">Meet Our Champion</h2>
                <p className="text-xl text-gray-300">Daniel Davidsson - 2025 Finnish National Champion</p>
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
                    <p className="text-lg text-lucky-green font-semibold mb-4">Team Captain & Finnish National Champion 2025</p>
                    
                    <div className="bg-gradient-to-r from-lucky-green/10 to-transparent p-6 rounded-lg border-l-4 border-lucky-green">
                      <p className="text-white font-medium">
                        "I joined the Lucky Discs team in 2025 and won my first Finnish championship right away. 
                        Lucky discs gave me the confidence and precision I needed to win."
                      </p>
                      <p className="text-lucky-green mt-2 text-sm">- Daniel Davidsson, Finnish Champion 2025</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                      <div className="text-2xl font-bold text-lucky-green mb-2">2025</div>
                      <p className="text-white font-medium">Finnish Champion</p>
                      <p className="text-gray-400 text-sm">Open Division Gold</p>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                      <div className="text-2xl font-bold text-lucky-green mb-2">#76456</div>
                      <p className="text-white font-medium">PDGA Player</p>
                      <p className="text-gray-400 text-sm">Professional Rating</p>
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
                    <h3 className="text-3xl font-bold mb-4 text-white">Daniel's Signature Disc</h3>
                    <p className="text-lg text-gray-300 mb-6">
                      The Money Shot - Daniel's championship-winning disc. Designed for precision and reliability 
                      in crucial moments, this disc embodies the Lucky Discs philosophy of creating your own luck.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 md:p-6 rounded-lg border border-gray-800">
                      <h4 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                        <span className="break-words">Get Your Lucky Discs</span>
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-lucky-green font-medium text-sm md:text-base">Finland Residents:</p>
                          <p className="text-gray-300 text-xs md:text-sm break-words">
                            Purchase Daniel's signature disc and all Lucky Discs at{" "}
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
                            <span>International Customers:</span>
                          </p>
                          <p className="text-gray-300 text-xs md:text-sm break-words">
                            Contact your nearest retailer! Suggest Lucky Discs to your local shop 
                            and we'll get our discs available in your area too.
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
            <h2 className="text-3xl font-bold text-center mb-12 text-white">2025 Championship Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-lg border border-gray-700 text-center">
                <div className="text-4xl font-bold text-lucky-green mb-2">🥇</div>
                <p className="text-lg font-semibold text-white">Finnish National</p>
                <p className="text-sm text-gray-400">Championship Gold</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-lg border border-gray-700 text-center">
                <div className="text-4xl font-bold text-lucky-green mb-2">15+</div>
                <p className="text-lg font-semibold text-white">Tournaments</p>
                <p className="text-sm text-gray-400">Competed in 2025</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-lg border border-gray-700 text-center">
                <div className="text-4xl font-bold text-lucky-green mb-2">100%</div>
                <p className="text-lg font-semibold text-white">Lucky Discs</p>
                <p className="text-sm text-gray-400">Championship setup</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-900/30 to-black">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Follow Our Journey</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay updated with team results, behind-the-scenes content, and the latest Lucky Discs releases.
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;