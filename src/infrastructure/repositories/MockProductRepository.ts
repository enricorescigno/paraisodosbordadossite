
import { ProductEntity, ProductEntityData } from '../../domain/entities/ProductEntity';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { allProducts } from '../../utils/products';

export class MockProductRepository implements IProductRepository {
  private products: ProductEntity[] = [];

  constructor() {
    this.initializeProducts();
  }

  async findById(id: string | number): Promise<ProductEntity | null> {
    const product = this.products.find(p => p.id.toString() === id.toString());
    return product || null;
  }

  async findAll(): Promise<ProductEntity[]> {
    return [...this.products];
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    return this.products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  async findByType(type: 'product' | 'portfolio'): Promise<ProductEntity[]> {
    return this.products.filter(p => p.type === type);
  }

  async search(query: string): Promise<ProductEntity[]> {
    const normalizedQuery = query.toLowerCase().trim();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery)
    );
  }

  private initializeProducts(): void {
    try {
      this.products = allProducts.map(productData => {
        try {
          // Convert legacy product data to ProductEntityData format
          const entityData: ProductEntityData = {
            id: productData.id,
            name: productData.name || 'Produto sem nome',
            type: (productData.type as 'product' | 'portfolio') || 'product',
            category: productData.category || 'Sem categoria',
            description: productData.description,
            imageUrl: productData.imageUrl,
            images: this.convertImages(productData.images),
            colors: productData.colors,
            sizes: productData.sizes,
            price: this.convertPrice(productData.price),
            rating: this.convertRating(productData.rating),
            isNew: productData.isNew,
            features: productData.features
          };

          return new ProductEntity(entityData);
        } catch (error) {
          console.error(`Error creating product entity for ${productData.id}:`, error);
          
          // Return a fallback product entity
          return new ProductEntity({
            id: productData.id,
            name: productData.name || 'Produto sem nome',
            type: 'product',
            category: productData.category || 'Sem categoria',
            description: productData.description,
            imageUrl: productData.imageUrl,
            images: [],
            colors: productData.colors,
            sizes: productData.sizes,
            price: this.convertPrice(productData.price),
            rating: this.convertRating(productData.rating),
            isNew: productData.isNew,
            features: productData.features
          });
        }
      });
      
      console.log(`Initialized ${this.products.length} products`);
    } catch (error) {
      console.error('Error initializing products:', error);
      this.products = [];
    }
  }

  private convertImages(images: any): string[] | Record<string, string[]> {
    if (!images) return [];
    
    // If it's already in the correct format, return as is
    if (Array.isArray(images)) return images;
    
    // If it's an object but not ImageCollection, assume it's Record<string, string[]>
    if (typeof images === 'object' && !('primary' in images) && !('gallery' in images)) {
      return images;
    }
    
    // If it's ImageCollection, convert to simple array
    if (typeof images === 'object' && ('primary' in images || 'gallery' in images)) {
      const result: string[] = [];
      
      if (images.primary) {
        if (Array.isArray(images.primary)) {
          images.primary.forEach((img: any) => {
            const url = typeof img === 'string' ? img : img?.url;
            if (url) result.push(url);
          });
        } else if (typeof images.primary === 'string') {
          result.push(images.primary);
        } else if (images.primary?.url) {
          result.push(images.primary.url);
        }
      }
      
      if (images.gallery && Array.isArray(images.gallery)) {
        images.gallery.forEach((img: any) => {
          const url = typeof img === 'string' ? img : img?.url;
          if (url) result.push(url);
        });
      }
      
      return result;
    }
    
    return [];
  }

  private convertPrice(price: any): string {
    if (!price) return '';
    if (typeof price === 'string') return price;
    if (typeof price === 'object' && price.value) return price.value;
    return '';
  }

  private convertRating(rating: any): number {
    if (!rating) return 4.8;
    if (typeof rating === 'number') return rating;
    if (typeof rating === 'object' && rating.value) return rating.value;
    return 4.8;
  }
}
