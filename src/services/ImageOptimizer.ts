
import { formatDetector } from './FormatDetector';
import { toAbsoluteURL } from '@/utils/urlUtils';

export interface ImageVariant {
  url: string;
  width: number;
  format: 'avif' | 'webp' | 'jpeg' | 'png';
  quality: 'low' | 'medium' | 'high';
}

export interface ResponsiveImageSet {
  placeholder: string;
  lowQuality: ImageVariant[];
  highQuality: ImageVariant[];
  srcSet: string;
  sizes: string;
}

export class ImageOptimizer {
  private static instance: ImageOptimizer;
  private readonly breakpoints = [320, 640, 768, 1024, 1280, 1920];
  private readonly qualities = {
    low: 30,
    medium: 60,
    high: 85
  };

  private constructor() {}

  public static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer();
    }
    return ImageOptimizer.instance;
  }

  public generatePlaceholder(originalUrl: string, width: number = 64): string {
    // Generate a tiny placeholder (could be base64 blur or solid color)
    const baseUrl = this.getBaseUrl(originalUrl);
    return `${baseUrl}?w=${width}&q=20&blur=10`;
  }

  public async generateResponsiveSet(
    originalUrl: string,
    maxWidth: number = 1920,
    aspectRatio?: number
  ): Promise<ResponsiveImageSet> {
    const supportedFormats = await this.getSupportedFormatsInOrder();
    const relevantBreakpoints = this.breakpoints.filter(bp => bp <= maxWidth);
    
    if (relevantBreakpoints.length === 0) {
      relevantBreakpoints.push(maxWidth);
    }

    const lowQuality: ImageVariant[] = [];
    const highQuality: ImageVariant[] = [];
    const srcSetEntries: string[] = [];

    for (const width of relevantBreakpoints) {
      const height = aspectRatio ? Math.round(width / aspectRatio) : undefined;

      for (const format of supportedFormats) {
        // Low quality variant
        const lowUrl = this.generateOptimizedUrl(originalUrl, {
          width,
          height,
          quality: this.qualities.low,
          format
        });

        lowQuality.push({
          url: lowUrl,
          width,
          format: format as 'avif' | 'webp' | 'jpeg' | 'png',
          quality: 'low'
        });

        // High quality variant
        const highUrl = this.generateOptimizedUrl(originalUrl, {
          width,
          height,
          quality: this.qualities.high,
          format
        });

        highQuality.push({
          url: highUrl,
          width,
          format: format as 'avif' | 'webp' | 'jpeg' | 'png',
          quality: 'high'
        });

        // Add to srcSet (use high quality for srcSet)
        srcSetEntries.push(`${highUrl} ${width}w`);
      }
    }

    return {
      placeholder: this.generatePlaceholder(originalUrl),
      lowQuality,
      highQuality,
      srcSet: srcSetEntries.join(', '),
      sizes: this.generateSizes(relevantBreakpoints)
    };
  }

  private generateOptimizedUrl(
    originalUrl: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: string;
    }
  ): string {
    // For external URLs (like Unsplash), use their optimization parameters
    if (this.isExternalUrl(originalUrl)) {
      return this.optimizeExternalUrl(originalUrl, options);
    }

    // For local images, add optimization parameters
    const baseUrl = this.getBaseUrl(originalUrl);
    const params = new URLSearchParams();

    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.quality) params.set('q', options.quality.toString());
    if (options.format) params.set('f', options.format);

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  private optimizeExternalUrl(url: string, options: any): string {
    if (url.includes('unsplash.com')) {
      const params = new URLSearchParams();
      if (options.width) params.set('w', options.width.toString());
      if (options.height) params.set('h', options.height.toString());
      if (options.quality) params.set('q', options.quality.toString());
      if (options.format && options.format !== 'jpeg') params.set('fm', options.format);
      
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}${params.toString()}`;
    }

    return url;
  }

  private async getSupportedFormatsInOrder(): Promise<string[]> {
    const bestFormat = await formatDetector.getBestFormat();
    const formats = [bestFormat];
    
    // Add fallbacks
    if (bestFormat !== 'jpeg') {
      formats.push('jpeg');
    }
    
    return formats;
  }

  private generateSizes(breakpoints: number[]): string {
    const sizes = breakpoints.map((bp, index) => {
      if (index === breakpoints.length - 1) {
        return `${bp}px`;
      }
      return `(max-width: ${bp}px) ${bp}px`;
    });

    return sizes.join(', ');
  }

  private isExternalUrl(url: string): boolean {
    return url.startsWith('http') && !url.includes(window.location.origin);
  }

  private getBaseUrl(url: string): string {
    return toAbsoluteURL(url);
  }

  public async getOptimalImageUrl(
    originalUrl: string,
    targetWidth?: number,
    quality: 'low' | 'medium' | 'high' = 'high'
  ): Promise<string> {
    const bestFormat = await formatDetector.getBestFormat();
    
    return this.generateOptimizedUrl(originalUrl, {
      width: targetWidth,
      quality: this.qualities[quality],
      format: bestFormat
    });
  }
}

export const imageOptimizer = ImageOptimizer.getInstance();
