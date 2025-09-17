
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturedDisc from "@/components/FeaturedDisc";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Disc, TruckIcon, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import bankRobberDisc from "@/assets/bank-robber-disc.png";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.png";
import moneyShotDisc from "@/assets/money-shot-disc.png";

const featuredProducts = [
  {
    id: 1,
    name: "Bank Robber",
    imageSrc: bankRobberDisc,
    description: "A high-speed driver with unmatched stability for power throwers.",
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
    description: "Mid-range disc with excellent glide and reliable fade.",
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
    description: "Our signature putter with incredible grip and accuracy.",
    speed: 4,
    glide: 3,
    turn: 1,
    fade: 3,
    isNewRelease: false
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lucky-black to-gray-900 text-foreground overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Disc - Overlapping Hero */}
      <FeaturedDisc />
      
      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">Featured Discs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our most popular disc models, each crafted with premium materials
              and distinctive designs that set you apart on the course.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                imageSrc={product.imageSrc}
                name={product.name}
                description={product.description}
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
              View All Discs <ArrowRight className="ml-2 h-5 w-5" />
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
            <h2 className="text-4xl md:text-6xl font-heading mb-6 text-white font-bold">
              Lucky in Action
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              Our discs performing in all conditions, from professional tournaments to weekend rounds. 
              See why players trust Lucky Discs for their most important shots.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/src/assets/disc-golf-action-1.jpg" 
                alt="Professional disc golf player mid-throw showing perfect form and technique" 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-heading text-lg font-bold mb-1">Tournament Play</h3>
                <p className="text-sm text-gray-300">Professional form in action</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/src/assets/disc-golf-action-2.jpg" 
                alt="Disc golf player executing precise approach shot on tournament course" 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-heading text-lg font-bold mb-1">Precision Shots</h3>
                <p className="text-sm text-gray-300">Every throw counts</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/src/assets/disc-golf-action-3.jpg" 
                alt="Dynamic action shot of disc golf player in outdoor tournament setting" 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-heading text-lg font-bold mb-1">Power Drives</h3>
                <p className="text-sm text-gray-300">Maximum distance</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src="/src/assets/disc-golf-tournament.jpg" 
                alt="Tournament atmosphere with spectators watching competitive disc golf action" 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="font-heading text-lg font-bold mb-1">Championship Level</h3>
                <p className="text-sm text-gray-300">Trusted by pros</p>
              </div>
            </div>
          </div>
          
          {/* Featured Action Shot */}
          <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-heading font-bold text-white mb-4">
                  Performance Under Pressure
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  When every throw matters, Lucky Discs deliver the consistency and reliability 
                  that professional players demand. From crucial putts to game-winning drives, 
                  our discs perform when it counts most.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-lucky-green hover:bg-white text-black font-semibold transition-all duration-300"
                    onClick={() => navigate('/discs')}
                  >
                    Shop Tournament Discs
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                    onClick={() => navigate('/team')}
                  >
                    Meet Our Team
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/src/assets/daniel-action-shot.png" 
                  alt="Daniel Davidsson showcasing Lucky Discs performance in tournament play" 
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lucky-green/30 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">Why Choose Lucky Discs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're dedicated to creating premium disc golf equipment that performs as good as it looks.
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
              <h3 className="text-xl font-heading">Premium Materials</h3>
              <p className="text-gray-400">
                All our discs are made with high-quality polymers for superior durability and consistent flight.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black">
                <TruckIcon size={32} />
              </div>
              <h3 className="text-xl font-heading">Fast Shipping</h3>
              <p className="text-gray-400">
                We ship worldwide with reliable tracking and secure packaging for your discs.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-heading">Tournament Tested</h3>
              <p className="text-gray-400">
                Our discs are tournament-approved and used by professional players worldwide.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-lucky-green w-16 h-16 rounded-full flex items-center justify-center mx-auto text-black">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-heading">Community Support</h3>
              <p className="text-gray-400">
                We actively sponsor events and players to grow the sport of disc golf globally.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-lucky-green text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">Ready to Stock Lucky Discs?</h2>
          <p className="text-black/80 max-w-2xl mx-auto mb-8 text-lg">
            Join our network of retailers and offer your customers premium disc golf equipment with unique style.
          </p>
          
          <Button 
            className="bg-black text-white hover:bg-white hover:text-black text-lg px-8 py-6"
            onClick={() => navigate('/wholesale')}
          >
            Apply for Wholesale Access
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
