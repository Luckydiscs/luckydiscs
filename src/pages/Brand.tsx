
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Brand = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-green/5 via-transparent to-lucky-green/5"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          <img 
            src="/src/assets/lucky-discs-transparent-logo.png" 
            alt="Lucky Discs Logo" 
            className="w-40 h-40 mx-auto mb-8 animate-float drop-shadow-2xl"
          />
          
          <h1 className="text-6xl md:text-7xl font-heading mb-6 bg-gradient-to-r from-white via-lucky-green to-white bg-clip-text text-transparent">
            The <span className="text-lucky-green">Lucky</span> Story
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            More than just disc golf equipment - Lucky Discs represents bold style, 
            premium performance, and the thrill of the perfect throw. We're revolutionizing disc golf with cutting-edge designs and unmatched quality.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-lucky-green">2022</div>
              <div className="text-sm text-gray-400">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lucky-green">50+</div>
              <div className="text-sm text-gray-400">Retailers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lucky-green">1000+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
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
                How It All <span className="text-lucky-green">Began</span>
              </h2>
              
              <div className="space-y-6 text-lg">
                <p className="text-gray-300">
                  <span className="text-lucky-green font-semibold">Founded in 2022</span> by a group of passionate disc golf enthusiasts with backgrounds in design and manufacturing, 
                  Lucky Discs emerged from a desire to bring more style and character to the sport we love.
                </p>
                
                <p className="text-gray-300">
                  We noticed that while disc golf was <span className="text-white font-semibold">growing rapidly</span>, the visual design of discs hadn't evolved much. 
                  That's when we decided to combine <span className="text-lucky-green font-semibold">premium performance</span> with bold, distinctive designs that give players 
                  a way to express themselves on the course.
                </p>
                
                <div className="bg-gradient-to-r from-lucky-green/10 to-transparent p-6 rounded-lg border-l-4 border-lucky-green">
                  <p className="text-white font-medium">
                    "Our name and logo represent both the element of luck that exists in every round of disc golf, 
                    and our belief that the more you play and practice, the luckier you get."
                  </p>
                  <p className="text-lucky-green mt-2 text-sm">- Lucky Discs Founders</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/src/assets/daniel-davidsson.png" 
                alt="Professional disc golf player" 
                className="rounded-lg shadow-2xl max-w-full mx-auto"
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-12 bg-lucky-green/30 rounded-full blur-2xl"></div>
              <div className="absolute top-4 right-4 bg-lucky-green text-black px-4 py-2 rounded-full font-bold text-sm">
                Pro Team
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
              Why Choose <span className="text-lucky-green">Lucky Discs</span>?
            </h2>
            <p className="text-gray-300 text-center mb-16 text-xl max-w-3xl mx-auto">
              We don't just make discs - we craft experiences that elevate your game and express your style.
            </p>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 translate-y-20 transition-all duration-1000"
              ref={(el) => (sectionRefs.current[1] = el)}
            >
              <div className="bg-gradient-to-b from-lucky-green/10 to-black/30 p-8 rounded-xl border border-lucky-green/20 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black font-bold text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-heading mb-4 text-white">Bold Innovation</h3>
                <p className="text-gray-300 mb-4">
                  We're not afraid to push the boundaries of disc design, both visually and technically, 
                  to create products that stand out and perform.
                </p>
                <div className="text-lucky-green font-semibold">Premium Materials + Cutting-Edge Design</div>
              </div>
              
              <div className="bg-gradient-to-b from-lucky-green/10 to-black/30 p-8 rounded-xl border border-lucky-green/20 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black font-bold text-2xl">🏆</span>
                </div>
                <h3 className="text-2xl font-heading mb-4 text-white">Quality First</h3>
                <p className="text-gray-300 mb-4">
                  We never compromise on materials or manufacturing. Every disc that bears the Lucky logo 
                  is crafted to exacting standards.
                </p>
                <div className="text-lucky-green font-semibold">Tournament-Grade Performance</div>
              </div>
              
              <div className="bg-gradient-to-b from-lucky-green/10 to-black/30 p-8 rounded-xl border border-lucky-green/20 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-lucky-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black font-bold text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-heading mb-4 text-white">Community Growth</h3>
                <p className="text-gray-300 mb-4">
                  We're committed to growing the sport by supporting events, players, and initiatives 
                  that bring more people to disc golf.
                </p>
                <div className="text-lucky-green font-semibold">Player Sponsorships + Tournament Support</div>
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
                  src="/lovable-uploads/682fc2dd-badc-4562-8574-aaab40a86d03.png" 
                  alt="Blue Bank Robber Disc" 
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src="/lovable-uploads/4c26d096-cfa9-4173-afe7-93b4f8b28426.png" 
                  alt="Pink Bank Robber Disc" 
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src="/lovable-uploads/f2a202e9-26ab-435b-bcf0-d30e31980a8b.png" 
                  alt="Treasure Hunt Disc" 
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src="/lovable-uploads/6c56f0b3-a367-4e99-b234-5ce2b5e8c32c.png" 
                  alt="Gold Treasure Hunt Disc" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-heading mb-6">
                Our Design <span className="text-lucky-green">Philosophy</span>
              </h2>
              
              <p className="text-gray-300 mb-4">
                Every Lucky disc tells a story. Our design aesthetic draws inspiration from casino gaming, 
                western themes, and treasure-hunting adventures - all combined with the technical precision 
                required for disc golf equipment.
              </p>
              
              <p className="text-gray-300 mb-4">
                Each model features meticulously crafted artwork that complements the disc's purpose. 
                The Bank Robber driver conveys speed and boldness, while the Treasure Hunt mid-range 
                suggests accuracy and exploration.
              </p>
              
              <p className="text-gray-300">
                We use a distinctive color palette with vibrant base colors and contrasting stamps 
                to ensure our discs are not just functional but also visually striking on the course.
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
              Sponsorships & <span className="text-lucky-green">Community</span>
            </h2>
            
            <p className="text-gray-300 text-center mb-10 max-w-3xl mx-auto">
              Lucky Discs is proud to support the disc golf community through player sponsorships, 
              tournament partnerships, and local course development initiatives.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-4">Player Sponsorships</h3>
                <p className="text-gray-400 mb-4">
                  We sponsor players at all levels, from up-and-coming talents to established professionals. 
                  Our team represents the brand's values both on and off the course.
                </p>
                <p className="text-gray-400">
                  Interested in joining Team Lucky? We review applications quarterly.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-heading mb-4">Tournament Support</h3>
                <p className="text-gray-400 mb-4">
                  Lucky Discs sponsors tournaments across the country, providing custom discs, 
                  merchandise, and prize packages to support the competitive scene.
                </p>
                <p className="text-gray-400">
                  Planning an event? We'd love to discuss partnership opportunities.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/contact">
                <Button className="bg-lucky-green text-black hover:bg-white hover:text-black">
                  Contact Us About Partnerships <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-lucky-green text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            Join the Lucky Family
          </h2>
          <p className="text-black/80 max-w-2xl mx-auto mb-8 text-lg">
            Whether you're a player, retailer, or event organizer, we'd love to collaborate with you.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/discs">
              <Button className="bg-black text-white hover:bg-white hover:text-black">
                Shop Our Discs
              </Button>
            </Link>
            
            <Link to="/wholesale">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Become a Retailer
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Brand;
