
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
          return new ProductEntity(productData as ProductEntityData);
        } catch (error) {
          console.error(`Error creating product entity for ${productData.id}:`, error);
          // Return a fallback product entity
          return new ProductEntity({
            id: productData.id,
            name: productData.name || 'Produto sem nome',
            type: (productData.type as 'product' | 'portfolio') || 'product',
            category: productData.category || 'Sem categoria',
            description: productData.description,
            imageUrl: productData.imageUrl,
            images: productData.images,
            colors: productData.colors,
            sizes: productData.sizes,
            price: productData.price,
            rating: productData.rating,
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
}
