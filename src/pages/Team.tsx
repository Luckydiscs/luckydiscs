import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import danielImage from "@/assets/daniel-tournament-action.png";
import crowdBg from "@/assets/tournament-crowd-bg.jpg";
import { Trophy, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Team = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Lucky Discs Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Representing Lucky Discs at the highest level, bringing success and visibility to our brand on international tournament fields.
            </p>
          </div>
        </section>

        {/* Daniel Davidsson Profile */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <div 
                      className="w-full h-64 md:h-full bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${crowdBg})` }}
                    >
                      <div className="absolute inset-0 bg-black/30"></div>
                      <img 
                        src={danielImage} 
                        alt="Daniel Davidsson throwing disc in tournament"
                        className="w-full h-full object-cover relative z-10"
                      />
                    </div>
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
                            Achievements
                          </h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              2025 Finnish Championship - Open Division (Gold)
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              Lucky Discs Team Captain
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              Experienced international tournament player
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Player Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">PDGA Number:</span>
                              <span className="ml-2 text-muted-foreground">#76456</span>
                            </div>
                            <div>
                              <span className="font-medium">Location:</span>
                              <span className="ml-2 text-muted-foreground">Finland</span>
                            </div>
                            <div>
                              <span className="font-medium">Throwing Hand:</span>
                              <span className="ml-2 text-muted-foreground">Right-handed</span>
                            </div>
                            <div>
                              <span className="font-medium">Team Member Since:</span>
                              <span className="ml-2 text-muted-foreground">2025</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3">Social Media</h3>
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
            <h2 className="text-3xl font-bold text-center mb-12">Team Achievements 2025</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">1</div>
                  <p className="text-lg font-semibold">Championship Gold</p>
                  <p className="text-sm text-muted-foreground">Open Division</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="text-lg font-semibold">Tournaments</p>
                  <p className="text-sm text-muted-foreground">National level</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-accent mb-2">3</div>
                  <p className="text-lg font-semibold">Lucky Discs</p>
                  <p className="text-sm text-muted-foreground">Used in competitions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Follow Lucky Discs</h2>
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