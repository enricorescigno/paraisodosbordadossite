
import { BaseEntity, Dimensions, Rating, Price } from './base';
import { ImageCollection } from './image';

export type ProductType = 'product' | 'portfolio';
export type ProductCategory = 
  | 'Vestuário' 
  | 'Bordado em Vestuário' 
  | 'Bordado em Fardamentos'
  | 'Banho'
  | 'Cama'
  | 'Mesa e Cozinha'
  | 'Tapetes e Cortinas'
  | 'Infantil'
  | 'Bonés'
  | 'Bordados'
  | 'Bordados Infantis'
  | 'Bordado em Toalha'
  | 'Bordado em Toalha de Banho'
  | 'Bordado em Toalha de Rosto'
  | 'Bordado em Necessaire'
  | 'Bordado em Bolsa'
  | 'Bonés Bordados';

export interface ProductFeatures {
  materials: string[];
  care: string[];
  specifications: string[];
}

export interface ProductVariants {
  colors?: string[];
  sizes?: string[];
}

export interface ProductStock {
  quantity: number;
  minPurchaseQuantity: number;
  isAvailable: boolean;
}

export interface ProductBase extends BaseEntity {
  name: string;
  type: ProductType;
  category: ProductCategory;
  description?: string;
  slug?: string;
  keywords?: string[];
  tags?: string[];
}

export interface ProductPricing {
  price: Price;
  isCustomizable?: boolean;
}

export interface ProductMedia {
  images?: ImageCollection; // Made optional
  videos?: string[];
}

export interface ProductMetadata {
  rating?: Rating;
  isNew?: boolean;
  isFeatured?: boolean;
  dimensions?: Dimensions;
  features?: ProductFeatures;
}

// Main Product interface - flexible for backward compatibility
export interface Product extends ProductBase {
  // Pricing (flexible for backward compatibility) - MADE OPTIONAL FOR COMPATIBILITY
  price?: string | Price;
  isCustomizable?: boolean;
  
  // Media (flexible for backward compatibility) - all optional
  images?: string[] | Record<string, string[]> | ImageCollection;
  videos?: string[];
  imageUrl?: string;
  
  // Metadata (flexible for backward compatibility)
  rating?: number | Rating;
  isNew?: boolean;
  isFeatured?: boolean;
  dimensions?: Dimensions;
  features?: string[] | ProductFeatures;
  
  // Variants and Stock
  variants?: ProductVariants;
  stock?: ProductStock;
  
  // Backward compatibility properties
  colors?: string[];
  sizes?: string[];
  originalPrice?: string;
  discount?: string;
  isAvailable?: boolean;
  stockQuantity?: number;
  minPurchaseQuantity?: number;
  featured?: boolean;
}

// Legacy interface for backward compatibility
export interface LegacyProduct {
  id: number | string;
  name: string;
  type: string;
  category: string;
  imageUrl: string;
  description?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  isNew?: boolean;
  isAvailable?: boolean;
  isCustomizable?: boolean;
  stockQuantity?: number;
  minPurchaseQuantity?: number;
  tags?: string[];
  featured?: boolean;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    weight: number;
  };
  createdAt?: string;
  features?: string[];
  keywords?: string[];
  slug?: string;
  images?: string[] | Record<string, string[]>;
}
