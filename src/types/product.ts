
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
  | 'Bordados Infantis';

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
  images: ImageCollection;
  videos?: string[];
}

export interface ProductMetadata {
  rating?: Rating;
  isNew?: boolean;
  isFeatured?: boolean;
  dimensions?: Dimensions;
  features?: ProductFeatures;
}

export interface Product extends ProductBase, ProductPricing, ProductMedia, ProductMetadata {
  variants?: ProductVariants;
  stock?: ProductStock;
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
