
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
          <div className="lg:w-1/2 text-white mb-12 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-lucky-green">MODERN DISCS.</span><br />
              <span>WILD STYLE.</span><br />
              <span>LUCKY THROWS.</span>
            </h1>
            <p className="text-xl mb-8 text-gray-300 max-w-lg">
              Premium disc golf equipment designed with style and engineered for power. 
              For players who want to stand out and perform at their best.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-lucky-green text-black hover:bg-white hover:text-black transition-all text-lg px-8 py-6"
                onClick={() => navigate('/wholesale')}
              >
                Get Wholesale Access
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black transition-all text-lg px-8 py-6"
                onClick={() => navigate('/discs')}
              >
                Explore Our Discs
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="relative">
              <div className="animate-float">
                <img 
                  src="/lovable-uploads/a0e4d1ed-42e7-46bc-bc28-313aebe1023a.png" 
                  alt="Lucky Discs Collection" 
                  className="max-w-full h-auto relative z-10"
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4/5 h-10 bg-black/20 rounded-full blur-md disc-shadow transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
