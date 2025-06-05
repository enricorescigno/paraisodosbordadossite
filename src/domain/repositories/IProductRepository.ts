
import { ProductEntity } from '../entities/ProductEntity';

export interface IProductRepository {
  findById(id: string | number): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
  findByCategory(category: string): Promise<ProductEntity[]>;
  findByType(type: 'product' | 'portfolio'): Promise<ProductEntity[]>;
  search(query: string): Promise<ProductEntity[]>;
}
