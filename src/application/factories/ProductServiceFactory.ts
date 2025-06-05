
import { FindProductByIdUseCase } from '../use-cases/FindProductByIdUseCase';
import { ProcessProductImagesUseCase } from '../use-cases/ProcessProductImagesUseCase';
import { MockProductRepository } from '../../infrastructure/repositories/MockProductRepository';
import { OptimizedImageProcessor } from '../../infrastructure/services/OptimizedImageProcessor';

export class ProductServiceFactory {
  private static productRepository = new MockProductRepository();
  private static imageProcessor = new OptimizedImageProcessor();

  static createFindProductByIdUseCase(): FindProductByIdUseCase {
    return new FindProductByIdUseCase(this.productRepository);
  }

  static createProcessProductImagesUseCase(): ProcessProductImagesUseCase {
    return new ProcessProductImagesUseCase(this.imageProcessor);
  }

  static getProductRepository() {
    return this.productRepository;
  }

  static getImageProcessor() {
    return this.imageProcessor;
  }
}
