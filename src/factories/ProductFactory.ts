
import { 
  type VestuarioProduct, 
  type BordadoProduct, 
  type CamaProduct,
  type ImageCollection 
} from '@/types/product-base';
import { ProductValidator } from '@/services/ProductValidator';

interface ProductConfig {
  id: string | number;
  name: string;
  category: string;
  description?: string;
  imageUrl?: string;
  images?: string[] | Record<string, string[]> | ImageCollection;
}

interface VestuarioConfig extends ProductConfig {
  colors?: string[];
  sizes?: string[];
  price?: string;
  originalPrice?: string;
  discount?: string;
}

interface BordadoConfig extends ProductConfig {
  embroideryType?: 'machine' | 'hand' | 'mixed';
  maxEmbroiderySize?: string;
  availableFonts?: string[];
}

interface CamaConfig extends ProductConfig {
  dimensions?: {
    width: number;
    height: number;
    depth?: number;
    weight?: number;
  };
  material?: string;
  threadCount?: number;
  careInstructions?: string[];
}

export class ProductFactory {
  static createVestuarioProduct(config: VestuarioConfig): VestuarioProduct {
    const product = {
      ...config,
      type: 'product' as const,
      isNew: false,
      isAvailable: true,
      rating: 4.8,
      createdAt: new Date().toISOString(),
    };

    return ProductValidator.validateVestuarioProduct(product);
  }

  static createBordadoProduct(config: BordadoConfig): BordadoProduct {
    const product = {
      ...config,
      type: 'portfolio' as const,
      isNew: false,
      isAvailable: true,
      rating: 4.9,
      embroideryType: config.embroideryType || 'machine',
      createdAt: new Date().toISOString(),
    };

    return ProductValidator.validateBordadoProduct(product);
  }

  static createCamaProduct(config: CamaConfig): CamaProduct {
    const product = {
      ...config,
      type: 'product' as const,
      isNew: false,
      isAvailable: true,
      rating: 4.7,
      createdAt: new Date().toISOString(),
    };

    return ProductValidator.validateCamaProduct(product);
  }

  static normalizeImages(images: any): ImageCollection {
    if (!images) {
      return {
        primary: '/placeholder.svg',
        gallery: [],
      };
    }

    if (typeof images === 'string') {
      return {
        primary: images,
        gallery: [images],
      };
    }

    if (Array.isArray(images)) {
      return {
        primary: images[0] || '/placeholder.svg',
        gallery: images,
      };
    }

    if (typeof images === 'object' && !Array.isArray(images)) {
      // Handle color-based images object
      const firstColor = Object.keys(images)[0];
      const firstColorImages = images[firstColor];
      
      if (Array.isArray(firstColorImages)) {
        return {
          primary: firstColorImages[0] || '/placeholder.svg',
          gallery: firstColorImages,
          colorVariants: images,
        };
      }
    }

    return {
      primary: '/placeholder.svg',
      gallery: [],
    };
  }

  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, '') // Keep only alphanumeric, spaces, and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }
}
