
import { ProductEntity } from '../../domain/entities/ProductEntity';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

export class FindProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string | number): Promise<ProductEntity | null> {
    if (!id) {
      throw new Error('Product ID is required');
    }

    try {
      const product = await this.productRepository.findById(id);
      
      if (!product) {
        console.warn(`Product with ID ${id} not found`);
        return null;
      }

      return product;
    } catch (error) {
      console.error('Error finding product by ID:', error);
      throw new Error(`Failed to find product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
