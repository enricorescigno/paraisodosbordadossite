
import localDbService from './localDbService';
import { Product, Category, ProductImage, ColorOption } from '../types/database';

// Simulate API delay to mimic real-world experience
const simulateNetworkDelay = (ms: number = 300) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// API service with methods that mimic real API calls
const apiService = {
  // Category endpoints
  getCategories: async (): Promise<Category[]> => {
    await simulateNetworkDelay();
    return localDbService.getCategories();
  },
  
  getCategoryById: async (id: number | string): Promise<Category | null> => {
    await simulateNetworkDelay();
    return localDbService.getCategoryById(id);
  },
  
  getMainCategories: async (type: 'product' | 'portfolio'): Promise<Category[]> => {
    await simulateNetworkDelay();
    return localDbService.getCategoriesByParent(null).filter(cat => cat.type === type);
  },
  
  getSubcategories: async (parentId: number | string): Promise<Category[]> => {
    await simulateNetworkDelay();
    return localDbService.getCategoriesByParent(parentId);
  },
  
  createCategory: async (category: Omit<Category, 'id'>): Promise<Category> => {
    await simulateNetworkDelay();
    return localDbService.createCategory(category);
  },
  
  updateCategory: async (id: number | string, updates: Partial<Category>): Promise<Category | null> => {
    await simulateNetworkDelay();
    return localDbService.updateCategory(id, updates);
  },
  
  deleteCategory: async (id: number | string): Promise<boolean> => {
    await simulateNetworkDelay();
    return localDbService.deleteCategory(id);
  },
  
  // Product endpoints
  getProducts: async (): Promise<Product[]> => {
    await simulateNetworkDelay();
    return localDbService.getProducts();
  },
  
  getProductById: async (id: number | string): Promise<Product | null> => {
    await simulateNetworkDelay();
    return localDbService.getProductById(id);
  },
  
  getProductsByType: async (type: 'product' | 'portfolio'): Promise<Product[]> => {
    await simulateNetworkDelay();
    return localDbService.getProductsByType(type);
  },
  
  getProductsByCategory: async (categoryId: number | string): Promise<Product[]> => {
    await simulateNetworkDelay();
    return localDbService.getProductsByCategory(categoryId);
  },
  
  getHighlightedProducts: async (): Promise<Product[]> => {
    await simulateNetworkDelay();
    return localDbService.getHighlightedProducts();
  },
  
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    await simulateNetworkDelay();
    return localDbService.createProduct(product);
  },
  
  updateProduct: async (id: number | string, updates: Partial<Product>): Promise<Product | null> => {
    await simulateNetworkDelay();
    return localDbService.updateProduct(id, updates);
  },
  
  deleteProduct: async (id: number | string): Promise<boolean> => {
    await simulateNetworkDelay();
    return localDbService.deleteProduct(id);
  },
  
  // Product Image endpoints
  getProductImages: async (productId: number | string): Promise<ProductImage[]> => {
    await simulateNetworkDelay();
    return localDbService.getImagesByProductId(productId);
  },
  
  getProductImagesByColor: async (productId: number | string, colorId: string | null): Promise<ProductImage[]> => {
    await simulateNetworkDelay();
    return localDbService.getImagesByProductAndColor(productId, colorId);
  },
  
  addProductImage: async (image: Omit<ProductImage, 'id'>): Promise<ProductImage> => {
    await simulateNetworkDelay();
    return localDbService.createProductImage(image);
  },
  
  updateProductImage: async (id: number | string, updates: Partial<ProductImage>): Promise<ProductImage | null> => {
    await simulateNetworkDelay();
    return localDbService.updateProductImage(id, updates);
  },
  
  deleteProductImage: async (id: number | string): Promise<boolean> => {
    await simulateNetworkDelay();
    return localDbService.deleteProductImage(id);
  },
  
  // Color endpoints
  getColors: async (): Promise<ColorOption[]> => {
    await simulateNetworkDelay();
    return localDbService.getColors();
  },
  
  getColorById: async (id: string): Promise<ColorOption | null> => {
    await simulateNetworkDelay();
    return localDbService.getColorById(id);
  },
  
  // Special operations
  resetDatabase: async (): Promise<void> => {
    await simulateNetworkDelay();
    localDbService.resetDatabase();
  },
  
  // Custom business logic operations
  getProductsWithImages: async (type: 'product' | 'portfolio' = 'product'): Promise<any[]> => {
    await simulateNetworkDelay();
    
    const products = localDbService.getProductsByType(type);
    const result = [];
    
    for (const product of products) {
      const images = localDbService.getImagesByProductId(product.id);
      const category = localDbService.getCategoryById(product.category_id);
      
      result.push({
        ...product,
        category: category?.name || '',
        images: images.map(img => img.image_url),
        imagesByColor: product.colors?.reduce((acc: any, color: string) => {
          const colorId = color.toLowerCase().replace(/\s+/g, '-');
          const colorImages = localDbService.getImagesByProductAndColor(product.id, colorId)
            .map(img => img.image_url);
          
          if (colorImages.length > 0) {
            acc[color] = colorImages;
          }
          
          return acc;
        }, {})
      });
    }
    
    return result;
  },
  
  getProductWithImagesById: async (id: number | string): Promise<any | null> => {
    await simulateNetworkDelay();
    
    const product = localDbService.getProductById(id);
    if (!product) return null;
    
    const images = localDbService.getImagesByProductId(product.id);
    const category = localDbService.getCategoryById(product.category_id);
    
    const imagesByColor: Record<string, string[]> = {};
    
    if (product.colors && product.colors.length > 0) {
      for (const color of product.colors) {
        const colorId = color.toLowerCase().replace(/\s+/g, '-');
        const colorImages = localDbService.getImagesByProductAndColor(product.id, colorId)
          .map(img => img.image_url);
        
        if (colorImages.length > 0) {
          imagesByColor[color] = colorImages;
        }
      }
    }
    
    return {
      ...product,
      category: category?.name || '',
      images: images.map(img => img.image_url),
      imagesByColor
    };
  },
  
  getProductsByCategorySlug: async (categorySlug: string): Promise<any[]> => {
    await simulateNetworkDelay();
    
    const categories = localDbService.getCategories();
    const category = categories.find((cat: Category) => cat.slug === categorySlug);
    
    if (!category) return [];
    
    // Get all subcategories if this is a parent category
    const subcategories = categories.filter((cat: Category) => cat.parent_id === category.id);
    const categoryIds = [category.id, ...subcategories.map((cat: Category) => cat.id)];
    
    // Get products for all these categories
    const allProducts = localDbService.getProducts();
    const products = allProducts.filter((prod: Product) => categoryIds.includes(prod.category_id));
    
    // Enrich with images and category info
    const result = [];
    
    for (const product of products) {
      const images = localDbService.getImagesByProductId(product.id);
      const productCategory = localDbService.getCategoryById(product.category_id);
      
      result.push({
        ...product,
        category: productCategory?.name || '',
        images: images.map(img => img.image_url),
        imagesByColor: product.colors?.reduce((acc: any, color: string) => {
          const colorId = color.toLowerCase().replace(/\s+/g, '-');
          const colorImages = localDbService.getImagesByProductAndColor(product.id, colorId)
            .map(img => img.image_url);
          
          if (colorImages.length > 0) {
            acc[color] = colorImages;
          }
          
          return acc;
        }, {})
      });
    }
    
    return result;
  }
};

export default apiService;
