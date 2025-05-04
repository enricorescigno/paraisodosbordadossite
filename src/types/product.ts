
// Define color options
export type ProductColor = {
  name: string;
  value: string;
  image?: string;
};

// Define size options
export type ProductSize = {
  name: string;
  value: string;
  available: boolean;
};

// Define variant options
export type ProductVariant = {
  id: string;
  name?: string;
  sku?: string;
  colors?: ProductColor[];
  sizes?: ProductSize[];
  price?: string;
  comparePrice?: string;
  inventory?: number;
  images?: string[];
};

// Define full product type
export interface Product {
  id: string | number;  // Allow both string and number IDs
  name: string;
  type: 'product' | 'portfolio' | 'service';
  category: string;
  subcategory?: string;
  price?: string;
  comparePrice?: string;
  description: string;
  shortDescription?: string;
  imageUrl: string;
  images?: string[];
  features?: string[];
  colors?: ProductColor[] | string[];  // Allow both complex and simple color formats
  sizes?: ProductSize[] | string[];   // Allow both complex and simple size formats
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  reviews?: ProductReview[];
  rating?: number;
  ratingCount?: number;
  inventory?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  relatedProducts?: string[];
  keywords?: string[];
  materials?: string[];
  dimensions?: string | Record<string, number>;  // Support both string and object formats
  weight?: string;
  sku?: string;
  barcode?: string;
  tags?: string[];
  slug?: string;  // Add slug field
  originalPrice?: string; // Add originalPrice field
  discount?: string; // Add discount field
}

export interface ProductReview {
  id: string;
  name: string;
  email?: string;
  date: string;
  rating: number;
  comment: string;
  images?: string[];
  verified?: boolean;
  likes?: number;
  productId: string;
}
