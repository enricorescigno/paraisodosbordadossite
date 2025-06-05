
import { Product } from '@/types/product';
import { allProducts } from '@/utils/productUtils';

export class ProductService {
  private static instance: ProductService;
  private cache: Map<string, Product> = new Map();
  private products: Product[] = [];

  private constructor() {
    this.products = allProducts;
    this.initializeCache();
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  private initializeCache(): void {
    this.products.forEach(product => {
      this.cache.set(String(product.id), product);
    });
  }

  public async getAllProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.products];
  }

  public async getProductById(id: string | number): Promise<Product | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.cache.get(String(id)) || null;
  }

  public async getProductsByCategory(category: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.products.filter(product =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  public async searchProducts(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const searchTerm = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      (product.description && product.description.toLowerCase().includes(searchTerm)) ||
      (product.keywords && product.keywords.some(keyword =>
        keyword.toLowerCase().includes(searchTerm)
      ))
    );
  }

  public async getFeaturedProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.products.filter(product => product.featured);
  }

  public async getNewProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.products.filter(product => product.isNew);
  }

  public getCategories(): string[] {
    const categories = new Set(this.products.map(p => p.category));
    return Array.from(categories).sort();
  }

  public getAvailableColors(): string[] {
    const colors = new Set<string>();
    this.products.forEach(product => {
      if (product.colors) {
        product.colors.forEach(color => colors.add(color));
      }
    });
    return Array.from(colors).sort();
  }

  public invalidateCache(): void {
    this.cache.clear();
    this.initializeCache();
  }
}

export const productService = ProductService.getInstance();
