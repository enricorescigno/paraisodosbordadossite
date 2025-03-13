
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
  image: string; // Added image field to the interface
}

// Sample product database - In a real app, you would fetch this from an API
export const products: Product[] = [
  {
    id: "101", // ID matching ProductDetailPage
    name: "Kit Bordado Cama, Mesa e Banho",
    category: "banho",
    description: "Kit completo de bordados para cama, mesa e banho feito com materiais premium e acabamento impecável.",
    keywords: ["toalha", "personalizada", "bordado", "banho", "presente", "kit"],
    slug: "kit-bordado-cama-mesa-banho",
    type: "product",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "301", // ID matching portfolio item in ProductDetailPage
    name: "Boné Personalizado Empresarial",
    category: "bordado-bone",
    description: "Boné de alta qualidade com bordado personalizado para sua empresa",
    keywords: ["boné", "bone", "personalizado", "empresarial", "bordado", "empresa"],
    slug: "bone-personalizado-empresarial",
    type: "portfolio",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "330", // ID matching portfolio jaleco
    name: "Jaleco Bordado",
    category: "jaleco",
    description: "Jaleco profissional com bordado personalizado",
    keywords: ["jaleco", "médico", "medico", "enfermagem", "saúde", "saude", "bordado"],
    slug: "jaleco-bordado",
    type: "product",
    image: "https://images.unsplash.com/photo-1624711478065-83f88a296aad?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "310", // ID matching portfolio necessaire
    name: "Necessaire Bordada",
    category: "bordado-necessaire",
    description: "Necessaire com bordados personalizados",
    keywords: ["necessaire", "bolsa", "personalizada", "bordado"],
    slug: "necessaire-bordada",
    type: "portfolio",
    image: "https://images.unsplash.com/photo-1596266651066-9d0033df4afd?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "150", // ID matching product in ProductDetailPage
    name: "Kit Infantil Bordado",
    category: "infantil",
    description: "Kit completo de itens bordados para bebês e crianças",
    keywords: ["infantil", "bebê", "bebe", "criança", "crianca", "kit", "bordado"],
    slug: "kit-infantil-bordado",
    type: "product",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "102", // ID matching product in ProductDetailPage
    name: "Jogo de Toalhas Casal",
    category: "cama",
    description: "Jogo completo de toalhas bordadas para casal",
    keywords: ["toalhas", "jogo", "casal", "cama", "bordado"],
    slug: "jogo-toalhas-casal",
    type: "product",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "320", // ID matching portfolio bolsa
    name: "Bolsa Bordada Personalizada",
    category: "bordado-bolsa",
    description: "Bolsa com bordados personalizados exclusivos",
    keywords: ["bolsa", "personalizada", "bordado", "acessório", "acessorio"],
    slug: "bolsa-bordada-personalizada",
    type: "portfolio",
    image: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "350", // ID matching portfolio toalha
    name: "Toalha de Mesa Bordada",
    category: "mesa-cozinha",
    description: "Toalha de mesa com bordados elegantes",
    keywords: ["toalha", "mesa", "jantar", "cozinha", "bordado", "refeição", "refeicao"],
    slug: "toalha-mesa-bordada",
    type: "product",
    image: "https://images.unsplash.com/photo-1623393945964-5f6bb1ed6c21?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "140", // Adding matching ID for toalha de banho
    name: "Toalha de Banho Bordada",
    category: "banho",
    description: "Toalha de banho personalizada com bordados de alta qualidade",
    keywords: ["toalha", "banho", "bordado", "personalizada"],
    slug: "toalha-banho-bordada",
    type: "product",
    image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e7?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "130", // Adding tapete product
    name: "Tapete Artesanal Bordado",
    category: "tapete-cortinas",
    description: "Tapete artesanal com bordados detalhados para decorar sua casa",
    keywords: ["tapete", "artesanal", "bordado", "decoração"],
    slug: "tapete-artesanal-bordado",
    type: "product",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "160", // Adding matching ID for camisa
    name: "Camisa Bordada Social",
    category: "camisa",
    description: "Camisa social com bordados elegantes, perfeita para ocasiões especiais",
    keywords: ["camisa", "social", "bordado", "vestuário"],
    slug: "camisa-bordada-social",
    type: "product",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=500&auto=format&fit=crop"
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
