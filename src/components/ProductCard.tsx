
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  imageSrc: string;
  name: string;
  description: string;
  speed: number | string;
  glide: number | string;
  turn: number | string;
  fade: number | string;
  isNewRelease?: boolean;
}

const ProductCard = ({ 
  imageSrc, 
  name, 
  description, 
  speed, 
  glide, 
  turn, 
  fade, 
  isNewRelease = false 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Add page-specific SEO meta tags
  useEffect(() => {
    const existingMeta = document.querySelector('meta[name="description"]');
    if (existingMeta && !existingMeta.getAttribute('data-page-specific')) {
      existingMeta.setAttribute('content', 'Premium Lucky Discs collection featuring ' + name + ' and other high-performance disc golf equipment. Modern design meets tournament-level quality.');
    }
  }, [name]);

  return (
    <Card 
      className="disc-card overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group hover:shadow-lg hover:shadow-lucky-green/20 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 sm:p-6 relative flex flex-col h-full">
        {isNewRelease && (
          <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-lucky-green text-black font-medium">
            New Release
          </Badge>
        )}
        
        <div className="mb-4 sm:mb-6 relative flex justify-center flex-grow">
          <img 
            src={imageSrc} 
            alt={`${name} disc golf disc - Speed: ${speed}, Glide: ${glide}, Turn: ${turn}, Fade: ${fade}`} 
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain disc-image transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black/20 rounded-full blur-md disc-shadow transition-all duration-500"></div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-heading tracking-wide text-center mb-2 text-white font-semibold drop-shadow-lg">{name}</h3>
        
        <p className="text-center text-gray-400 mb-4 line-clamp-2 h-12 text-sm sm:text-base">
          {description}
        </p>
        
        <div className="flex justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <div className="text-center">
            <span className="text-xs text-gray-400">Speed</span>
            <p className="text-lg sm:text-xl font-heading text-white">{speed}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">Glide</span>
            <p className="text-lg sm:text-xl font-heading text-white">{glide}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">Turn</span>
            <p className="text-lg sm:text-xl font-heading text-white">{turn}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">Fade</span>
            <p className="text-lg sm:text-xl font-heading text-white">{fade}</p>
          </div>
        </div>
        
        <Button className="w-full bg-lucky-green hover:bg-white text-black transition-all mt-auto">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
