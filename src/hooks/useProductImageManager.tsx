
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getImagePlaceholder, fixImageExtension, cacheImagesInBrowser } from '@/utils/imageUtils';

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
    
    // Log para debug
    console.log(`Trying to load images for product ${product.id} (${product.name}) in category ${product.category}`);
    
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
    
    // Verificação especial para produtos da categoria 'Cama'
    if (product.category.toLowerCase().includes('cama')) {
      console.log(`Special handling for 'Cama' category product ${product.id}`);
      
      // Se ainda não temos imagens, tenta extrair do campo imageUrl
      if (productImages.length === 0 && product.imageUrl) {
        productImages = [product.imageUrl];
        console.log(`Using imageUrl for 'Cama' product: ${product.imageUrl}`);
      }
      
      // Verificação de IDs específicos da categoria 'Cama' que podem precisar de tratamento especial
      if (product.id === 501 || product.id === 502 || product.id === 503) {
        console.log(`Found special cama product ID: ${product.id}`);
      }
    }
    
    // Garante que todas as URLs de imagem são válidas
    const fixedImages = productImages
      .map(img => fixImageExtension(img))
      .filter(Boolean) as string[];
    
    // Se ainda não temos imagens, usa o placeholder
    if (fixedImages.length === 0) {
      const placeholder = getImagePlaceholder(product.category);
      console.log(`No images found for product ${product.id}, using placeholder for category ${product.category}: ${placeholder}`);
      fixedImages.push(placeholder);
    }
    
    setCurrentImages(fixedImages);
    setActiveImageIndex(0);
    
    // Pre-cache para melhor performance
    if (fixedImages.length > 0) {
      cacheImagesInBrowser(fixedImages);
    }
    
    console.log(`Final images for product ${product.id}:`, fixedImages);
  }, [product, selectedColor]);

  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getPlaceholder
  };
};
