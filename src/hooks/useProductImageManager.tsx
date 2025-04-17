
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export const colorToImageMap: Record<string, string[]> = {
  "Branco": ["/lovable-uploads/9abf1240-1fa3-432f-984b-3021528d165d.png"],
  "Dourado": ["/lovable-uploads/7df18d21-e4ed-468f-b727-826aa9641c3b.png"],
  "Bege": ["/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"],
  "Marrom": ["/lovable-uploads/8fb7cea7-4cfd-4d4b-ba56-280c3aa41e2d.png", "/lovable-uploads/f0a45e2e-eccf-4166-a7a7-75ccfe8cdb68.png"],
  "Rosa": ["/lovable-uploads/0f23a8fc-2cfb-4961-a2d3-47b09c4ec29c.png"],
  "Verde": [
    "/lovable-uploads/5638df7e-a0e8-4648-81cc-7ebabc46d71a.png",
    "/lovable-uploads/9dd1e51a-955c-43f7-869c-b974b6c81c12.png",
    "/lovable-uploads/0e63ddb2-a891-4a5a-aad8-a4edb22a66f6.png",
    "/lovable-uploads/9a8507cf-7a70-415c-8c4a-4eb424c32dd4.png" // Fralda Verde
  ],
  "Vinho": ["/lovable-uploads/eb41cb5b-59c0-4d31-b82c-28b327eed958.png"],
  "Azul": [
    "/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png",
    "/lovable-uploads/b4b1bf45-7f3e-414b-b33c-4d3ca7d5c55c.png" // Fralda Azul
  ],
  "Verde Água": [
    "/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png",
    "/lovable-uploads/38aaf457-7842-4f6f-9654-a50425b98530.png",
    "/lovable-uploads/494e5c1f-f39b-4fc9-93eb-4a1d16e06cf4.png"
  ],
  "Vermelho": [
    "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
    "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
    "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
  ],
  "Amarelo": ["/lovable-uploads/055ae88a-0c44-443e-ad15-3fbafecf130a.png"] // Fralda Amarela
};

