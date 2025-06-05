
import { z } from 'zod';

// Base product schema
export const BaseProductSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string().min(1),
  type: z.enum(['product', 'portfolio']),
  category: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  isNew: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
  featured: z.boolean().optional(),
  createdAt: z.string().optional(),
  slug: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

// Image management schema
export const ImageCollectionSchema = z.object({
  primary: z.string(),
  gallery: z.array(z.string()),
  colorVariants: z.record(z.array(z.string())).optional(),
  thumbnails: z.array(z.string()).optional(),
});

// Product variant schemas
export const VestuarioProductSchema = BaseProductSchema.extend({
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  price: z.string().optional(),
  originalPrice: z.string().optional(),
  discount: z.string().optional(),
  stockQuantity: z.number().optional(),
  minPurchaseQuantity: z.number().optional(),
  isCustomizable: z.boolean().optional(),
  images: z.union([
    z.array(z.string()),
    z.record(z.array(z.string())),
    ImageCollectionSchema
  ]).optional(),
});

export const BordadoProductSchema = BaseProductSchema.extend({
  embroideryType: z.enum(['machine', 'hand', 'mixed']).optional(),
  maxEmbroiderySize: z.string().optional(),
  availableFonts: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  images: z.union([
    z.array(z.string()),
    z.record(z.array(z.string())),
    ImageCollectionSchema
  ]).optional(),
});

export const CamaProductSchema = BaseProductSchema.extend({
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number().optional(),
    weight: z.number().optional(),
  }).optional(),
  material: z.string().optional(),
  threadCount: z.number().optional(),
  careInstructions: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  images: z.union([
    z.array(z.string()),
    ImageCollectionSchema
  ]).optional(),
});

// Union type for all product types
export const ProductSchema = z.discriminatedUnion('type', [
  VestuarioProductSchema.extend({ type: z.literal('product') }),
  BordadoProductSchema.extend({ type: z.literal('portfolio') }),
]);

// TypeScript types derived from schemas
export type BaseProduct = z.infer<typeof BaseProductSchema>;
export type ImageCollection = z.infer<typeof ImageCollectionSchema>;
export type VestuarioProduct = z.infer<typeof VestuarioProductSchema>;
export type BordadoProduct = z.infer<typeof BordadoProductSchema>;
export type CamaProduct = z.infer<typeof CamaProductSchema>;
export type ProductUnion = z.infer<typeof ProductSchema>;

// Enhanced product features
export interface ProductFeatures {
  highlights: string[];
  specifications: Record<string, string>;
  careInstructions?: string[];
  warranty?: string;
  shipping?: {
    weight: number;
    dimensions: { width: number; height: number; depth: number };
  };
}

// Product metadata for SEO and organization
export interface ProductMetadata {
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  alternativeNames?: string[];
  relatedProducts?: string[];
  categories: string[];
  subcategories?: string[];
}
