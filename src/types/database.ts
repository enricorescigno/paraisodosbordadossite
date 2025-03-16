
export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  type: 'product' | 'portfolio';
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  type: 'product' | 'portfolio';
  category_id: number;
  description?: string;
  price?: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  isNew?: boolean;
  features?: string[];
  keywords?: string[];
  slug?: string;
  highlight: boolean;
  imageUrl?: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  color_id?: string;
  image_url: string;
}

export interface ColorVariantImages {
  [color: string]: string[];
}
