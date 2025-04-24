
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getImagePlaceholder, fixImageExtension } from '@/utils/imageUtils';

export const useProductImageManager = (product: Product | null, selectedColor: string) => {
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Função para obter placeholder com base na categoria
  const getPlaceholder = (category: string = '') => {
    return getImagePlaceholder(category);
  };

  // Efeito para atualizar imagens quando o produto ou a cor muda
  useEffect(() => {
    if (!product) {
      setCurrentImages([]);
      return;
    }
    
    let productImages: string[] = [];
    
    // Extrai imagens com base no tipo de dados disponível
    if (product.images) {
      // Caso 1: Objeto com cores como chaves
      if (!Array.isArray(product.images)) {
        // Se temos a cor selecionada no objeto de imagens
        if (selectedColor && product.images[selectedColor]) {
          productImages = product.images[selectedColor];
          console.log(`Loading ${productImages.length} images for product ${product.id} with color ${selectedColor}`);
        } 
        // Senão, pega a primeira cor disponível
        else if (Object.keys(product.images).length > 0) {
          const firstColor = Object.keys(product.images)[0];
          productImages = product.images[firstColor];
          console.log(`No images for color ${selectedColor}, using first available color ${firstColor}`);
        }
      } 
      // Caso 2: Array simples de imagens
      else if (Array.isArray(product.images)) {
        productImages = product.images;
        console.log(`Loading ${productImages.length} images from array for product ${product.id}`);
      }
    }
    
    // Caso 3: URL única
    if (productImages.length === 0 && product.imageUrl) {
      productImages = [product.imageUrl];
      console.log(`Using single imageUrl for product ${product.id}: ${product.imageUrl}`);
    }
    
    // Caso especial para produto 204
    if (product.id === 204) {
      // Forçar uma imagem específica
      productImages = ["/lovable-uploads/77ef9243-1485-4e45-b51d-6e05b692b7e7.png"];
      console.log(`Special case for product 204`);
    }

    // Garante que todas as URLs de imagem são válidas
    const fixedImages = productImages.map(img => fixImageExtension(img)).filter(Boolean);
    
    setCurrentImages(fixedImages);
    setActiveImageIndex(0);
    
    console.log(`Final images for product ${product.id}:`, fixedImages);
  }, [product, selectedColor]);

  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getPlaceholder
  };
};
