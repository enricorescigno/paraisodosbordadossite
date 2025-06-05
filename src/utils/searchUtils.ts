
import { Product, ProductCategory } from '../types/product';
import { allProducts } from './products';

// Export products for other components
export const products = allProducts;

const categoryMappings: Record<string, ProductCategory> = {
  'camisa': 'Vestuário',
  'camiseta': 'Vestuário', 
  'polo': 'Vestuário',
  'blusa': 'Vestuário',
  'uniforme': 'Vestuário',
  'jaleco': 'Bordado em Fardamentos',
  'avental': 'Vestuário',
  'calça': 'Vestuário',
  'bermuda': 'Vestuário',
  'shorts': 'Vestuário',
  'saia': 'Vestuário',
  'vestido': 'Vestuário',
  'necessaire': 'Bordado em Necessaire',
  'necessaire bordada': 'Bordado em Necessaire',
  'bordado necessaire': 'Bordado em Necessaire',
  'bolsa': 'Bordado em Bolsa',
  'bolsa bordada': 'Bordado em Bolsa',
  'bordado bolsa': 'Bordado em Bolsa',
  'toalha': 'Banho',
  'toalha de banho': 'Bordado em Toalha de Banho',
  'toalha de rosto': 'Bordado em Toalha de Rosto', 
  'roupão': 'Banho',
  'pantufa': 'Vestuário',
  'chinelo': 'Vestuário',
  'infantil': 'Infantil',
  'criança': 'Infantil',
  'bebê': 'Infantil',
  'boné': 'Bonés',
  'bone': 'Bonés',
  'chapéu': 'Bonés',
  'bordado': 'Bordados',
  'bordados': 'Bordados',
  'personalizado': 'Bordados',
  'customizado': 'Bordados'
};

export const searchProducts = (productsArray: Product[] | string, query?: string): Product[] => {
  // Handle both old and new calling patterns
  let actualProducts: Product[];
  let actualQuery: string;
  
  if (typeof productsArray === 'string') {
    // Old pattern: searchProducts(query)
    actualProducts = products;
    actualQuery = productsArray;
  } else {
    // New pattern: searchProducts(products, query)
    actualProducts = productsArray;
    actualQuery = query || '';
  }
  
  if (!actualQuery.trim()) return actualProducts;
  
  const normalizedQuery = actualQuery.toLowerCase().trim();
  
  return actualProducts.filter(product => {
    // Search in product name
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search in description
    if (product.description?.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search in category
    if (product.category.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search in tags
    if (product.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    
    // Search in keywords
    if (product.keywords?.some(keyword => keyword.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    
    // Search by mapped category
    const mappedCategory = categoryMappings[normalizedQuery];
    if (mappedCategory && product.category === mappedCategory) {
      return true;
    }
    
    return false;
  });
};

export const getCategoryFromSearch = (query: string): ProductCategory | null => {
  const normalizedQuery = query.toLowerCase().trim();
  return categoryMappings[normalizedQuery] || null;
};

export const getSearchSuggestions = (products: Product[], query: string): string[] => {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const suggestions = new Set<string>();
  
  products.forEach(product => {
    // Add product names that match
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(product.name);
    }
    
    // Add categories that match
    if (product.category.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(product.category);
    }
    
    // Add tags that match
    product.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(tag);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, 5);
};

export const getProductUrl = (product: Product): string => {
  return `/produto/${product.id}`;
};
