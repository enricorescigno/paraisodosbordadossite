
// Backward compatibility with existing Product interface
// This file maintains compatibility while transitioning to the new type system

import { type ProductUnion, type VestuarioProduct, type BordadoProduct } from './product-base';

// Legacy Product interface for backward compatibility
export interface Product {
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

// Helper function to convert new types to legacy format
export function toLegacyProduct(product: ProductUnion): Product {
  const base = {
    id: product.id,
    name: product.name,
    type: product.type,
    category: product.category,
    imageUrl: product.imageUrl || '/placeholder.svg',
    description: product.description,
    rating: product.rating,
    isNew: product.isNew,
    isAvailable: product.isAvailable,
    featured: product.featured,
    createdAt: product.createdAt,
    keywords: product.keywords,
    tags: product.tags,
    slug: product.slug,
  };

  // Add type-specific fields
  if ('colors' in product) {
    return {
      ...base,
      colors: product.colors,
      sizes: product.sizes,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      stockQuantity: product.stockQuantity,
      minPurchaseQuantity: product.minPurchaseQuantity,
      isCustomizable: product.isCustomizable,
      images: product.images,
    };
  }

  return base;
}

// Re-export new types for gradual migration
export type { ProductUnion, VestuarioProduct, BordadoProduct };
export { ProductFactory } from '@/factories/ProductFactory';
export { ProductRepository } from '@/repositories/ProductRepository';
export { imageAdapter } from '@/adapters/ImageAdapter';
