
// This file provides search functionality across products

// Sample product data structure - this would be replaced with actual data in a real implementation
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  keywords?: string[];
  slug?: string;
  type: 'product' | 'portfolio';
  imageUrl?: string;
}

// Sample product database - In a real app, you would fetch this from an API
export const products: Product[] = [
  {
    id: "101", // ID matching ProductDetailPage
    name: "Toalha Bordada Personalizada",
    category: "banho",
    description: "Toalha de alta qualidade com bordados personalizados",
    keywords: ["toalha", "personalizada", "bordado", "banho", "presente"],
    slug: "toalha-bordada-personalizada",
    type: "product",
    imageUrl: "/lovable-uploads/cb60af2d-a399-4029-ab74-6f5374d38b9c.png"
  },
  {
    id: "301", // ID matching portfolio item in ProductDetailPage
    name: "Boné Personalizado Empresarial",
    category: "bordado-bone",
    description: "Boné de alta qualidade com bordado personalizado para sua empresa",
    keywords: ["boné", "bone", "personalizado", "empresarial", "bordado", "empresa"],
    slug: "bone-personalizado-empresarial",
    type: "portfolio",
    imageUrl: "/lovable-uploads/5db187fa-df04-492a-883f-c007af693e55.png"
  },
  {
    id: "330", // ID matching portfolio jaleco
    name: "Jaleco Bordado",
    category: "jaleco",
    description: "Jaleco profissional com bordado personalizado",
    keywords: ["jaleco", "médico", "medico", "enfermagem", "saúde", "saude", "bordado"],
    slug: "jaleco-bordado",
    type: "product",
    imageUrl: "/lovable-uploads/7258c407-8a22-427b-a486-5e2bc2170d5f.png"
  },
  {
    id: "310", // ID matching portfolio necessaire
    name: "Necessaire Bordada",
    category: "bordado-necessaire",
    description: "Necessaire com bordados personalizados",
    keywords: ["necessaire", "bolsa", "personalizada", "bordado"],
    slug: "necessaire-bordada",
    type: "portfolio",
    imageUrl: "/lovable-uploads/0a4859ea-7a2a-45c7-ac73-e7f7a709aab4.png"
  },
  {
    id: "150", // ID matching product in ProductDetailPage
    name: "Kit Infantil Bordado",
    category: "infantil",
    description: "Kit completo de itens bordados para bebês e crianças",
    keywords: ["infantil", "bebê", "bebe", "criança", "crianca", "kit", "bordado"],
    slug: "kit-infantil-bordado",
    type: "product",
    imageUrl: "/lovable-uploads/120d7ca4-3d83-432d-81df-5bcf1993da75.png"
  },
  {
    id: "102", // ID matching product in ProductDetailPage
    name: "Jogo de Toalhas Casal",
    category: "cama",
    description: "Jogo completo de toalhas bordadas para casal",
    keywords: ["toalhas", "jogo", "casal", "cama", "bordado"],
    slug: "jogo-toalhas-casal",
    type: "product",
    imageUrl: "/lovable-uploads/620a0828-61e3-409b-8639-64b8d65f538c.png"
  },
  {
    id: "320", // ID matching portfolio bolsa
    name: "Bolsa Bordada Personalizada",
    category: "bordado-bolsa",
    description: "Bolsa com bordados personalizados exclusivos",
    keywords: ["bolsa", "personalizada", "bordado", "acessório", "acessorio"],
    slug: "bolsa-bordada-personalizada",
    type: "portfolio",
    imageUrl: "/lovable-uploads/cb60af2d-a399-4029-ab74-6f5374d38b9c.png"
  },
  {
    id: "350", // ID matching portfolio toalha
    name: "Toalha de Mesa Bordada",
    category: "mesa-cozinha",
    description: "Toalha de mesa com bordados elegantes",
    keywords: ["toalha", "mesa", "jantar", "cozinha", "bordado", "refeição", "refeicao"],
    slug: "toalha-mesa-bordada",
    type: "product",
    imageUrl: "/lovable-uploads/620a0828-61e3-409b-8639-64b8d65f538c.png"
  }
];

// Function to search products based on query - now with improved matching
export function searchProducts(query: string): Product[] {
  if (!query) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  const results = products.filter(product => {
    // Check product name - higher priority
    if (product.name.toLowerCase().includes(query.toLowerCase())) return true;
    
    // Check category - medium priority
    if (product.category.toLowerCase().includes(query.toLowerCase())) return true;
    
    // Check description - medium priority
    if (product.description.toLowerCase().includes(query.toLowerCase())) return true;
    
    // Check keywords - for partial matches across terms
    if (product.keywords) {
      for (const term of searchTerms) {
        if (product.keywords.some(keyword => keyword.toLowerCase().includes(term))) {
          return true;
        }
      }
    }
    
    return false;
  });

  // Sort results by relevance - exact matches first, then partial matches
  return results.sort((a, b) => {
    const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
    const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());
    
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    
    return 0;
  });
}

// Function to get product URL - updated to ensure correct paths for portfolio items
export function getProductUrl(product: Product): string {
  // All products and portfolio items should go to the product detail page
  return `/produto/${product.id}`;
}
