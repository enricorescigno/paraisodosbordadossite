import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: number | string;
  name: string;
  description?: string;
  imageUrl?: string;
  images?: string[] | Record<string, string[]>;
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
  showActionButton = true
}: ProductCardProps) => {
  const getPlaceholderImage = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('necessaire') || lowerName.includes('bolsa')) {
      return "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop";
    } else if (lowerName.includes('toalha')) {
      return "https://images.unsplash.com/photo-1563293815-7b9673b068a9?q=80&w=500&auto=format&fit=crop";
    } else if (lowerName.includes('camisa') || lowerName.includes('fardamento') || lowerName.includes('avental')) {
      return "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop";
    } else if (lowerName.includes('infantil') || lowerName.includes('fralda') || lowerName.includes('macacão') || lowerName.includes('manta')) {
      return "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop";
    } else if (lowerName.includes('bordado')) {
      return "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=500&auto=format&fit=crop";
    }
    return "/placeholder.svg";
  };

  const getImageUrl = () => {
    if (id === 204) {
      return "/lovable-uploads/77ef9243-1485-4e45-b51d-6e05b692b7e7.png"; 
    }
    
    if (Number(id) === 2010) {
      if (images && Array.isArray(images) && images.length > 5) {
        return images[5];
      }
      return "/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png";
    }
    
    if (Number(id) === 1004) {
      return "/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png";
    }
    
    if (Number(id) === 1005) {
      return "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png";
    }
    
    if (Number(id) === 2002 || Number(id) === 901) {
      return "/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png";
    }
    
    if (Number(id) === 2004 || Number(id) === 903) {
      return "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png";
    }
    
    if (Number(id) === 205 || Number(id) === 902) {
      return "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png";
    }
    
    if (Number(id) === 202) {
      return "/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png";
    }
    
    if (Number(id) === 203) {
      return "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png";
    }
    
    if (Number(id) === 206) {
      return "/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png";
    }
    
    if (Number(id) === 207) {
      return "/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png";
    }
    
    if (Number(id) === 208) {
      return "/lovable-uploads/6406277c-f290-4a94-abb0-24f098dd74c6.png";
    }
    
    if (images && typeof images === 'object' && !Array.isArray(images)) {
      const firstColor = Object.keys(images)[0];
      if (firstColor && Array.isArray(images[firstColor]) && images[firstColor].length > 0) {
        return images[firstColor][0];
      }
    }
    
    if (imageUrl) {
      return imageUrl;
    }
    
    if (images && Array.isArray(images) && images.length > 0) {
      return images[0];
    }
    
    return getPlaceholderImage(name);
  };

  const optimizedImageUrl = getImageUrl();
  
  React.useEffect(() => {
    console.log(`ProductCard ${id} (${name}) - Image source:`, optimizedImageUrl);
  }, [id, name, optimizedImageUrl]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
      whileHover={{
        y: -5,
        transition: {
          duration: 0.2
        }
      }}
      className="flex flex-col h-full w-full"
    >
      <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-4 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center">
        <motion.img
          src={optimizedImageUrl}
          alt={`Produto: ${name}`}
          className="w-full h-full object-cover object-center absolute inset-0 mix-blend-multiply"
          loading="lazy"
          whileHover={{
            scale: 1.05
          }}
          transition={{
            duration: 0.3
          }}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            console.error(`Image error for product ${id} (${name}):`, optimizedImageUrl);
            target.src = "/placeholder.svg";
          }}
        />
      </div>
      
      <div className="flex flex-col flex-grow w-full">
        <h3 className="text-xl md:text-2xl font-sans tracking-tight font-medium text-center mb-2">
          {name}
        </h3>
        
        {description && (
          <p className="text-center text-gray-500 mb-4 text-sm line-clamp-2 h-[2.5rem] overflow-hidden mx-auto max-w-[90%] md:text-sm">
            {description}
          </p>
        )}
      </div>
      
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
