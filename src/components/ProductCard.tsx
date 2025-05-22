
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  imageSrc: string;
  name: string;
  description: string;
  speed: number;
  glide: number;
  turn: number;
  fade: number;
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

  return (
    <Card 
      className="disc-card overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group hover:shadow-lg hover:shadow-lucky-green/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 relative">
        {isNewRelease && (
          <Badge className="absolute top-4 right-4 z-10 bg-lucky-green text-black font-medium">
            New Release
          </Badge>
        )}
        
        <div className="mb-6 relative flex justify-center">
          <img 
            src={imageSrc} 
            alt={name} 
            className="w-64 h-64 object-contain disc-image transition-all duration-500"
          />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black/20 rounded-full blur-md disc-shadow transition-all duration-500"></div>
        </div>
        
        <h3 className="text-2xl font-heading tracking-wide text-center mb-2">{name}</h3>
        
        <p className="text-center text-gray-400 mb-4 line-clamp-2 h-12">
          {description}
        </p>
        
        <div className="flex justify-center space-x-4 mb-6">
          <div className="text-center">
            <span className="text-xs text-gray-400">Speed</span>
            <p className="text-xl font-heading text-white">{speed}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">Glide</span>
            <p className="text-xl font-heading text-white">{glide}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">Turn</span>
            <p className="text-xl font-heading text-white">{turn}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">Fade</span>
            <p className="text-xl font-heading text-white">{fade}</p>
          </div>
        </div>
        
        <Button className="w-full bg-lucky-green hover:bg-white text-black transition-all">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
