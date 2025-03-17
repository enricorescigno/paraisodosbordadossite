
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
      className="flex flex-col items-center"
    >
      <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-4 overflow-hidden relative">
        <img 
          src={getImageUrl()}
          alt={name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
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
      
      <h3 className="text-xl md:text-2xl font-sans tracking-tight font-medium text-center mb-2">
        {name}
      </h3>
      
      {description && (
        <p className="text-center text-gray-500 mb-4 max-w-md">
          {description.length > 100 
            ? `${description.substring(0, 100)}...` 
            : description}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2 w-full">
        <Link to={`/produto/${id}`} className="w-full sm:w-auto">
          <Button 
            variant="default" 
            size="lg" 
            className="rounded-full px-8 w-full sm:w-auto min-h-[44px]"
          >
            {isPortfolio ? "Ver Detalhes" : "Saiba Mais"}
          </Button>
        </Link>
        
        <a 
          href={`https://wa.me/${whatsappNumber}?text=Olá! Vi o produto ${name} ${isPortfolio ? "no portfólio" : ""} e gostaria de ${isPortfolio ? "solicitar um orçamento" : "fazer um orçamento"}!`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 w-full sm:w-auto min-h-[44px]"
          >
            Solicitar Orçamento
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
