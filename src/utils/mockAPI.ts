
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
      "/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png"
    ],
    tags: ["bordado", "personalizado"],
    type: "portfolio",
    isNew: true,
    colors: ["Branco", "Verde Água"],
    sizes: ["Único"]
  }
];
