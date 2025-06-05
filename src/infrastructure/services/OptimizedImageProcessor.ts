
import { ProductImage } from '../../domain/value-objects/ProductImage';
import { IImageProcessor } from '../../domain/services/IImageProcessor';

export class OptimizedImageProcessor implements IImageProcessor {
  private imageCache = new Map<string, boolean>();

  processImages(images: any, selectedColor?: string): ProductImage[] {
    if (!images) return [];

    const processedImages: ProductImage[] = [];

    try {
      // Handle array of images
      if (Array.isArray(images)) {
        images.forEach((url, index) => {
          if (this.validateImageUrl(url)) {
            processedImages.push(new ProductImage(url, index === 0));
          }
        });
      }
      
      // Handle images by color
      else if (typeof images === 'object' && images !== null) {
        const colorImages = selectedColor && images[selectedColor] 
          ? images[selectedColor] 
          : Object.values(images)[0];
        
        if (Array.isArray(colorImages)) {
          colorImages.forEach((url, index) => {
            if (this.validateImageUrl(url)) {
              processedImages.push(new ProductImage(url, index === 0, selectedColor));
            }
          });
        }
      }
    } catch (error) {
      console.error('Error processing images:', error);
    }

    return processedImages;
  }

  getOptimizedUrl(url: string, width?: number): string {
    if (!this.validateImageUrl(url)) return '';
    
    // Don't modify external URLs
    if (url.startsWith('http') && !url.includes(window.location.origin)) {
      return url;
    }
    
    // For local images, just return the URL for now
    return url;
  }

  async preloadImage(url: string): Promise<void> {
    if (!this.validateImageUrl(url) || this.imageCache.has(url)) {
      return;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      const cleanup = () => {
        img.onload = null;
        img.onerror = null;
      };
      
      img.onload = () => {
        this.imageCache.set(url, true);
        cleanup();
        resolve();
      };
      
      img.onerror = () => {
        cleanup();
        reject(new Error(`Failed to load image: ${url}`));
      };
      
      img.src = url;
      
      // Timeout after 10 seconds
      setTimeout(() => {
        cleanup();
        reject(new Error(`Image load timeout: ${url}`));
      }, 10000);
    });
  }

  validateImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    const trimmedUrl = url.trim();
    if (trimmedUrl === '') return false;
    
    // Allow data URLs, HTTP/HTTPS URLs, and local paths
    return trimmedUrl.startsWith('data:') || 
           trimmedUrl.startsWith('http') || 
           trimmedUrl.startsWith('/') ||
           trimmedUrl.startsWith('./');
  }
}
