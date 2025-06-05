
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toAbsoluteURL } from '@/utils/urlUtils';

interface ProductImageProps {
  id: number | string;
  name: string;
  imageUrl?: string;
  images?: any;
}

const ProductImage = ({ id, name, imageUrl, images }: ProductImageProps) => {
  const [useContainFallback, setUseContainFallback] = useState(false);

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
    // Special cases for specific product IDs
    if (Number(id) === 2010) {
      if (images && Array.isArray(images) && images.length > 5) {
        return toAbsoluteURL(images[5]);
      }
      return toAbsoluteURL("/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png");
    }
    
    if (Number(id) === 1004) {
      if (images && Array.isArray(images) && images.length > 0) {
        return toAbsoluteURL("/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png");
      }
    }
    
    if (Number(id) === 1005) {
      if (images && Array.isArray(images) && images.length > 0) {
        return toAbsoluteURL("/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png");
      }
    }
    
    if (Number(id) === 2002 || Number(id) === 901) {
      return toAbsoluteURL("/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png");
    }
    
    if (Number(id) === 2004 || Number(id) === 903) {
      return toAbsoluteURL("/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png");
    }
    
    if (Number(id) === 205 || Number(id) === 902) {
      return toAbsoluteURL("/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png");
    }
    
    if (Number(id) === 202) {
      return toAbsoluteURL("/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png");
    }
    
    if (Number(id) === 203) {
      return toAbsoluteURL("/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png");
    }
    
    if (Number(id) === 204) {
      return toAbsoluteURL("/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png");
    }
    
    if (Number(id) === 206) {
      return toAbsoluteURL("/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png");
    }
    
    if (Number(id) === 207) {
      return toAbsoluteURL("/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png");
    }
    
    if (Number(id) === 208) {
      return toAbsoluteURL("/lovable-uploads/6406277c-f290-4a94-abb0-24f098dd74c6.png");
    }
    
    if (Number(id) === 204 && images && typeof images === 'object' && !Array.isArray(images)) {
      return images["Branco"]?.[0] ? toAbsoluteURL(images["Branco"][0]) : null;
    }
    
    // Handle missing images with proper fallbacks
    if (!imageUrl && (!images || (Array.isArray(images) && images.length === 0))) {
      return getPlaceholderImage(name);
    }
    
    // First try to use the specified imageUrl
    if (imageUrl) {
      return toAbsoluteURL(imageUrl);
    }
    
    // Then try the first image in the images array if available
    if (Array.isArray(images) && images.length > 0) {
      return toAbsoluteURL(images[0]);
    }
    
    // Final fallback
    return "https://via.placeholder.com/500x500?text=Sem+Imagem";
  };

  const optimizedImageUrl = getImageUrl();

  return (
    <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-4 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full h-full aspect-square overflow-hidden" style={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}>
        <motion.img
          src={optimizedImageUrl}
          alt={`Produto: ${name}`}
          className={`w-full h-full ${useContainFallback ? 'object-contain' : 'object-cover'} object-center mix-blend-multiply`}
          loading="lazy"
          whileHover={{
            scale: 1.05
          }}
          transition={{
            duration: 0.3
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            setUseContainFallback(true);
            target.style.objectFit = 'contain';
            target.src = getPlaceholderImage(name);
          }}
        />
      </div>
    </div>
  );
};

export default ProductImage;