export const useProductImageManager = (product: Product | null, selectedColor: string) => {
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Initialize images based on product data
  const initializeImages = (product: Product) => {
    if (!product) return;
    
    // Special handling for product ID 1001 (Bordado em Camisa Infantil - Caminhão)
    if (product.id.toString() === "1001") {
      setCurrentImages([
        "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
        "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
        "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for product ID 1002 (Bordado em Fralda de Tecido - Nome)
    if (product.id.toString() === "1002") {
      setCurrentImages([
        "/lovable-uploads/8fb7cea7-4cfd-4d4b-ba56-280c3aa41e2d.png",
        "/lovable-uploads/9a8507cf-7a70-415c-8c4a-4eb424c32dd4.png",
        "/lovable-uploads/055ae88a-0c44-443e-ad15-3fbafecf130a.png",
        "/lovable-uploads/b4b1bf45-7f3e-414b-b33c-4d3ca7d5c55c.png",
        "/lovable-uploads/f0a45e2e-eccf-4166-a7a7-75ccfe8cdb68.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for product ID 1003 (Bordado em Fralda de Tecido - Davi)
    if (product.id.toString() === "1003") {
      const images = ["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"];
      setCurrentImages(images);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for product ID 2010 (Bordado em Toalha)
    if (product.id.toString() === "2010") {
      if (selectedColor === "Verde") {
        const images = [
          "/lovable-uploads/5638df7e-a0e8-4648-81cc-7ebabc46d71a.png",
          "/lovable-uploads/9dd1e51a-955c-43f7-869c-b974b6c81c12.png",
          "/lovable-uploads/0e63ddb2-a891-4a5a-aad8-a4edb22a66f6.png"
        ];
        setCurrentImages(images);
      } else if (selectedColor === "Verde Água") {
        const images = [
          "/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png",
          "/lovable-uploads/38aaf457-7842-4f6f-9654-a50425b98530.png",
          "/lovable-uploads/494e5c1f-f39b-4fc9-93eb-4a1d16e06cf4.png"
        ];
        setCurrentImages(images);
      } else {
        const images = [
          "/lovable-uploads/32a81fea-21e4-426b-a513-d4a05b4381a9.png",
          "/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png"
        ];
        setCurrentImages(images);
      }
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
      if (product.id.toString() === "1001") {
        // Special case for product 1001 - Bordado em Camisa Infantil - Caminhão
        setCurrentImages([
          "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
          "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
          "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
        ]);
        setActiveImageIndex(0);
        return;
      } else if (product.id.toString() === "1002") {
        // Special case for product 1002 - Bordado em Fralda de Tecido - Nome
        setCurrentImages([
          "/lovable-uploads/8fb7cea7-4cfd-4d4b-ba56-280c3aa41e2d.png",
          "/lovable-uploads/9a8507cf-7a70-415c-8c4a-4eb424c32dd4.png",
          "/lovable-uploads/055ae88a-0c44-443e-ad15-3fbafecf130a.png",
          "/lovable-uploads/b4b1bf45-7f3e-414b-b33c-4d3ca7d5c55c.png",
          "/lovable-uploads/f0a45e2e-eccf-4166-a7a7-75ccfe8cdb68.png"
        ]);
        setActiveImageIndex(0);
        return;
      } else if (product.id.toString() === "204") {
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
        // Special case for product 2010 (Bordado em Toalha)
        if (selectedColor === "Verde") {
          setCurrentImages([
            "/lovable-uploads/5638df7e-a0e8-4648-81cc-7ebabc46d71a.png",
            "/lovable-uploads/9dd1e51a-955c-43f7-869c-b974b6c81c12.png",
            "/lovable-uploads/0e63ddb2-a891-4a5a-aad8-a4edb22a66f6.png"
          ]);
        } else if (selectedColor === "Verde Água") {
          setCurrentImages([
            "/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png",
            "/lovable-uploads/38aaf457-7842-4f6f-9654-a50425b98530.png",
            "/lovable-uploads/494e5c1f-f39b-4fc9-93eb-4a1d16e06cf4.png"
          ]);
        } else {
          setCurrentImages([
            "/lovable-uploads/32a81fea-21e4-426b-a513-d4a05b4381a9.png",
            "/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png"
          ]);
        }
        setActiveImageIndex(0);
        return;
      } else {
        initializeImages(product);
      }
    }
  }, [product]);

  // Update images when color changes
  useEffect(() => {
    if (!product) return;
    
    if (product.id.toString() === "1001" && selectedColor === "Vermelho") {
      setCurrentImages([
        "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
        "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
        "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Handle color changes for product 1002 (Bordado em Fralda de Tecido - Nome)
    if (product.id.toString() === "1002") {
      if (selectedColor === "Marrom") {
        setCurrentImages([
          "/lovable-uploads/8fb7cea7-4cfd-4d4b-ba56-280c3aa41e2d.png",
          "/lovable-uploads/f0a45e2e-eccf-4166-a7a7-75ccfe8cdb68.png"
        ]);
      } else if (selectedColor === "Verde") {
        setCurrentImages(["/lovable-uploads/9a8507cf-7a70-415c-8c4a-4eb424c32dd4.png"]);
      } else if (selectedColor === "Amarelo") {
        setCurrentImages(["/lovable-uploads/055ae88a-0c44-443e-ad15-3fbafecf130a.png"]);
      } else if (selectedColor === "Azul") {
        setCurrentImages(["/lovable-uploads/b4b1bf45-7f3e-414b-b33c-4d3ca7d5c55c.png"]);
      } else {
        // Default to showing all images
        setCurrentImages([
          "/lovable-uploads/8fb7cea7-4cfd-4d4b-ba56-280c3aa41e2d.png",
          "/lovable-uploads/9a8507cf-7a70-415c-8c4a-4eb424c32dd4.png",
          "/lovable-uploads/055ae88a-0c44-443e-ad15-3fbafecf130a.png",
          "/lovable-uploads/b4b1bf45-7f3e-414b-b33c-4d3ca7d5c55c.png",
          "/lovable-uploads/f0a45e2e-eccf-4166-a7a7-75ccfe8cdb68.png"
        ]);
      }
      setActiveImageIndex(0);
      return;
    }
    
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
    
    // Special handling for product 2010 (Bordado em Toalha)
    if (product.id.toString() === "2010") {
      if (selectedColor === "Verde") {
        setCurrentImages([
          "/lovable-uploads/5638df7e-a0e8-4648-81cc-7ebabc46d71a.png",
          "/lovable-uploads/9dd1e51a-955c-43f7-869c-b974b6c81c12.png",
          "/lovable-uploads/0e63ddb2-a891-4a5a-aad8-a4edb22a66f6.png"
        ]);
      } else if (selectedColor === "Verde Água") {
        setCurrentImages([
          "/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png",
          "/lovable-uploads/38aaf457-7842-4f6f-9654-a50425b98530.png",
          "/lovable-uploads/494e5c1f-f39b-4fc9-93eb-4a1d16e06cf4.png"
        ]);
      } else {
        setCurrentImages([
          "/lovable-uploads/32a81fea-21e4-426b-a513-d4a05b4381a9.png",
          "/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png"
        ]);
      }
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
      'Bordado em Toalha': '/images/placeholders/towel.jpg',
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
