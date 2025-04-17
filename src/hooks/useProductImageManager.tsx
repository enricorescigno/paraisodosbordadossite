import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export const colorToImageMap: Record<string, string[]> = {
  "Branco": ["/lovable-uploads/9abf1240-1fa3-432f-984b-3021528d165d.png"],
  "Dourado": ["/lovable-uploads/7df18d21-e4ed-468f-b727-826aa9641c3b.png"],
  "Bege": [
    "/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png",
    "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png", // Bege Brows Evolution bag
    "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"  // Bege Brows Evolution bag detail
  ],
  "Marrom": ["/lovable-uploads/8fb7cea7-4cfd-4d4b-ba56-280c3aa41e2d.png", "/lovable-uploads/f0a45e2e-eccf-4166-a7a7-75ccfe8cdb68.png"],
  "Rosa": [
    "/lovable-uploads/0f23a8fc-2cfb-4961-a2d3-47b09c4ec29c.png",
    "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png", // Rosa Brows Evolution bag
    "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png"  // Rosa Brows Evolution bag detail
  ],
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
    "/lovable-uploads/494e5c1f-f39b-4fc9-93eb-4a1d16e06cf4.png",
    "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
    "/lovable-uploads/3e992647-de18-485e-a85b-a41854b1227b.png"
  ],
  "Vermelho": [
    "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
    "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
    "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
  ],
  "Amarelo": ["/lovable-uploads/055ae88a-0c44-443e-ad15-3fbafecf130a.png"], // Fralda Amarela
  "Cinza": [
    "/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png",
    "/lovable-uploads/3da0fe71-1385-4b2c-8d2b-81a6f409c3bd.png", 
    "/lovable-uploads/57491ecd-9620-4c38-be43-1d61ed97c5ae.png",
    "/lovable-uploads/bf315398-f5d5-4e34-a642-0ff432375a70.png"
  ],
  "Preto": [
    "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png", // For Brows Evolution bag
    "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png"  // For Brows Evolution bag detail
  ]
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
    
    // Special handling for product ID 1004 (Bordado em Macacão - Leãozinho Safari)
    if (product.id.toString() === "1004") {
      setCurrentImages([
        "/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png",
        "/lovable-uploads/3da0fe71-1385-4b2c-8d2b-81a6f409c3bd.png", 
        "/lovable-uploads/57491ecd-9620-4c38-be43-1d61ed97c5ae.png",
        "/lovable-uploads/bf315398-f5d5-4e34-a642-0ff432375a70.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for product ID 1005 (Bordado em Manta - Leãozinho)
    if (product.id.toString() === "1005") {
      setCurrentImages([
        "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
        "/lovable-uploads/3e992647-de18-485e-a85b-a41854b1227b.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for Bordado em Bolsas - Imparáveis (2002 and 901)
    if (product.id.toString() === "2002" || product.id.toString() === "901") {
      setCurrentImages([
        "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
        "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
        "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
        "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for Bordado em Bolsas - Brows Evolution (2004 and 903)
    if (product.id.toString() === "2004" || product.id.toString() === "903") {
      setCurrentImages([
        "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
        "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
        "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
        "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Special handling for Bordado em Fardamento para Times de Futebol (902)
    if (product.id.toString() === "902") {
      setCurrentImages([
        "/lovable-uploads/58739ba7-3b07-4be7-8a25-dd721a363924.png",
        "/lovable-uploads/aee9dd23-444e-44e3-990b-ba3476180468.png",
        "/lovable-uploads/ce9f6559-20b2-437b-8f8d-061614aaeebf.png",
        "/lovable-uploads/3c44a694-b8f4-4e17-aa40-9fc14f33aec5.png"
      ]);
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
      // Special case for product 902 - Bordado em Fardamento para Times de Futebol
      if (product.id.toString() === "902") {
        setCurrentImages([
          "/lovable-uploads/58739ba7-3b07-4be7-8a25-dd721a363924.png",
          "/lovable-uploads/aee9dd23-444e-44e3-990b-ba3476180468.png",
          "/lovable-uploads/ce9f6559-20b2-437b-8f8d-061614aaeebf.png",
          "/lovable-uploads/3c44a694-b8f4-4e17-aa40-9fc14f33aec5.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      
      // Special case for product ID 1001 (Bordado em Camisa Infantil - Caminhão)
      if (product.id.toString() === "1001") {
        setCurrentImages([
          "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
          "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
          "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      // Special case for product 1002 - Bordado em Fralda de Tecido - Nome
      else if (product.id.toString() === "1002") {
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
      // Special case for product 1004 - Bordado em Macacão - Leãozinho Safari
      else if (product.id.toString() === "1004") {
        setCurrentImages([
          "/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png",
          "/lovable-uploads/3da0fe71-1385-4b2c-8d2b-81a6f409c3bd.png", 
          "/lovable-uploads/57491ecd-9620-4c38-be43-1d61ed97c5ae.png",
          "/lovable-uploads/bf315398-f5d5-4e34-a642-0ff432375a70.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      // Special case for product 1005 - Bordado em Manta - Leãozinho
      else if (product.id.toString() === "1005") {
        setCurrentImages([
          "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
          "/lovable-uploads/3e992647-de18-485e-a85b-a41854b1227b.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      // Special case for Bordado em Bolsas - Imparáveis (2002 and 901)
      else if (product.id.toString() === "2002" || product.id.toString() === "901") {
        setCurrentImages([
          "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
          "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
          "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
          "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      // Special case for Bordado em Bolsas - Brows Evolution (2004 and 903)
      else if (product.id.toString() === "2004" || product.id.toString() === "903") {
        setCurrentImages([
          "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
          "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
          "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
          "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      // Special case for product 204 - initialize with default color
      else if (product.id.toString() === "204") {
        const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : '';
        if (defaultColor && colorToImageMap[defaultColor]) {
          setCurrentImages(colorToImageMap[defaultColor]);
          setActiveImageIndex(0);
        } else {
          setCurrentImages([product.imageUrl]);
          setActiveImageIndex(0);
        }
      }
      // Special case for product 1003 (Bordado em Fralda de Tecido - Davi)
      else if (product.id.toString() === "1003") {
        setCurrentImages(["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"]);
        setActiveImageIndex(0);
      }
      // Special case for product 2010 (Bordado em Toalha)
      else if (product.id.toString() === "2010") {
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
    
    // Handle color changes for product 902 (Bordado em Fardamento para Times de Futebol)
    if (product.id.toString() === "902") {
      if (selectedColor === "Azul") {
        setCurrentImages([
          "/lovable-uploads/58739ba7-3b07-4be7-8a25-dd721a363924.png",
          "/lovable-uploads/aee9dd23-444e-44e3-990b-ba3476180468.png",
          "/lovable-uploads/ce9f6559-20b2-437b-8f8d-061614aaeebf.png"
        ]);
      } else if (selectedColor === "Branco") {
        setCurrentImages([
          "/lovable-uploads/3c44a694-b8f4-4e17-aa40-9fc14f33aec5.png"
        ]);
      } else {
        setCurrentImages([
          "/lovable-uploads/58739ba7-3b07-4be7-8a25-dd721a363924.png",
          "/lovable-uploads/aee9dd23-444e-44e3-990b-ba3476180468.png",
          "/lovable-uploads/ce9f6559-20b2-437b-8f8d-061614aaeebf.png",
          "/lovable-uploads/3c44a694-b8f4-4e17-aa40-9fc14f33aec5.png"
        ]);
      }
      setActiveImageIndex(0);
      return;
    }
    
    // Handle color changes for product 1001 (Bordado em Camisa Infantil - Caminhão)
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
    
    // Handle color changes for product 1004 (Bordado em Macacão - Leãozinho Safari)
    if (product.id.toString() === "1004" && selectedColor === "Cinza") {
      setCurrentImages([
        "/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png",
        "/lovable-uploads/3da0fe71-1385-4b2c-8d2b-81a6f409c3bd.png", 
        "/lovable-uploads/57491ecd-9620-4c38-be43-1d61ed97c5ae.png",
        "/lovable-uploads/bf315398-f5d5-4e34-a642-0ff432375a70.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Handle color changes for product 1005 (Bordado em Manta - Leãozinho)
    if (product.id.toString() === "1005" && selectedColor === "Verde Água") {
      setCurrentImages([
        "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
        "/lovable-uploads/3e992647-de18-485e-a85b-a41854b1227b.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    // Handle color changes for Bordado em Bolsas products
    if ((product.id.toString() === "
