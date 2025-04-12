// This file provides search functionality across products
import { Product } from '../types/product';
import { pantufaProducts, vestuarioProducts, banhoProducts, camaProducts, mesaCozinhaProducts } from './products';

// Sample product database - In a real app, you would fetch this from an API
const sampleProducts: Product[] = [
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
    id: "320", // ID matching portfolio bolsa
    name: "Bolsa Bordada Personalizada",
    category: "bordado-bolsa",
    description: "Bolsa com bordados personalizados exclusivos",
    keywords: ["bolsa", "personalizada", "bordado", "acessório", "acessorio"],
    slug: "bolsa-bordada-personalizada",
    type: "portfolio",
    imageUrl: "/lovable-uploads/cb60af2d-a399-4029-ab74-6f5374d38b9c.png"
  }
];

// Create keywords for pantufaProducts if they don't have them
const pantufasWithKeywords = pantufaProducts.map(product => ({
  ...product,
  keywords: product.keywords || ['pantufa', 'pantufas', 'conforto', 'calçado', product.name.toLowerCase()],
  slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
}));

// Create keywords for vestuarioProducts if they don't have them
const vestuarioWithKeywords = vestuarioProducts.map(product => ({
  ...product,
  keywords: product.keywords || ['vestuário', 'camisa', 'uniforme', 'bordado', product.name.toLowerCase()],
  slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
}));

// Create keywords for banhoProducts if they don't have them
const banhoWithKeywords = banhoProducts.map(product => ({
  ...product,
  keywords: product.keywords || ['banho', 'toalha', 'roupão', 'toalha de rosto', 'toalha de banho', product.name.toLowerCase()],
  slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
}));

// Create keywords for camaProducts if they don't have them
const camaWithKeywords = camaProducts.map(product => ({
  ...product,
  keywords: product.keywords || ['cama', 'jogo de cama', 'travesseiro', 'lençol', product.name.toLowerCase()],
  slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
}));

// Create keywords for mesaCozinhaProducts if they don't have them
const mesaCozinhaWithKeywords = mesaCozinhaProducts.map(product => ({
  ...product,
  keywords: product.keywords || ['mesa', 'cozinha', 'toalha de mesa', 'jogo americano', product.name.toLowerCase()],
  slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
}));

export const products: Product[] = [...sampleProducts, ...pantufasWithKeywords, ...vestuarioWithKeywords, ...banhoWithKeywords, ...camaWithKeywords, ...mesaCozinhaWithKeywords];

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
    if (product.description && product.description.toLowerCase().includes(normalizedQuery)) {
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
