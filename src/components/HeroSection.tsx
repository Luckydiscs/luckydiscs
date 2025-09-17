
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
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
            <p className="text-xl mb-8 text-white/80 max-w-lg">
              Premium disc golf equipment designed with style and engineered for power. 
              For players who want to stand out and perform at their best.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold"
                onClick={() => navigate('/wholesale')}
              >
                Get Wholesale Access
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent"
                onClick={() => navigate('/discs')}
              >
                Explore Our Discs
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="relative">
              <div className="animate-float group">
                <img 
                  src="/src/assets/lucky-discs-hero-new.png" 
                  alt="Lucky Discs colorful disc golf collection with Slot Machine designs" 
                  className="max-w-full h-auto relative z-10 transition-all duration-700 group-hover:scale-105 group-hover:rotate-2 drop-shadow-2xl pointer-events-none select-none"
                  style={{
                    filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.4))',
                  }}
                />
              </div>
              {/* Animated glow effects */}
              <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lucky-gold/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-lucky-green/30 rounded-full blur-2xl animate-bounce"></div>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4/5 h-10 bg-black/30 rounded-full blur-md disc-shadow transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
