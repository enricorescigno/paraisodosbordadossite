
import { Product, LegacyProduct, ProductCategory } from '../types/product';

export class ProductService {
  private static instance: ProductService;
  private products: Product[] = [];

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  public setProducts(products: Product[]): void {
    this.products = products;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getProductById(id: string | number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  public getProductsByCategory(category: ProductCategory): Product[] {
    return this.products.filter(product => product.category === category);
  }

  public searchProducts(query: string): Product[] {
    const normalizedQuery = query.toLowerCase().trim();
    
    return this.products.filter(product => {
      const searchableText = [
        product.name,
        product.description,
        ...(product.keywords || []),
        ...(product.tags || [])
      ].join(' ').toLowerCase();
      
      return searchableText.includes(normalizedQuery);
    });
  }

  public getNewProducts(): Product[] {
    return this.products.filter(product => product.isNew);
  }

  public getFeaturedProducts(): Product[] {
    return this.products.filter(product => product.isFeatured);
  }
}
