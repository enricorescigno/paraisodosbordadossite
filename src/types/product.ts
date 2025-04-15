
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
  images?: string[] | Record<string, string[]>; // Pode ser um array ou um objeto com chaves de cores
}
