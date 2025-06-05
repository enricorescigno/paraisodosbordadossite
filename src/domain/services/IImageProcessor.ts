
import { ProductImage } from '../value-objects/ProductImage';

export interface IImageProcessor {
  processImages(images: any, selectedColor?: string): ProductImage[];
  getOptimizedUrl(url: string, width?: number): string;
  preloadImage(url: string): Promise<void>;
  validateImageUrl(url: string): boolean;
}
