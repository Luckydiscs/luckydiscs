import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import danielImage from "@/assets/daniel-davidsson.png";
import { Trophy, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Team = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Lucky Discs Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Edustamme Lucky Discsiä ylimmällä tasolla, tuoden brändillemme menestystä ja näkyvyyttä kansainvälisillä kisakentillä.
            </p>
          </div>
        </section>

        {/* Daniel Davidsson Profile */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={danielImage} 
                      alt="Daniel Davidsson"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-3xl font-bold mb-2">Daniel Davidsson</CardTitle>
                      <CardDescription className="text-lg">Lucky Discs Team Captain</CardDescription>
                      <div className="flex items-center gap-2 mt-4">
                        <Badge variant="secondary" className="text-sm">
                          PDGA #76456
                        </Badge>
                        <Badge variant="default" className="text-sm bg-yellow-500 text-black">
                          2025 SM Kulta - Avoin
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="px-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            Saavutukset
                          </h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              2025 Suomen Mestaruus - Avoin (Kulta)
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              Lucky Discs -tiimin kapteeni
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              Kansainvälisten kilpailujen kokenut pelaaja
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Pelaajatiedot
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">PDGA Numero:</span>
                              <span className="ml-2 text-muted-foreground">#76456</span>
                            </div>
                            <div>
                              <span className="font-medium">Kotipaikka:</span>
                              <span className="ml-2 text-muted-foreground">Suomi</span>
                            </div>
                            <div>
                              <span className="font-medium">Peliasento:</span>
                              <span className="ml-2 text-muted-foreground">Oikeakätinen</span>
                            </div>
                            <div>
                              <span className="font-medium">Vuodesta mukana:</span>
                              <span className="ml-2 text-muted-foreground">2025</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3">Sosiaalinen media</h3>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm" asChild>
                              <a href="https://www.instagram.com/daniel.davidsson.dg" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Instagram
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <a href="https://www.pdga.com/player/76456" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                PDGA Profile
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Stats */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Tiimin saavutukset 2025</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">1</div>
                  <p className="text-lg font-semibold">SM Kulta</p>
                  <p className="text-sm text-muted-foreground">Avoin divisioona</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="text-lg font-semibold">Kilpailuja</p>
                  <p className="text-sm text-muted-foreground">Kansallisella tasolla</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-accent mb-2">3</div>
                  <p className="text-lg font-semibold">Lucky-kiekkoa</p>
                  <p className="text-sm text-muted-foreground">Käytössä kilpailuissa</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Seuraa Lucky Discsiä</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button variant="outline" size="lg" asChild>
                <a href="https://www.instagram.com/luckydiscs_official" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Instagram
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://www.facebook.com/luckydiscs" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Facebook
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://www.youtube.com/@luckydiscs" target="_blank" rel="noopener noreferrer">
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