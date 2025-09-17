import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.png";
import bankRobberDisc from "@/assets/bank-robber-disc.png";
import moneyShotDisc from "@/assets/money-shot-disc.png";

const DiscGuide = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // SEO optimization
    document.title = "Disc Golf Guide - Learn Disc Golf Basics | Lucky Discs";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete disc golf guide for beginners. Learn flight numbers, disc types, throwing techniques and course strategy with Lucky Discs premium equipment.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Complete disc golf guide for beginners. Learn flight numbers, disc types, throwing techniques and course strategy with Lucky Discs premium equipment.';
      document.head.appendChild(newMeta);
    }

    // Add structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Guide",
      "name": "Complete Disc Golf Guide for Beginners",
      "description": "Learn disc golf basics including disc types, flight numbers, throwing techniques and course strategy",
      "author": {
        "@type": "Organization",
        "name": "Lucky Discs"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Lucky Discs"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-sans antialiased">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            Complete Disc Golf Guide
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Master the fundamentals of disc golf with our comprehensive guide. Learn everything from basic throws to advanced course strategy using Lucky Discs premium equipment.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="py-8 bg-black/30" aria-label="Guide navigation">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading mb-6 text-center text-white">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('disc-types')?.scrollIntoView({behavior: 'smooth'})}>
              🥏 Disc Types & Selection
            </Button>
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('flight-numbers')?.scrollIntoView({behavior: 'smooth'})}>
              📊 Understanding Flight Numbers
            </Button>
            <Button variant="secondary" className="text-left justify-start text-white border-white/20 hover:bg-lucky-green hover:text-black" onClick={() => document.getElementById('throwing-techniques')?.scrollIntoView({behavior: 'smooth'})}>
              💪 Throwing Techniques
            </Button>
          </div>
        </div>
      </nav>

      {/* Disc Types Section */}
      <section id="disc-types" className="py-16 bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Understanding Disc Types
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Drivers */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img src={treasureHuntDisc} alt="Treasure Hunt Driver Disc" className="w-20 h-20 object-contain" />
                  <div>
                    <CardTitle className="text-lucky-green">Distance Drivers</CardTitle>
                    <Badge variant="secondary">Speed 10-14</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Distance drivers are designed for maximum distance throws. They require significant arm speed 
                  to fly properly and are best suited for experienced players.
                </p>
                <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                  <h4 className="font-semibold text-lucky-green mb-2">Lucky Discs Recommendation:</h4>
                  <p><strong>Treasure Hunt</strong> - Our flagship distance driver with Speed 12, perfect for open fairways and maximum distance shots.</p>
                </div>
              </CardContent>
            </Card>

            {/* Control Drivers */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img src={bankRobberDisc} alt="Bank Robber Control Driver" className="w-20 h-20 object-contain" />
                  <div>
                    <CardTitle className="text-lucky-green">Control Drivers</CardTitle>
                    <Badge variant="secondary">Speed 7-9</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Control drivers offer a balance between distance and accuracy. They're more forgiving than 
                  distance drivers and suitable for intermediate players.
                </p>
                <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                  <h4 className="font-semibold text-lucky-green mb-2">Lucky Discs Recommendation:</h4>
                  <p><strong>Bank Robber</strong> - Versatile Speed 7 control driver that excels on technical fairways with reliable flight path.</p>
                </div>
              </CardContent>
            </Card>

            {/* Midrange */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img src={moneyShotDisc} alt="Money Shot Midrange Disc" className="w-20 h-20 object-contain" />
                  <div>
                    <CardTitle className="text-lucky-green">Midrange Discs</CardTitle>
                    <Badge variant="secondary">Speed 4-6</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Midrange discs are the workhorses of disc golf. They provide excellent control and accuracy 
                  for approach shots and are perfect for beginners to learn proper form.
                </p>
                <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                  <h4 className="font-semibold text-lucky-green mb-2">Lucky Discs Recommendation:</h4>
                  <p><strong>Money Shot</strong> - Reliable Speed 4 midrange that delivers consistent results for crucial approach shots.</p>
                </div>
              </CardContent>
            </Card>

            {/* Putters */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-lucky-green/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <CardTitle className="text-lucky-green">Putters</CardTitle>
                    <Badge variant="secondary">Speed 1-3</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Putters are designed for short, accurate throws near the basket. They have the most predictable 
                  flight paths and are essential for finishing holes successfully.
                </p>
                <div className="bg-lucky-green/10 p-4 rounded-lg border border-lucky-green/20">
                  <h4 className="font-semibold text-lucky-green mb-2">Lucky Discs Recommendation:</h4>
                  <p><strong>Slot Machine</strong> - Our signature putter with incredible grip and accuracy for reliable basket approaches.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Flight Numbers Section */}
      <section id="flight-numbers" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Mastering Flight Numbers
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-12 text-center">
              Every disc has four flight numbers that describe its flight characteristics. Understanding these 
              numbers is crucial for selecting the right disc for each shot.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Speed (1-14)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    Speed indicates how much force is required to make the disc fly as intended. Higher speed 
                    discs require more arm strength but can achieve greater distances.
                  </p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <strong>Beginner:</strong> Speed 1-6 (Putters & Midrange)<br/>
                      <strong>Intermediate:</strong> Speed 7-9 (Control Drivers)<br/>
                      <strong>Advanced:</strong> Speed 10+ (Distance Drivers)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green flex items-center gap-2">
                    <span className="text-2xl">🪶</span>
                    Glide (1-7)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    Glide represents a disc's ability to maintain loft during flight. Higher glide numbers 
                    help discs fly farther with less effort, perfect for newer players.
                  </p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <strong>Low Glide (1-3):</strong> More predictable, wind resistant<br/>
                      <strong>High Glide (5-7):</strong> Longer flights, less effort required
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green flex items-center gap-2">
                    <span className="text-2xl">↪️</span>
                    Turn (-5 to 1)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    Turn describes the disc's tendency to curve right (for right-handed backhand throws) during 
                    the high-speed portion of flight. Negative numbers indicate more turn.
                  </p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <strong>Overstable (0 to 1):</strong> Resists turning, reliable<br/>
                      <strong>Understable (-1 to -5):</strong> Turns right, adds distance
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green flex items-center gap-2">
                    <span className="text-2xl">↩️</span>
                    Fade (0-5)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    Fade is the disc's tendency to hook left (for right-handed backhand throws) at the end 
                    of flight as it slows down. Higher numbers indicate stronger fade.
                  </p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">
                      <strong>Low Fade (0-1):</strong> Straighter finish<br/>
                      <strong>High Fade (3-5):</strong> Strong left hook, reliable finish
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Throwing Techniques */}
      <section id="throwing-techniques" className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Essential Throwing Techniques
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Backhand Throw</CardTitle>
                  <Badge variant="outline">Most Common</Badge>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">The fundamental disc golf throw, similar to throwing a frisbee.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Grip the disc with four fingers underneath</li>
                    <li>• Step forward with opposite foot</li>
                    <li>• Pull disc across your body</li>
                    <li>• Release with a snap of the wrist</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Forehand Throw</CardTitle>
                  <Badge variant="outline">Advanced</Badge>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">Also called sidearm, thrown from the side of the body.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Grip with two fingers on the rim</li>
                    <li>• Keep disc flat and stable</li>
                    <li>• Throw with wrist snap motion</li>
                    <li>• Great for getting around obstacles</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Overhand Throws</CardTitle>
                  <Badge variant="outline">Specialty</Badge>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">Thrown overhead for unique flight paths and obstacle avoidance.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Tomahawk: Overhand backhand grip</li>
                    <li>• Thumber: Overhand forehand grip</li>
                    <li>• Useful for getting over trees</li>
                    <li>• Creates dramatic flight patterns</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Strategy */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Course Strategy & Tips
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Beginner Strategy</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-3">
                    <li>• Start with stable, lower speed discs</li>
                    <li>• Focus on accuracy over distance</li>
                    <li>• Practice putting extensively</li>
                    <li>• Learn one throw type well before others</li>
                    <li>• Play safe shots to avoid penalties</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lucky-green">Advanced Strategy</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-3">
                    <li>• Study hole layouts and wind conditions</li>
                    <li>• Carry multiple disc types and plastics</li>
                    <li>• Master both backhand and forehand</li>
                    <li>• Learn to shape shots around obstacles</li>
                    <li>• Practice different putting styles</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-black via-lucky-green/10 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-6">
            Ready to Start Your Disc Golf Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Browse our complete collection of premium disc golf equipment, designed for players of all skill levels. Visit our <button className="text-lucky-green underline hover:text-white transition-colors" onClick={() => navigate('/team')}>professional team page</button> to see Lucky Discs in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-lucky-green text-black hover:bg-white hover:text-black font-semibold"
              onClick={() => navigate('/discs')}
            >
              Shop Our Discs
            </Button>
            <Button 
              size="lg"
              variant="secondary"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-semibold"
              onClick={() => navigate('/wholesale')}
            >
              Wholesale Inquiry
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiscGuide;