
import { ProductEntity } from '../../domain/entities/ProductEntity';
import { ProductImage } from '../../domain/value-objects/ProductImage';
import { IImageProcessor } from '../../domain/services/IImageProcessor';

export interface ProcessImagesResult {
  images: ProductImage[];
  primaryImage: ProductImage | null;
  hasImages: boolean;
}

export class ProcessProductImagesUseCase {
  constructor(private readonly imageProcessor: IImageProcessor) {}

  execute(product: ProductEntity, selectedColor?: string): ProcessImagesResult {
    if (!product) {
      throw new Error('Product is required');
    }

    try {
      let images = product.images;

      // Filter by color if specified
      if (selectedColor && product.variants.isValidColor(selectedColor)) {
        images = product.getImagesForColor(selectedColor);
      }

      // If no images for the selected color, fallback to all images
      if (images.length === 0) {
        images = product.images;
      }

      // Preload critical images
      this.preloadCriticalImages(images);

      const primaryImage = product.getPrimaryImage();

      return {
        images,
        primaryImage,
        hasImages: images.length > 0
      };
    } catch (error) {
      console.error('Error processing product images:', error);
      throw new Error(`Failed to process images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async preloadCriticalImages(images: ProductImage[]): Promise<void> {
    // Preload only the first 3 images for performance
    const criticalImages = images.slice(0, 3);
    
    const preloadPromises = criticalImages.map(async (image) => {
      try {
        await this.imageProcessor.preloadImage(image.url);
      } catch (error) {
        console.warn(`Failed to preload image: ${image.url}`, error);
      }
    });

    // Don't wait for preloading to complete
    Promise.all(preloadPromises).catch(error => {
      console.warn('Some images failed to preload:', error);
    });
  }
}
