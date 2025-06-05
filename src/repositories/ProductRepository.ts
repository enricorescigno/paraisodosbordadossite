
import { type ProductUnion } from '@/types/product-base';
import { ProductValidator } from '@/services/ProductValidator';

export interface ProductFilters {
  category?: string;
  type?: 'product' | 'portfolio';
  featured?: boolean;
  isNew?: boolean;
  isAvailable?: boolean;
  colors?: string[];
  priceRange?: { min?: number; max?: number };
  search?: string;
}

export interface ProductQueryOptions {
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'rating' | 'createdAt' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export class ProductRepository {
  private products: ProductUnion[] = [];

  constructor(products: any[] = []) {
    this.setProducts(products);
  }

  setProducts(products: any[]): void {
    try {
      this.products = ProductValidator.validateProductArray(products);
    } catch (error) {
      console.error('Error validating products:', error);
      this.products = [];
    }
  }

  findById(id: string | number): ProductUnion | null {
    const stringId = String(id);
    return this.products.find(p => String(p.id) === stringId) || null;
  }

  findBySlug(slug: string): ProductUnion | null {
    return this.products.find(p => p.slug === slug) || null;
  }

  findAll(filters?: ProductFilters, options?: ProductQueryOptions): ProductUnion[] {
    let filteredProducts = [...this.products];

    // Apply filters
    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase().includes(filters.category!.toLowerCase())
        );
      }

      if (filters.type) {
        filteredProducts = filteredProducts.filter(p => p.type === filters.type);
      }

      if (filters.featured !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.featured === filters.featured);
      }

      if (filters.isNew !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.isNew === filters.isNew);
      }

      if (filters.isAvailable !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.isAvailable === filters.isAvailable);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchTerm) ||
          (p.description && p.description.toLowerCase().includes(searchTerm)) ||
          (p.keywords && p.keywords.some(k => k.toLowerCase().includes(searchTerm)))
        );
      }

      if (filters.colors && filters.colors.length > 0) {
        filteredProducts = filteredProducts.filter(p => {
          const productColors = 'colors' in p ? p.colors : undefined;
          return productColors && filters.colors!.some(color => 
            productColors.includes(color)
          );
        });
      }
    }

    // Apply sorting
    if (options?.sortBy) {
      filteredProducts.sort((a, b) => {
        const field = options.sortBy!;
        let aValue = a[field as keyof ProductUnion];
        let bValue = b[field as keyof ProductUnion];

        // Handle undefined values
        if (aValue === undefined) aValue = '';
        if (bValue === undefined) bValue = '';

        // Handle different data types
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return options.sortOrder === 'desc' 
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return options.sortOrder === 'desc' 
            ? bValue - aValue
            : aValue - bValue;
        }

        return 0;
      });
    }

    // Apply pagination
    if (options?.offset !== undefined || options?.limit !== undefined) {
      const offset = options.offset || 0;
      const limit = options.limit || filteredProducts.length;
      filteredProducts = filteredProducts.slice(offset, offset + limit);
    }

    return filteredProducts;
  }

  findByCategory(category: string): ProductUnion[] {
    return this.findAll({ category });
  }

  findFeatured(): ProductUnion[] {
    return this.findAll({ featured: true });
  }

  findNew(): ProductUnion[] {
    return this.findAll({ isNew: true });
  }

  getCategories(): string[] {
    const categories = new Set(this.products.map(p => p.category));
    return Array.from(categories).sort();
  }

  getStats() {
    return {
      total: this.products.length,
      byType: {
        product: this.products.filter(p => p.type === 'product').length,
        portfolio: this.products.filter(p => p.type === 'portfolio').length,
      },
      byCategory: this.getCategories().reduce((acc, category) => {
        acc[category] = this.findByCategory(category).length;
        return acc;
      }, {} as Record<string, number>),
      featured: this.findFeatured().length,
      new: this.findNew().length,
    };
  }
}
