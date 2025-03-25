
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
  showActionButton?: boolean;
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
  isPortfolio = false,
  showActionButton = true // Adicionado parâmetro para controlar a exibição do botão
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
  
  // Get optimized image URL
  const optimizedImageUrl = getImageUrl();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex flex-col h-full w-full"
    >
      <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-4 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300">
        <motion.img 
          src={optimizedImageUrl}
          alt={`Produto: ${name}`}
          className="w-full h-full object-contain mix-blend-multiply"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
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
        <h3 className="text-xl md:text-2xl font-sans tracking-tight font-medium text-center mb-2">
          {name}
        </h3>
        
        {description && (
          <p className="text-center text-gray-500 mb-4 text-sm md:text-base line-clamp-2 h-[2.5rem] overflow-hidden mx-auto max-w-[90%]">
            {description}
          </p>
        )}
      </div>
      
      {/* Renderizar o botão apenas se showActionButton for true */}
      {showActionButton && (
        <div className="flex justify-center mt-auto w-full">
          <Link to={`/produto/${id}`} className="w-full sm:w-auto flex justify-center">
            <Button 
              variant="default" 
              size="lg" 
              className="rounded-full px-8 w-full max-w-[200px] min-h-[48px]"
              aria-label={`Ver detalhes de ${name}`}
            >
              {isPortfolio ? "Ver Detalhes" : "Saiba Mais"}
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
