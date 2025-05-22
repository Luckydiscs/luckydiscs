
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
      <section className="pt-32 pb-20 bg-black relative">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/lovable-uploads/e7e6ee87-35bb-4435-9449-5b810a26bb17.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(3px)'
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <img 
            src="/lovable-uploads/e7e6ee87-35bb-4435-9449-5b810a26bb17.png" 
            alt="Lucky Discs Logo" 
            className="w-32 h-32 mx-auto mb-8 animate-float"
          />
          
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            The <span className="text-lucky-green">Lucky</span> Story
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            More than just disc golf equipment - Lucky Discs represents bold style, 
            premium performance, and the thrill of the perfect throw.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center opacity-0 translate-y-20 transition-all duration-1000"
            ref={(el) => (sectionRefs.current[0] = el)}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-heading mb-6">
                How It All <span className="text-lucky-green">Began</span>
              </h2>
              
              <p className="text-gray-300 mb-4">
                Founded in 2022 by a group of passionate disc golf enthusiasts with backgrounds in design and manufacturing, 
                Lucky Discs emerged from a desire to bring more style and character to the sport we love.
              </p>
              
              <p className="text-gray-300 mb-4">
                We noticed that while disc golf was growing rapidly, the visual design of discs hadn't evolved much. 
                That's when we decided to combine premium performance with bold, distinctive designs that give players 
                a way to express themselves on the course.
              </p>
              
              <p className="text-gray-300">
                Our name and logo represent both the element of luck that exists in every round of disc golf, 
                and our belief that the more you play and practice, the luckier you get.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/8ae2dde2-ac3a-4144-9b11-35d02bc07d57.png" 
                alt="Lucky Discs in action" 
                className="rounded-lg shadow-xl max-w-full mx-auto"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-lucky-green/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Brand Values */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading mb-12 text-center">
              Our Brand <span className="text-lucky-green">Values</span>
            </h2>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 translate-y-20 transition-all duration-1000"
              ref={(el) => (sectionRefs.current[1] = el)}
            >
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
                <h3 className="text-xl font-heading mb-4">Bold Innovation</h3>
                <div className="w-16 h-1 bg-lucky-green mx-auto mb-4"></div>
                <p className="text-gray-400">
                  We're not afraid to push the boundaries of disc design, both visually and technically, 
                  to create products that stand out and perform.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
                <h3 className="text-xl font-heading mb-4">Quality First</h3>
                <div className="w-16 h-1 bg-lucky-green mx-auto mb-4"></div>
                <p className="text-gray-400">
                  We never compromise on materials or manufacturing. Every disc that bears the Lucky logo 
                  is crafted to exacting standards.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
                <h3 className="text-xl font-heading mb-4">Community Growth</h3>
                <div className="w-16 h-1 bg-lucky-green mx-auto mb-4"></div>
                <p className="text-gray-400">
                  We're committed to growing the sport by supporting events, players, and initiatives 
                  that bring more people to disc golf.
                </p>
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
