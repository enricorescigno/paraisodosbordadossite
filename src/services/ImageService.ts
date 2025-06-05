
import { ProductImage, ImageConfig } from '../types/image';

export class ImageService {
  private static instance: ImageService;
  private imageCache = new Map<string, string>();
  private defaultConfig: ImageConfig = {
    sizes: ['320w', '640w', '960w', '1280w'],
    formats: ['webp', 'jpg'],
    quality: 80,
    lazy: true
  };

  private constructor() {}

  public static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  public optimizeImageUrl(url: string, width?: number, format?: string): string {
    const cacheKey = `${url}-${width}-${format}`;
    
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!;
    }

    let optimizedUrl = url;
    
    // Add width parameter if specified
    if (width) {
      const separator = url.includes('?') ? '&' : '?';
      optimizedUrl += `${separator}w=${width}`;
    }

    // Add format parameter if specified
    if (format) {
      const separator = optimizedUrl.includes('?') ? '&' : '?';
      optimizedUrl += `${separator}f=${format}`;
    }

    this.imageCache.set(cacheKey, optimizedUrl);
    return optimizedUrl;
  }

  public getPlaceholderImage(category: string): string {
    const placeholders: Record<string, string> = {
      'Vestuário': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop',
      'Banho': 'https://images.unsplash.com/photo-1563293815-7b9673b068a9?q=80&w=500&auto=format&fit=crop',
      'Infantil': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop',
      'Bordados': 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=500&auto=format&fit=crop',
      'default': '/placeholder.svg'
    };

    return placeholders[category] || placeholders.default;
  }

  public preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  }

  public generateSrcSet(baseUrl: string): string {
    return this.defaultConfig.sizes
      .map(size => {
        const width = parseInt(size);
        return `${this.optimizeImageUrl(baseUrl, width)} ${size}`;
      })
      .join(', ');
  }
}
