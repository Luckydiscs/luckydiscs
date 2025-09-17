
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
    speed: 12,
    glide: 5,
    turn: -1,
    fade: 3,
    isNewRelease: true
  },
  {
    id: 2,
    name: "Treasure Hunt", 
    imageSrc: treasureHuntDisc,
    description: "Mid-range disc with excellent glide and reliable fade.",
    speed: 5,
    glide: 5,
    turn: -0.5,
    fade: 1,
    isNewRelease: false
  },
  {
    id: 3,
    name: "Money Shot",
    imageSrc: moneyShotDisc, 
    description: "Our signature putter with incredible grip and accuracy.",
    speed: 2,
    glide: 1,
    turn: 1,
    fade: 1,
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
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">Lucky in Action</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our discs performing in all conditions, from tournament play to casual rounds.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img 
                src="/lovable-uploads/8ae2dde2-ac3a-4144-9b11-35d02bc07d57.png" 
                alt="Lucky Discs Bank Robber in action" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg lg:col-span-2">
              <img 
                src="/lovable-uploads/770642ce-cd09-4bd5-ad75-cfdf0deeac1c.png" 
                alt="Lucky Discs tournament play action shot" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
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
