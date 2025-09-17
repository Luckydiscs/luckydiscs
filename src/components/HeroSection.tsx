
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-gradient min-h-[75vh] md:min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: 'url(/src/assets/disc-golf-sunset-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/60"></div>
      
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lucky-green/20 to-transparent absolute inset-0"></div>
      </div>
      
      {/* Animated discs in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-lucky-green/10 blur-xl animate-spin-slow"></div>
        <div className="absolute top-3/4 -right-20 w-60 h-60 rounded-full bg-lucky-gold/10 blur-xl animate-spin-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-foreground mb-12 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-white">
              <span className="text-primary">MODERN DISCS.</span><br />
              <span>WILD STYLE.</span><br />
              <span>LUCKY THROWS.</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-lg">
              Premium disc golf equipment designed with style and engineered for power. 
              For players who want to stand out and perform at their best.
            </p>
            
            {/* Navigation Guide */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-lg">
              <h3 className="text-lg font-semibold mb-4 text-lucky-green">What are you looking for?</h3>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <span className="text-lucky-green">📦</span>
                  <span><strong>Wholesale:</strong> Become a retailer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lucky-green">🥏</span>
                  <span><strong>Discs:</strong> Browse our collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lucky-green">🏆</span>
                  <span><strong>Team:</strong> Meet our players</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lucky-green">✨</span>
                  <span><strong>Brand:</strong> Our story</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-lucky-green text-black hover:bg-white hover:text-black px-8 font-semibold text-lg"
                onClick={() => navigate('/wholesale')}
              >
                🚀 Get Wholesale Access
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 bg-transparent text-lg"
                onClick={() => navigate('/discs')}
              >
                🥏 Explore Our Discs
              </Button>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <button 
                onClick={() => navigate('/team')} 
                className="text-white/70 hover:text-lucky-green transition-colors flex items-center gap-1"
              >
                🏆 Our Team
              </button>
              <button 
                onClick={() => navigate('/brand')} 
                className="text-white/70 hover:text-lucky-green transition-colors flex items-center gap-1"
              >
                ✨ Our Story
              </button>
              <button 
                onClick={() => navigate('/contact')} 
                className="text-white/70 hover:text-lucky-green transition-colors flex items-center gap-1"
              >
                📞 Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
