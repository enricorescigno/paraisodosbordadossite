
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheService {
  private static instance: CacheService;
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    // Clean up expired items every minute
    setInterval(() => this.cleanup(), 60 * 1000);
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  public get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  public has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  public getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  // Product-specific cache methods
  public cacheProduct(productId: string, product: any): void {
    this.set(`product:${productId}`, product, 10 * 60 * 1000); // 10 minutes
  }

  public getCachedProduct(productId: string): any | null {
    return this.get(`product:${productId}`);
  }

  public cacheProductList(key: string, products: any[]): void {
    this.set(`products:${key}`, products, 5 * 60 * 1000); // 5 minutes
  }

  public getCachedProductList(key: string): any[] | null {
    return this.get(`products:${key}`);
  }

  // Image-specific cache methods
  public cacheImageData(url: string, data: any): void {
    this.set(`image:${url}`, data, 30 * 60 * 1000); // 30 minutes
  }

  public getCachedImageData(url: string): any | null {
    return this.get(`image:${url}`);
  }
}

export const cacheService = CacheService.getInstance();
