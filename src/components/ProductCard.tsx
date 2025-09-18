
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Add page-specific SEO meta tags
  useEffect(() => {
    const existingMeta = document.querySelector('meta[name="description"]');
    if (existingMeta && !existingMeta.getAttribute('data-page-specific')) {
      existingMeta.setAttribute('content', 'Premium Lucky Discs collection featuring ' + name + ' and other high-performance disc golf equipment. Modern design meets tournament-level quality.');
    }
  }, [name]);

  const isDescriptionLong = description.length > 100;

  return (
    <Card 
      className="disc-card overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group hover:shadow-lg hover:shadow-lucky-green/20 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 sm:p-6 relative flex flex-col h-full">
        {isNewRelease && (
          <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-lucky-green text-black font-medium">
            {t('productCard.newRelease')}
          </Badge>
        )}
        
        <div className="mb-4 sm:mb-6 relative flex justify-center flex-grow">
          <img 
            src={imageSrc} 
            alt={`${name} disc golf disc - ${t('productCard.speed')}: ${speed}, ${t('productCard.glide')}: ${glide}, ${t('productCard.turn')}: ${turn}, ${t('productCard.fade')}: ${fade}`} 
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain disc-image transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black/20 rounded-full blur-md disc-shadow transition-all duration-500"></div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-heading tracking-wide text-center mb-2 text-white font-semibold drop-shadow-lg">{name}</h3>
        
        <div className="text-center text-gray-400 mb-4 text-sm sm:text-base">
          <p className={!isExpanded && isDescriptionLong ? "line-clamp-2" : ""}>
            {description}
          </p>
          {isDescriptionLong && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-lucky-green hover:text-white transition-colors mt-1 text-sm font-medium"
            >
              {isExpanded ? t('productCard.readLess') : t('productCard.readMore')}
            </button>
          )}
        </div>
        
        <div className="flex justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <div className="text-center">
            <span className="text-xs text-gray-400">{t('productCard.speed')}</span>
            <p className="text-lg sm:text-xl font-heading text-white">{speed}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">{t('productCard.glide')}</span>
            <p className="text-lg sm:text-xl font-heading text-white">{glide}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">{t('productCard.turn')}</span>
            <p className="text-lg sm:text-xl font-heading text-white">{turn}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400">{t('productCard.fade')}</span>
            <p className="text-lg sm:text-xl font-heading text-white">{fade}</p>
          </div>
        </div>
        
        <Button 
          className="w-full bg-lucky-green hover:bg-white text-black transition-all mt-auto"
          onClick={() => navigate('/wholesale')}
        >
          {t('productCard.getWholesaleInfo')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
