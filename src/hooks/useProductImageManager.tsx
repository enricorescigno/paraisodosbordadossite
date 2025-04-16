
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export const colorToImageMap: Record<string, string[]> = {
  "Branco": ["/lovable-uploads/9abf1240-1fa3-432f-984b-3021528d165d.png"],
  "Dourado": ["/lovable-uploads/7df18d21-e4ed-468f-b727-826aa9641c3b.png"],
  "Bege": ["/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"],
  "Marrom": ["/lovable-uploads/3bb94c02-6771-46d8-8e2f-efe9b267c391.png"],
  "Rosa": ["/lovable-uploads/0f23a8fc-2cfb-4961-a2d3-47b09c4ec29c.png"],
  "Verde": ["/lovable-uploads/3bda6c77-533b-4d79-9a50-fbd946f1cbd6.png"],
  "Vinho": ["/lovable-uploads/eb41cb5b-59c0-4d31-b82c-28b327eed958.png"],
  "Azul": ["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"]
};

export const useProductImageManager = (product: Product | null, selectedColor: string) => {
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Initialize images based on product data
  const initializeImages = (product: Product) => {
    if (!product) return;
    
    // Special handling for product ID 1003 (Bordado em Fralda de Tecido - Davi)
    if (product.id.toString() === "1003") {
      const images = ["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"];
      setCurrentImages(images);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for product ID 2010 (Bordado em Toalha de Banho)
    if (product.id.toString() === "2010") {
      const images = [
        "/lovable-uploads/32a81fea-21e4-426b-a513-d4a05b4381a9.png",
        "/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png"
      ];
      setCurrentImages(images);
      setActiveImageIndex(0);
      return;
    }
    
    if (product.images && typeof product.images === 'object' && !Array.isArray(product.images)) {
      const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : '';
      const colorImages = defaultColor && product.images[defaultColor] ? product.images[defaultColor] : [];
      setCurrentImages(colorImages);
      setActiveImageIndex(0);
    } 
    else if (product.images && Array.isArray(product.images)) {
      setCurrentImages(product.images);
      setActiveImageIndex(0);
    } 
    else if (product.imageUrl) {
      setCurrentImages([product.imageUrl]);
      setActiveImageIndex(0);
    } 
    else {
      setCurrentImages([]);
    }
  };

  // Update images when product changes
  useEffect(() => {
    if (product) {
      if (product.id.toString() === "204") {
        // Special case for product 204 - initialize with default color
        const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : '';
        if (defaultColor && colorToImageMap[defaultColor]) {
          setCurrentImages(colorToImageMap[defaultColor]);
          setActiveImageIndex(0);
        } else {
          setCurrentImages([product.imageUrl]);
          setActiveImageIndex(0);
        }
      } else if (product.id.toString() === "1003") {
        // Special case for product 1003 (Bordado em Fralda de Tecido - Davi)
        setCurrentImages(["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"]);
        setActiveImageIndex(0);
      } else if (product.id.toString() === "2010") {
        // Special case for product 2010 (Bordado em Toalha de Banho)
        setCurrentImages([
          "/lovable-uploads/32a81fea-21e4-426b-a513-d4a05b4381a9.png",
          "/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png"
        ]);
        setActiveImageIndex(0);
      } else {
        initializeImages(product);
      }
    }
  }, [product]);

  // Update images when color changes
  useEffect(() => {
    if (!product) return;
    
    if (product.id.toString() === "204" && selectedColor) {
      console.log("Mudando para cor:", selectedColor);
      if (colorToImageMap[selectedColor]) {
        console.log("Imagens para esta cor:", colorToImageMap[selectedColor]);
        setCurrentImages(colorToImageMap[selectedColor]);
        setActiveImageIndex(0);
        return;
      }
    }
    
    // Special handling for product 1003 (Bordado em Fralda de Tecido - Davi)
    if (product.id.toString() === "1003" && selectedColor === "Azul") {
      setCurrentImages(["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"]);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for product 2010 (Bordado em Toalha de Banho)
    if (product.id.toString() === "2010") {
      setCurrentImages([
        "/lovable-uploads/32a81fea-21e4-426b-a513-d4a05b4381a9.png",
        "/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    if (product.images && typeof product.images === 'object' && !Array.isArray(product.images)) {
      const colorImages = product.images[selectedColor] || [];
      setCurrentImages(colorImages);
      setActiveImageIndex(0);
    }
  }, [selectedColor, product]);

  // Get the placeholder image based on product category
  const getPlaceholder = (category: string) => {
    const placeholders: Record<string, string> = {
      'Cama, Mesa e Banho': '/images/placeholders/home-textile.jpg',
      'Cama': '/images/placeholders/home-textile.jpg',
      'Mesa e Cozinha': '/images/placeholders/home-textile.jpg',
      'Banho': '/images/placeholders/towel.jpg',
      'Infantil': '/images/placeholders/kids.jpg',
      'Vestuário': '/images/placeholders/clothing.jpg',
      'Jaleco': '/images/placeholders/uniform.jpg',
      'Pantufas': '/images/placeholders/slippers.jpg',
      'Bonés Bordados': '/images/placeholders/cap.jpg',
      'Bordado em Necessaire': '/images/placeholders/necessaire.jpg',
      'Bordado em Bolsa': '/images/placeholders/bag.jpg',
      'Jalecos': '/images/placeholders/uniform.jpg',
      'Roupões Infantis': '/images/placeholders/kids-embroidery.jpg',
      'Toalhas Infantis': '/images/placeholders/towel.jpg',
      'Bordados Infantis': '/images/placeholders/kids-embroidery.jpg'
    };
    
    return placeholders[category] || 'https://via.placeholder.com/500x500?text=Produto';
  };

  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getPlaceholder
  };
};
