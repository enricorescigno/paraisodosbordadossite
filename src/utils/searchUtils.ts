
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
}

// Sample product database - In a real app, you would fetch this from an API
export const products: Product[] = [
  {
    id: "101", // Changed ID to match the ones in ProductDetailPage
    name: "Toalha Bordada Personalizada",
    category: "banho",
    description: "Toalha de alta qualidade com bordados personalizados",
    keywords: ["toalha", "personalizada", "bordado", "banho", "presente"],
    slug: "toalha-bordada-personalizada",
    type: "product"
  },
  {
    id: "301", // Changed ID to match the portfolio item in ProductDetailPage
    name: "Boné Personalizado Empresarial",
    category: "bordado-bone",
    description: "Boné de alta qualidade com bordado personalizado para sua empresa",
    keywords: ["boné", "bone", "personalizado", "empresarial", "bordado", "empresa"],
    slug: "bone-personalizado-empresarial",
    type: "portfolio"
  },
  {
    id: "330", // Changed ID to match portfolio jaleco
    name: "Jaleco Bordado",
    category: "jaleco",
    description: "Jaleco profissional com bordado personalizado",
    keywords: ["jaleco", "médico", "medico", "enfermagem", "saúde", "saude", "bordado"],
    slug: "jaleco-bordado",
    type: "product"
  },
  {
    id: "310", // Changed ID to match portfolio necessaire
    name: "Necessaire Bordada",
    category: "bordado-necessaire",
    description: "Necessaire com bordados personalizados",
    keywords: ["necessaire", "bolsa", "personalizada", "bordado"],
    slug: "necessaire-bordada",
    type: "portfolio"
  },
  {
    id: "150", // Changed ID to match product in ProductDetailPage
    name: "Kit Infantil Bordado",
    category: "infantil",
    description: "Kit completo de itens bordados para bebês e crianças",
    keywords: ["infantil", "bebê", "bebe", "criança", "crianca", "kit", "bordado"],
    slug: "kit-infantil-bordado",
    type: "product"
  },
  {
    id: "102", // Changed ID to match product in ProductDetailPage
    name: "Jogo de Toalhas Casal",
    category: "cama",
    description: "Jogo completo de toalhas bordadas para casal",
    keywords: ["toalhas", "jogo", "casal", "cama", "bordado"],
    slug: "jogo-toalhas-casal",
    type: "product"
  },
  {
    id: "320", // Changed ID to match portfolio bolsa
    name: "Bolsa Bordada Personalizada",
    category: "bordado-bolsa",
    description: "Bolsa com bordados personalizados exclusivos",
    keywords: ["bolsa", "personalizada", "bordado", "acessório", "acessorio"],
    slug: "bolsa-bordada-personalizada",
    type: "portfolio"
  },
  {
    id: "350", // Changed ID to match portfolio toalha
    name: "Toalha de Mesa Bordada",
    category: "mesa-cozinha",
    description: "Toalha de mesa com bordados elegantes",
    keywords: ["toalha", "mesa", "jantar", "cozinha", "bordado", "refeição", "refeicao"],
    slug: "toalha-mesa-bordada",
    type: "product"
  }
];

// Function to search products based on query
export function searchProducts(query: string): Product[] {
  if (!query) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return products.filter(product => {
    // Check product name
    if (product.name.toLowerCase().includes(query.toLowerCase())) return true;
    
    // Check category
    if (product.category.toLowerCase().includes(query.toLowerCase())) return true;
    
    // Check description
    if (product.description.toLowerCase().includes(query.toLowerCase())) return true;
    
    // Check keywords
    if (product.keywords) {
      for (const term of searchTerms) {
        if (product.keywords.some(keyword => keyword.toLowerCase().includes(term))) {
          return true;
        }
      }
    }
    
    return false;
  });
}

// Function to get product URL - updated to ensure correct paths for portfolio items
export function getProductUrl(product: Product): string {
  // All products and portfolio items should go to the product detail page
  return `/produto/${product.id}`;
}
