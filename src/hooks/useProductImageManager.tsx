
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export const colorToImageMap: Record<string, string[]> = {
  "Branco": [
    "/lovable-uploads/9abf1240-1fa3-432f-984b-3021528d165d.png",
    "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png", // Pet Dream branco
    "/lovable-uploads/757b2068-de47-4d4a-9fe4-f68c46100c2d.png"  // Biscoitos Feitos por Nós branco
  ],
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
    "/lovable-uploads/9a8507cf-7a70-415c-8c4a-4eb424c32dd4.png", // Fralda Verde
    "/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png", // Impcatto camisa
    "/lovable-uploads/652a8949-cb0d-4fd6-8ac2-d73fdd4cd81e.png",  // Impcatto camisas
    "/lovable-uploads/6d28ebce-a220-404c-b350-55f1be2bc89d.png" // Pet Dream verde
  ],
  "Vinho": ["/lovable-uploads/eb41cb5b-59c0-4d31-b82c-28b327eed958.png"],
  "Azul": [
    "/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png",
    "/lovable-uploads/b4b1bf45-7f3e-414b-b33c-4d3ca7d5c55c.png", // Fralda Azul
    "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png", // Time futebol - Overview
    "/lovable-uploads/ee7a7e95-5675-4250-9896-fabb9b05fa82.png", // Time futebol - Montpellier
    "/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png"  // Time futebol - PSG
  ],
  "Azul Marinho": [
    "/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png" // Biscoitos Feitos por Nós azul
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
    "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png",
    "/lovable-uploads/757b2068-de47-4d4a-9fe4-f68c46100c2d.png" // Biscoitos Feitos por Nós vermelho
  ],
  "Amarelo": [
    "/lovable-uploads/055ae88a-0c44-443e-ad15-3fbafecf130a.png", // Fralda Amarela
    "/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png",  // Camisa Girassol
    "/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png"   // Capibaribe
  ],
  "Cinza": [
    "/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png",
    "/lovable-uploads/3da0fe71-1385-4b2c-8d2b-81a6f409c3bd.png", 
    "/lovable-uploads/57491ecd-9620-4c38-be43-1d61ed97c5ae.png",
    "/lovable-uploads/bf315398-f5d5-4e34-a642-0ff432375a70.png"
  ],
  "Preto": [
    "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png", // For Brows Evolution bag
    "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",  // For Brows Evolution bag detail
    "/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png",   // Camisa Girassol
    "/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png",    // Capibaribe
    "/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png",    // Imparáveis mochilas
    "/lovable-uploads/77747fae-966b-471d-925b-6daaca500595.png",    // Imparáveis detalhe bordado
    "/lovable-uploads/825c01c0-de2d-4af3-925e-93c8e24aaf6f.png"     // Imparáveis detalhe bordado close
  ]
};

