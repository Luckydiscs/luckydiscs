
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.png";
import bankRobberDisc from "@/assets/bank-robber-disc.png";
import moneyShotDisc from "@/assets/money-shot-disc.png";
import jailbreakDisc from "@/assets/jailbreak-disc.png";

const discs = [
  {
    id: 1,
    name: "Bank Robber",
    imageSrc: bankRobberDisc,
    description: "A versatile control driver that steals the show on technical fairways. Reliable flight path with excellent glide.",
    speed: 8,
    glide: 5,
    turn: -1,
    fade: 2,
    type: "driver",
    isNewRelease: true
  },
  {
    id: 2,
    name: "Treasure Hunt",
    imageSrc: treasureHuntDisc,
    description: "The ultimate treasure hunting disc for maximum distance with reliable fade. Perfect for open fairways and bomber shots.",
    speed: 12,
    glide: 6,
    turn: -1,
    fade: 3,
    type: "driver",
    isNewRelease: true
  },
  {
    id: 3,
    name: "Money Shot",
    imageSrc: moneyShotDisc,
    description: "When you need to nail that crucial approach shot, the Money Shot delivers consistent results every time.",
    speed: 4,
    glide: 3,
    turn: 1,
    fade: 3,
    type: "midrange",
    isNewRelease: true
  },
  {
    id: 4,
    name: "Jailbreak",
    imageSrc: jailbreakDisc,
    description: "Break free from conventional throws with this revolutionary disc. Flight numbers classified - experience the mystery yourself.",
    speed: "?",
    glide: "?",
    turn: "?",
    fade: "?",
    type: "driver",
    isNewRelease: true
  }
];

const Discs = () => {
  const [selectedType, setSelectedType] = useState("all");
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredDiscs = selectedType === "all" 
    ? discs 
    : discs.filter(disc => disc.type === selectedType);

  useEffect(() => {
    if (headerRef.current) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100");
            e.target.classList.remove("opacity-0", "translate-y-10");
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(headerRef.current);
      
      return () => {
        if (headerRef.current) {
          observer.unobserve(headerRef.current);
        }
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Our Disc Collection
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover our lineup of premium disc golf equipment, engineered for performance
            and designed with our distinctive Lucky style.
          </p>
        </div>
      </section>
      
      {/* Disc Filtering Tabs */}
      <div className="py-8 bg-black/50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8 bg-black/30">
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedType("all")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                All Discs
              </TabsTrigger>
              <TabsTrigger 
                value="driver" 
                onClick={() => setSelectedType("driver")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                Drivers
              </TabsTrigger>
              <TabsTrigger 
                value="fairway" 
                onClick={() => setSelectedType("fairway")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                Fairway
              </TabsTrigger>
              <TabsTrigger 
                value="midrange" 
                onClick={() => setSelectedType("midrange")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                Mid-Range
              </TabsTrigger>
              <TabsTrigger 
                value="putter" 
                onClick={() => setSelectedType("putter")}
                className="data-[state=active]:bg-lucky-green data-[state=active]:text-black"
              >
                Putters
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDiscs.map((disc) => (
                  <ProductCard
                    key={disc.id}
                    imageSrc={disc.imageSrc}
                    name={disc.name}
                    description={disc.description}
                    speed={disc.speed}
                    glide={disc.glide}
                    turn={disc.turn}
                    fade={disc.fade}
                    isNewRelease={disc.isNewRelease}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="driver" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDiscs.map((disc) => (
                  <ProductCard
                    key={disc.id}
                    imageSrc={disc.imageSrc}
                    name={disc.name}
                    description={disc.description}
                    speed={disc.speed}
                    glide={disc.glide}
                    turn={disc.turn}
                    fade={disc.fade}
                    isNewRelease={disc.isNewRelease}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="fairway" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDiscs.map((disc) => (
                  <ProductCard
                    key={disc.id}
                    imageSrc={disc.imageSrc}
                    name={disc.name}
                    description={disc.description}
                    speed={disc.speed}
                    glide={disc.glide}
                    turn={disc.turn}
                    fade={disc.fade}
                    isNewRelease={disc.isNewRelease}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="midrange" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDiscs.map((disc) => (
                  <ProductCard
                    key={disc.id}
                    imageSrc={disc.imageSrc}
                    name={disc.name}
                    description={disc.description}
                    speed={disc.speed}
                    glide={disc.glide}
                    turn={disc.turn}
                    fade={disc.fade}
                    isNewRelease={disc.isNewRelease}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="putter" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDiscs.map((disc) => (
                  <ProductCard
                    key={disc.id}
                    imageSrc={disc.imageSrc}
                    name={disc.name}
                    description={disc.description}
                    speed={disc.speed}
                    glide={disc.glide}
                    turn={disc.turn}
                    fade={disc.fade}
                    isNewRelease={disc.isNewRelease}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Understanding Flight Numbers */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading mb-6 text-center">
              Understanding Disc Flight Numbers
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-4 text-lucky-green">Speed & Glide</h3>
                <p className="mb-4 text-gray-300">
                  <strong>Speed (1-14):</strong> Indicates how much force is required to make the disc fly as intended.
                  Higher numbers need more power and are typically distance drivers.
                </p>
                <p className="text-gray-300">
                  <strong>Glide (1-7):</strong> Represents a disc's ability to maintain loft during flight.
                  Higher glide helps discs fly farther with less effort.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-heading mb-4 text-lucky-green">Turn & Fade</h3>
                <p className="mb-4 text-gray-300">
                  <strong>Turn (-5 to 1):</strong> The tendency of a disc to turn right (for right-handed backhand throws) 
                  during the high-speed portion of flight. Lower numbers mean more turn.
                </p>
                <p className="text-gray-300">
                  <strong>Fade (0-5):</strong> The disc's tendency to hook left (for right-handed backhand throws)
                  at the end of flight. Higher numbers indicate a stronger fade.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Need help choosing the right disc for your game?
              </p>
              <Button 
                className="mt-4 bg-lucky-green text-black hover:bg-white hover:text-black"
                onClick={() => window.location.href = '/disc-guide'}
              >
                Disc Selection Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Discs;
