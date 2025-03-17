
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: number | string;
  name: string;
  description?: string;
  imageUrl?: string;
  images?: any;
  colors?: string[];
  isNew?: boolean;
  whatsappNumber: string;
  isPortfolio?: boolean;
}

const ProductCard = ({ 
  id, 
  name, 
  description, 
  imageUrl, 
  images, 
  colors, 
  isNew, 
  whatsappNumber,
  isPortfolio = false
}: ProductCardProps) => {
  // Function to get the proper image
  const getImageUrl = () => {
    if (Number(id) === 204 && images && typeof images === 'object' && !Array.isArray(images)) {
      return images["Branco"]?.[0]; // Use first image of default color
    }
    
    return imageUrl || 
      (Array.isArray(images) ? images[0] : null) || 
      "https://via.placeholder.com/500x500?text=Sem+Imagem";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex flex-col items-center w-full max-w-[90%] mx-auto h-full"
    >
      <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-4 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300">
        <motion.img 
          src={getImageUrl()}
          alt={`Imagem do produto: ${name}`}
          className="w-full h-full object-contain mix-blend-multiply"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://via.placeholder.com/500x500?text=Sem+Imagem";
          }}
        />
        {(isNew || Number(id) === 204) && (
          <div className="absolute top-3 right-3">
            <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full font-medium">
              Novo
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow w-full">
        <h3 className="text-xl md:text-2xl font-sans tracking-tight font-medium text-center mb-2 px-4">
          {name}
        </h3>
        
        {description && (
          <p className="text-center text-gray-500 mb-4 max-w-md px-4 text-sm md:text-base line-clamp-2">
            {description}
          </p>
        )}
      </div>
      
      <div className="flex justify-center mt-auto w-full px-4">
        <Link to={`/produto/${id.toString()}`} className="w-full sm:w-auto" aria-label={`Ver detalhes de ${name}`}>
          <Button 
            variant="default" 
            size="lg" 
            className="rounded-full px-8 w-full min-h-[48px]"
          >
            {isPortfolio ? "Ver Detalhes" : "Saiba Mais"}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
