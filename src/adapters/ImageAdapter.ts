
import { type ImageCollection } from '@/types/product-base';
import { toAbsoluteURL } from '@/utils/urlUtils';
import { getImagePlaceholder } from '@/utils/imageUtils';

export interface ImageConfig {
  enableWebP?: boolean;
  enableOptimization?: boolean;
  fallbackCategory?: string;
  sizes?: number[];
}

export class ImageAdapter {
  private config: ImageConfig;

  constructor(config: ImageConfig = {}) {
    this.config = {
      enableWebP: false, // Disabled due to conversion issues
      enableOptimization: true,
      fallbackCategory: '',
      sizes: [150, 300, 600, 1200],
      ...config,
    };
  }

  normalizeImages(images: any, category?: string): ImageCollection {
    if (!images) {
      return this.createFallbackCollection(category);
    }

    if (typeof images === 'string') {
      const absoluteUrl = toAbsoluteURL(images);
      return {
        primary: absoluteUrl,
        gallery: [absoluteUrl],
      };
    }

    if (Array.isArray(images)) {
      const absoluteUrls = images.map(img => toAbsoluteURL(img));
      return {
        primary: absoluteUrls[0] || this.getFallbackImage(category),
        gallery: absoluteUrls,
      };
    }

    if (typeof images === 'object' && !Array.isArray(images)) {
      return this.normalizeObjectImages(images, category);
    }

    return this.createFallbackCollection(category);
  }

  private normalizeObjectImages(images: Record<string, any>, category?: string): ImageCollection {
    const colors = Object.keys(images);
    
    if (colors.length === 0) {
      return this.createFallbackCollection(category);
    }

    // Get first color with valid images
    const firstValidColor = colors.find(color => {
      const colorImages = images[color];
      return Array.isArray(colorImages) && colorImages.length > 0;
    });

    if (!firstValidColor) {
      return this.createFallbackCollection(category);
    }

    const colorVariants: Record<string, string[]> = {};
    
    colors.forEach(color => {
      const colorImages = images[color];
      if (Array.isArray(colorImages)) {
        colorVariants[color] = colorImages.map(img => toAbsoluteURL(img));
      }
    });

    const primaryImages = colorVariants[firstValidColor] || [];

    return {
      primary: primaryImages[0] || this.getFallbackImage(category),
      gallery: primaryImages,
      colorVariants,
    };
  }

  getImagesForColor(collection: ImageCollection, color?: string): string[] {
    if (!color || !collection.colorVariants) {
      return collection.gallery;
    }

    return collection.colorVariants[color] || collection.gallery;
  }

  getPrimaryImageForColor(collection: ImageCollection, color?: string): string {
    const images = this.getImagesForColor(collection, color);
    return images[0] || collection.primary;
  }

  private createFallbackCollection(category?: string): ImageCollection {
    const fallbackImage = this.getFallbackImage(category);
    return {
      primary: fallbackImage,
      gallery: [fallbackImage],
    };
  }

  private getFallbackImage(category?: string): string {
    return getImagePlaceholder(category || this.config.fallbackCategory || '');
  }

  generateSrcSet(imageUrl: string): string {
    if (!this.config.enableOptimization || !this.config.sizes) {
      return imageUrl;
    }

    // For now, return original URL
    // In the future, this could generate multiple sizes
    return imageUrl;
  }

  optimizeUrl(imageUrl: string, width?: number): string {
    if (!this.config.enableOptimization) {
      return imageUrl;
    }

    // Basic optimization: ensure absolute URL
    return toAbsoluteURL(imageUrl);
  }

  preloadImages(collection: ImageCollection, priority: number = 3): void {
    const imagesToPreload = collection.gallery.slice(0, priority);
    
    imagesToPreload.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }
}

// Export singleton instance
export const imageAdapter = new ImageAdapter();