export const useProductImageManager = (product: Product | null, selectedColor: string) => {
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const initializeImages = (product: Product) => {
    if (!product) return;
    
    if (product.id.toString() === "1001") {
      setCurrentImages([
        "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
        "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
        "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
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
    
    if (product.id.toString() === "1003") {
      setCurrentImages(["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"]);
      setActiveImageIndex(0);
      return;
    }
    
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
    
    if (product.id.toString() === "1005") {
      setCurrentImages([
        "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
        "/lovable-uploads/3e992647-de18-485e-a85b-a41854b1227b.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    if (product.id.toString() === "2002" || product.id.toString() === "901") {
      setCurrentImages([
        "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
        "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
        "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
        "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png",
        "/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png",
        "/lovable-uploads/77747fae-966b-471d-925b-6daaca500595.png",
        "/lovable-uploads/825c01c0-de2d-4af3-925e-93c8e24aaf6f.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    if (product.id.toString() === "2004" || product.id.toString() === "903") {
      setCurrentImages([
        "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
        "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
        "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
        "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png",
        "/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png",
        "/lovable-uploads/77747fae-966b-471d-925b-6daaca500595.png",
        "/lovable-uploads/825c01c0-de2d-4af3-925e-93c8e24aaf6f.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    if (product.id.toString() === "205" || product.id.toString() === "902") {
      setCurrentImages([
        "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png", // Overview de todos os times
        "/lovable-uploads/ee7a7e95-5675-4250-9896-fabb9b05fa82.png", // Montpellier detalhe
        "/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png", // PSG detalhe
        "/lovable-uploads/e577a3c9-349a-4906-860e-257b33765459.png"  // Marseille detalhe
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    if (product.id.toString() === "207") {
      setCurrentImages(["/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png"]);
      setActiveImageIndex(0);
      return;
    }
    
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

  // Handle product changes
  useEffect(() => {
    if (product) {
      if (product.id.toString() === "205" || product.id.toString() === "902") {
        setCurrentImages([
          "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png", // Overview de todos os times
          "/lovable-uploads/ee7a7e95-5675-4250-9896-fabb9b05fa82.png", // Montpellier detalhe
          "/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png", // PSG detalhe
          "/lovable-uploads/e577a3c9-349a-4906-860e-257b33765459.png"  // Marseille detalhe
        ]);
        setActiveImageIndex(0);
        return;
      }
      
      if (product.id.toString() === "1001") {
        setCurrentImages([
          "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
          "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
          "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      
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
      
      if (product.id.toString() === "1005") {
        setCurrentImages([
          "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
          "/lovable-uploads/3e992647-de18-485e-a85b-a41854b1227b.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      
      if (product.id.toString() === "2002" || product.id.toString() === "901") {
        setCurrentImages([
          "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
          "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
          "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
          "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png",
          "/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png",
          "/lovable-uploads/77747fae-966b-471d-925b-6daaca500595.png",
          "/lovable-uploads/825c01c0-de2d-4af3-925e-93c8e24aaf6f.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      
      if (product.id.toString() === "2004" || product.id.toString() === "903") {
        setCurrentImages([
          "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
          "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
          "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
          "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png",
          "/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png",
          "/lovable-uploads/77747fae-966b-471d-925b-6daaca500595.png",
          "/lovable-uploads/825c01c0-de2d-4af3-925e-93c8e24aaf6f.png"
        ]);
        setActiveImageIndex(0);
        return;
      }
      
      if (product.id.toString() === "207") {
        setCurrentImages(["/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png"]);
        setActiveImageIndex(0);
        return;
      }
      
      if (product.id.toString() === "204") {
        const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : '';
        if (defaultColor && colorToImageMap[defaultColor]) {
          setCurrentImages(colorToImageMap[defaultColor]);
          setActiveImageIndex(0);
        } else {
          setCurrentImages([product.imageUrl]);
          setActiveImageIndex(0);
        }
      }
      
      if (product.id.toString() === "1003") {
        setCurrentImages(["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"]);
        setActiveImageIndex(0);
      }
      
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
      
      if (product.id.toString() === "203") {
        if (selectedColor === "Verde") {
          setCurrentImages(["/lovable-uploads/6d28ebce-a220-404c-b350-55f1be2bc89d.png"]);
        } else if (selectedColor === "Branco") {
          setCurrentImages(["/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png"]);
        } else {
          setCurrentImages([
            "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png",
            "/lovable-uploads/6d28ebce-a220-404c-b350-55f1be2bc89d.png"
          ]);
        }
        setActiveImageIndex(0);
        return;
      }
      
      if (product.id.toString() === "206") {
        if (selectedColor === "Azul Marinho") {
          setCurrentImages(["/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png"]);
        } else if (selectedColor === "Branco" || selectedColor === "Vermelho") {
          setCurrentImages(["/lovable-uploads/757b2068-de47-4d4a-9fe4-f68c46100c2d.png"]);
        } else {
          setCurrentImages([
            "/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png",
            "/lovable-uploads/757b2068-de47-4d4a-9fe4-f68c46100c2d.png"
          ]);
        }
        setActiveImageIndex(0);
        return;
      }
      
      initializeImages(product);
    }
  }, [product, selectedColor]);

  // Handle color changes
  useEffect(() => {
    if (!product) return;
    
    if (product.id.toString() === "205" || product.id.toString() === "902") {
      if (selectedColor === "Azul") {
        setCurrentImages([
          "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png", // Overview de todos os times
          "/lovable-uploads/ee7a7e95-5675-4250-9896-fabb9b05fa82.png", // Montpellier detalhe
          "/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png"  // PSG detalhe
        ]);
      } else if (selectedColor === "Branco") {
        setCurrentImages([
          "/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png"  // PSG detalhe no uniforme branco
        ]);
      } else {
        setCurrentImages([
          "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png", // Overview de todos os times
          "/lovable-uploads/ee7a7e95-5675-4250-9896-fabb9b05fa82.png", // Montpellier detalhe
          "/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png", // PSG detalhe
          "/lovable-uploads/e577a3c9-349a-4906-860e-257b33765459.png"  // Marseille detalhe
        ]);
      }
      setActiveImageIndex(0);
      return;
    }
    
    if (product.id.toString() === "1001" && selectedColor === "Vermelho") {
      setCurrentImages([
        "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
        "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
        "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
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
    
    if (product.id.toString() === "1005" && selectedColor === "Verde Água") {
      setCurrentImages([
        "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
        "/lovable-uploads/3e992647-de18-485e-a85b-a41854b1227b.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    if ((product.id.toString() === "2002" || product.id.toString() === "901") && selectedColor === "Rosa") {
      setCurrentImages([
        "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
        "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    if ((product.id.toString() === "2002" || product.id.toString() === "901") && selectedColor === "Bege") {
      setCurrentImages([
        "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
        "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"
      ]);
      setActiveImageIndex(0);
      return;
    }
    
    if ((product.id.toString() === "2004" || product.id.toString() === "903")) {
      if (selectedColor === "Rosa") {
        setCurrentImages([
          "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
          "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png"
        ]);
      } else if (selectedColor === "Bege") {
        setCurrentImages([
          "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
          "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"
        ]);
      }
      setActiveImageIndex(0);
      return;
    }
    
    if (product.id.toString() === "207" && 
        (selectedColor === "Preto" || selectedColor === "Amarelo")) {
      setCurrentImages(["/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png"]);
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
    
    if (product.id.toString() === "1003" && selectedColor === "Azul") {
      setCurrentImages(["/lovable-uploads/f92f7a74-5afd-4a68-ac2f-e865dbe23826.png"]);
      setActiveImageIndex(0);
      return;
    }
    
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
    
    if (product.id.toString() === "203") {
      if (selectedColor === "Verde") {
        setCurrentImages(["/lovable-uploads/6d28ebce-a220-404c-b350-55f1be2bc89d.png"]);
      } else if (selectedColor === "Branco") {
        setCurrentImages(["/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png"]);
      } else {
        setCurrentImages([
          "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png",
          "/lovable-uploads/6d28ebce-a220-404c-b350-55f1be2bc89d.png"
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
      'Bonés Bordados': '/placeholder.svg',
      'Bordado em Necessaire': '/placeholder.svg',
      'Bordado em Bolsa': '/placeholder.svg',
      'Bordado em Toalha': '/placeholder.svg',
      'Jalecos': '/placeholder.svg',
      'Roupões Infantis': '/placeholder.svg',
      'Toalhas Infantis': '/placeholder.svg',
      'Bordados Infantis': '/placeholder.svg'
    };
    
    return placeholders[category] || '/placeholder.svg';
  };

  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getPlaceholder
  };
};
