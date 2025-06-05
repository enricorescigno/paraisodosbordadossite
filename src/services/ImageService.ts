
import { toAbsoluteURL } from '@/utils/urlUtils';
import { getImagePlaceholder } from '@/utils/imageUtils';

interface ImageProcessingOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export class ImageService {
  private static instance: ImageService;
  private cache: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map();

  private constructor() {}

  public static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  public async loadImage(url: string): Promise<HTMLImageElement> {
    const absoluteUrl = toAbsoluteURL(url);
    
    // Return cached image if available
    if (this.cache.has(absoluteUrl)) {
      return this.cache.get(absoluteUrl)!;
    }

    // Return existing loading promise if in progress
    if (this.loadingPromises.has(absoluteUrl)) {
      return this.loadingPromises.get(absoluteUrl)!;
    }

    // Create new loading promise
    const loadingPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        this.cache.set(absoluteUrl, img);
        this.loadingPromises.delete(absoluteUrl);
        resolve(img);
      };
      
      img.onerror = () => {
        this.loadingPromises.delete(absoluteUrl);
        reject(new Error(`Failed to load image: ${absoluteUrl}`));
      };
      
      img.src = absoluteUrl;
    });

    this.loadingPromises.set(absoluteUrl, loadingPromise);
    return loadingPromise;
  }

  public async preloadImages(urls: string[]): Promise<void> {
    const promises = urls.map(url => 
      this.loadImage(url).catch(error => {
        console.warn(`Failed to preload image: ${url}`, error);
        return null;
      })
    );
    
    await Promise.allSettled(promises);
  }

  public processImageUrl(url: string, options: ImageProcessingOptions = {}): string {
    const absoluteUrl = toAbsoluteURL(url);
    
    // For now, just return the absolute URL
    // In the future, this could add query parameters for image optimization
    return absoluteUrl;
  }

  public getPlaceholderForCategory(category: string): string {
    return getImagePlaceholder(category);
  }

  public normalizeProductImages(
    images: string[] | Record<string, string[]> | undefined,
    selectedColor?: string,
    category?: string
  ): string[] {
    if (!images) {
      return [this.getPlaceholderForCategory(category || '')];
    }

    if (Array.isArray(images)) {
      return images.map(img => toAbsoluteURL(img));
    }

    if (typeof images === 'object') {
      if (selectedColor && images[selectedColor]) {
        return images[selectedColor].map(img => toAbsoluteURL(img));
      }
      
      const firstColor = Object.keys(images)[0];
      if (firstColor && images[firstColor]) {
        return images[firstColor].map(img => toAbsoluteURL(img));
      }
    }

    return [this.getPlaceholderForCategory(category || '')];
  }

  public clearCache(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }

  public getCacheSize(): number {
    return this.cache.size;
  }
}

export const imageService = ImageService.getInstance();
