// Este arquivo simula uma API para gerenciar produtos e categorias

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  images: string[] | Record<string, string[]>;
  tags: string[];
  type: 'product' | 'portfolio';
  isNew?: boolean;
  colors?: string[];
  sizes?: string[];
}

// Categorias de produtos
export const categories: Category[] = [
  {
    id: 1,
    name: "Cama",
    icon: "bed",
    slug: "cama"
  },
  {
    id: 2,
    name: "Mesa e Cozinha",
    icon: "chef-hat",
    slug: "mesa-cozinha"
  },
  {
    id: 3,
    name: "Banho",
    icon: "bath",
    slug: "banho"
  },
  {
    id: 4,
    name: "Bordado em Boné",
    icon: "hat",
    slug: "bordado-bone"
  },
  {
    id: 5,
    name: "Bordado em Toalha",
    icon: "bath",
    slug: "bordado-toalha-banho"
  },
  {
    id: 6,
    name: "Bordado em Vestuário",
    icon: "shirt",
    slug: "bordado-vestuario"
  },
  {
    id: 7,
    name: "Bordado Infantil",
    icon: "baby",
    slug: "bordado-infantis"
  },
  {
    id: 8,
    name: "Bordado em Necessaire",
    icon: "briefcase",
    slug: "bordado-necessaire"
  },
  {
    id: 9,
    name: "Bordado em Bolsa",
    icon: "shopping-bag",
    slug: "bordado-bolsa"
  },
  {
    id: 10,
    name: "Jaleco",
    icon: "shirt",
    slug: "jaleco"
  },
  {
    id: 11,
    name: "Infantil",
    icon: "baby",
    slug: "infantil"
  },
  {
    id: 12,
    name: "Pantufas",
    icon: "footprints",
    slug: "pantufa"
  }
];

// Mock function para obter produtos por categoria
export const getProductsByCategory = (categorySlug: string) => {
  // Na implementação real, isso seria uma chamada de API
  // aqui estamos simulando para verificar se a estrutura funciona
  
  // Se for "all", retorna todos os produtos do tipo apropriado
  if (categorySlug === 'all' || !categorySlug) {
    // Implementar lógica futura para retornar todos os produtos
    return [];
  }
  
  // Verifica se é uma categoria de portfólio ou produto regular
  const isPortfolioCategory = categorySlug.includes('bordado');
  
  // Filtra produtos com base na categoria
  return allProducts.filter(product => {
    // Se for categoria de portfólio, incluir apenas itens de portfólio
    if (isPortfolioCategory) {
      return product.type === 'portfolio' && (
        product.category.toLowerCase().includes(categorySlug.replace(/-/g, ' ')) ||
        (categorySlug === 'bordado-toalha-banho' && 
         (product.name.toLowerCase().includes('toalha') ||
          product.category === 'Bordado em Toalha'))
      );
    }
    
    // Se for categoria regular, incluir apenas produtos regulares
    return product.type === 'product' && product.category.toLowerCase().includes(categorySlug.replace(/-/g, ' '));
  });
};

