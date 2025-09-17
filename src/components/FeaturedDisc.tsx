import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const FeaturedDisc = () => {
  const navigate = useNavigate();

  return (
    <section className="relative -mt-20 z-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-black/90 via-black/95 to-black/90 backdrop-blur-sm rounded-2xl border border-primary/20 overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Image Section */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex justify-center relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
                <img 
                  src="/src/assets/treasure-hunt-disc.png" 
                  alt="Treasure Hunt - Featured Disc" 
                  className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-2xl"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/40 rounded-full blur-lg"></div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="lg:w-1/2 p-8 lg:p-12 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Star className="w-5 h-5 text-accent fill-current" />
                <span className="text-sm font-medium text-accent uppercase tracking-wide">
                  Featured Disc
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading mb-4 text-primary">
                Treasure Hunt
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0">
                Our signature mid-range disc with exceptional glide and reliable fade. 
                Perfect for controlled shots and consistent performance on every throw.
              </p>
              
              {/* Flight Numbers */}
              <div className="flex justify-center lg:justify-start gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-xs text-muted-foreground uppercase">Speed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-xs text-muted-foreground uppercase">Glide</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">-0.5</div>
                  <div className="text-xs text-muted-foreground uppercase">Turn</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1</div>
                  <div className="text-xs text-muted-foreground uppercase">Fade</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                  onClick={() => navigate('/discs')}
                >
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
                  onClick={() => navigate('/wholesale')}
                >
                  Wholesale Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDisc;