
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

// Function to search products based on query - with improved matching and prioritization
export function searchProducts(query: string): Product[] {
  if (!query || query.trim().length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 0);
  
  // Score-based search for better relevance
  const scoredResults = products.map(product => {
    let score = 0;
    
    // Check for exact product name match (highest priority)
    if (product.name.toLowerCase() === normalizedQuery) {
      score += 100;
    }
    // Check for partial product name match
    else if (product.name.toLowerCase().includes(normalizedQuery)) {
      score += 50;
    }
    
    // Check individual terms in product name
    for (const term of searchTerms) {
      if (product.name.toLowerCase().includes(term)) {
        score += 30;
      }
    }
    
    // Check keywords
    if (product.keywords) {
      // Check for exact keyword match
      if (product.keywords.some(keyword => keyword.toLowerCase() === normalizedQuery)) {
        score += 40;
      }
      // Check for keyword partial matches
      for (const term of searchTerms) {
        const matchingKeywords = product.keywords.filter(keyword => 
          keyword.toLowerCase().includes(term)
        );
        score += matchingKeywords.length * 10;
      }
    }
    
    // Check category
    if (product.category.toLowerCase().includes(normalizedQuery)) {
      score += 20;
    }
    
    // Check description (lowest priority)
    if (product.description.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }
    
    return { product, score };
  });
  
  // Filter out products with no relevance and sort by score
  const filteredResults = scoredResults
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.product);
  
  return filteredResults;
}

// Function to get product URL
export function getProductUrl(product: Product): string {
  return `/produto/${product.id}`;
}