// Mock de produtos
export const allProducts: Product[] = [
  {
    id: 204,
    name: "Jogo Americano Requinte Ondulado",
    description: "Eleve sua experiência à mesa com o jogo americano Tessi.",
    category: "Mesa e Cozinha",
    images: {
      "Branco": [
        "/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"
      ],
      "Bege": [
        "/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"
      ]
    },
    tags: ["novo"],
    type: "product",
    isNew: true,
    colors: ["Branco", "Bege"]
  },
  // Bordado em Camisa Infantil - Caminhão
  {
    id: 1001,
    name: "Bordado em Camisa Infantil - Caminhão",
    description: "Camisa infantil com bordado de caminhão, ideal para crianças aventureiras. Bordado detalhado com caminhão vermelho em tecido de alta qualidade.",
    category: "Bordados Infantis",
    images: [
      "/lovable-uploads/91998edb-6477-4c56-9f7d-eb551e42e18a.png",
      "/lovable-uploads/208739a6-dbf4-49b4-91f1-fefab9cb6eb9.png",
      "/lovable-uploads/9b4b5a0c-3297-47b0-8b64-9d3166bd3088.png"
    ],
    tags: ["infantil", "bordado", "caminhão"],
    type: "product",
    isNew: true,
    colors: ["Branco", "Vermelho"],
    sizes: ["P", "M", "G"]
  },
  // Updating Bordado em Toalha product
  {
    id: 2010,
    name: "Bordado em Toalha",
    description: "Toalhas com bordado personalizado, perfeitas para presentear ou para uso próprio. Feitas com algodão de alta qualidade e bordados elegantes.",
    category: "Bordado em Toalha",
    images: [
      "/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png",
      "/lovable-uploads/38aaf457-7842-4f6f-9654-a50425b98530.png",
      "/lovable-uploads/494e5c1f-f39b-4fc9-93eb-4a1d16e06cf4.png",
      "/lovable-uploads/32a81fea-21e4-426b-a513-d4a05b4381a9.png",
      "/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png",
      "/lovable-uploads/5638df7e-a0e8-4648-81cc-7ebabc46d71a.png",
      "/lovable-uploads/9dd1e51a-955c-43f7-869c-b974b6c81c12.png",
      "/lovable-uploads/0e63ddb2-a891-4a5a-aad8-a4edb22a66f6.png"
    ],
    tags: ["bordado", "personalizado"],
    type: "portfolio",
    isNew: true,
    colors: ["Branco", "Verde Água", "Verde"],
    sizes: ["Único"]
  },
  // Updated Bordado em Fralda de Tecido - Nome with new images
  {
    id: 1002,
    name: "Bordado em Fralda de Tecido - Nome",
    description: "Fralda de tecido personalizada com bordado do nome, ideal para presente de bebê. Disponível em várias cores: Marrom, Verde, Amarelo, Azul.",
    category: "Bordados Infantis",
    images: [
      "/lovable-uploads/8fb7cea7-4cfd-4d4b-ba56-280c3aa41e2d.png",
      "/lovable-uploads/9a8507cf-7a70-415c-8c4a-4eb424c32dd4.png",
      "/lovable-uploads/055ae88a-0c44-443e-ad15-3fbafecf130a.png",
      "/lovable-uploads/b4b1bf45-7f3e-414b-b33c-4d3ca7d5c55c.png",
      "/lovable-uploads/f0a45e2e-eccf-4166-a7a7-75ccfe8cdb68.png"
    ],
    tags: ["bordado", "personalizado", "infantil", "fralda"],
    type: "product",
    isNew: true,
    colors: ["Marrom", "Verde", "Amarelo", "Azul"],
    sizes: ["Único"]
  },
  // Atualizado Bordado em Macacão - Leãozinho Safari com novas imagens
  {
    id: 1004,
    name: "Bordado em Macacão - Leãozinho Safari",
    description: "Macacão infantil com bordado de leãozinho, ideal para os pequenos aventureiros. Bordado personalizado com nome e desenho de leão.",
    category: "Bordados Infantis",
    images: [
      "/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png",
      "/lovable-uploads/3da0fe71-1385-4b2c-8d2b-81a6f409c3bd.png", 
      "/lovable-uploads/57491ecd-9620-4c38-be43-1d61ed97c5ae.png",
      "/lovable-uploads/bf315398-f5d5-4e34-a642-0ff432375a70.png"
    ],
    tags: ["bordado", "personalizado", "infantil", "macacão", "safari", "leão"],
    type: "product",
    isNew: true,
    colors: ["Cinza"],
    sizes: ["P", "M", "G"]
  },
  // New product: Bordado em Manta - Leãozinho
  {
    id: 1005,
    name: "Bordado em Manta - Leãozinho",
    description: "Manta infantil com bordado de leãozinho personalizado, ideal para o aconchego do bebê. Disponível em verde água, perfeita para presentear.",
    category: "Bordados Infantis",
    images: [
      "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
      "/lovable-uploads/3e992647-de18-485e-a85b-a41854b1227b.png"
    ],
    tags: ["bordado", "personalizado", "infantil", "manta", "leão"],
    type: "product",
    isNew: true,
    colors: ["Verde Água"],
    sizes: ["Único"]
  },
  // Updated Bordado em Bolsas - Imparáveis with new images
  {
    id: 2002,
    name: "Bordado em Bolsas - Imparáveis",
    description: "Bolsa de alta qualidade com bordado exclusivo de marca. Disponível em rosa e bege.",
    category: "Bordado em Bolsa",
    images: [
      "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
      "/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png",
      "/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png",
      "/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"
    ],
    tags: ["bordado", "bolsa", "personalizado", "brows evolution"],
    type: "product",
    isNew: true,
    colors: ["Rosa", "Bege"],
    sizes: ["Único"]
  },
  // Atualizando Bordado em Camisa - Impcatto
  {
    id: 202,
    name: "Bordado em Camisa - Impcatto",
    description: "Bordado de logo em camisa para a empresa Impcatto. Trabalho detalhado em camisas verdes com bordado de alta precisão do logo da empresa em duas cores.",
    category: "Bordado em Vestuário",
    images: [
      "/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png",
      "/lovable-uploads/652a8949-cb0d-4fd6-8ac2-d73fdd4cd81e.png"
    ],
    tags: ["camisa", "bordado", "logo", "empresarial"],
    type: "portfolio",
    isNew: false,
    colors: ["Verde"],
    sizes: ["P", "M", "G", "GG"]
  },
  
  // Update Bordado em Fardamento - Pet Dream with new images
  {
    id: 203,
    name: "Bordado em Fardamento - Pet Dream",
    description: "Bordado do logo Pet Dream em fardamento para hospital veterinário. Disponível em branco e verde.",
    category: "Bordado em Fardamentos",
    images: [
      "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe92.png",
      "/lovable-uploads/6d28ebce-a220-404c-b350-55f1be2bc89d.png"
    ],
    tags: ["fardamento", "bordado", "veterinário", "pet", "empresarial"],
    type: "portfolio",
    isNew: true,
    colors: ["Branco", "Verde"],
    sizes: ["P", "M", "G", "GG"]
  },
  // Adicionando Bordado em Fardamento - Biscoitos Feitos por Nós
  {
    id: 206,
    name: "Bordado em Fardamento - Biscoitos Feitos por Nós",
    description: "Bordado do logo 'Biscoitos Feitos Por Nós' em fardamento. Disponível em azul marinho e branco, com design elegante para equipe de confeitaria artesanal.",
    category: "Bordado em Fardamentos",
    images: [
      "/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png",
      "/lovable-uploads/757b2068-de47-4d4a-9fe4-f68c46100c2d.png"
    ],
    tags: ["fardamento", "bordado", "logo", "gastronomia", "empresarial", "confeitaria", "biscoitos"],
    type: "portfolio",
    isNew: true,
    colors: ["Azul Marinho", "Branco", "Vermelho"],
    sizes: ["P", "M", "G", "GG"]
  },
  
  // Adicionando Bordado em Fardamento para Times de Futebol
  {
    id: 902,
    name: "Bordado em Fardamento para Times de Futebol",
    description: "Bordado em fardamento para diversos times de futebol europeus incluindo PSG, Marseille e Montpellier. Trabalho de alta precisão para uniformes esportivos.",
    category: "Bordado em Fardamentos",
    images: [
      "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png", // Overview de todos os times
      "/lovable-uploads/ee7a7e95-5675-4250-9896-fabb9b05fa82.png", // Montpellier detalhe
      "/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png", // PSG detalhe
      "/lovable-uploads/e577a3c9-349a-4906-860e-257b33765459.png"  // Marseille detalhe
    ],
    tags: ["bordado", "fardamento", "futebol", "time", "esporte", "psg", "marseille", "montpellier"],
    type: "portfolio",
    isNew: true,
    colors: ["Azul", "Branco", "variados"],
    sizes: ["P", "M", "G", "GG"]
  },
  
  // Updating Bordado em Camisa - Capibaribe
  {
    id: 207,
    name: "Bordado em Camisa - Capibaribe",
    description: "Bordado de logo do time Capibaribe em uma camisa. Detalhes nítidos na mascote do leão com contorno amarelo vibrante em fundo preto.",
    category: "Bordado em Vestuário",
    images: [
      "/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png"
    ],
    tags: ["camisa", "bordado", "futebol", "time", "esporte", "capibaribe"],
    type: "portfolio",
    isNew: false,
    colors: ["Preto", "Amarelo"],
    sizes: ["P", "M", "G", "GG"]
  }
];
