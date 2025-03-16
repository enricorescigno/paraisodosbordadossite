
export interface Product {
  id: number | string;
  name: string;
  description: string;
  shortDescription?: string;
  category_id: number | string;
  type: 'product' | 'portfolio';
  highlight: boolean;
  price?: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  isNew?: boolean;
  features?: string[];
  keywords?: string[];
  slug?: string;
}

export interface Category {
  id: number | string;
  name: string;
  parent_id: number | string | null;
  type: 'product' | 'portfolio';
  slug: string;
}

export interface ProductImage {
  id: number | string;
  product_id: number | string;
  color_id?: string | null;
  image_url: string;
  is_primary?: boolean;
}

export interface ColorOption {
  id: string;
  name: string;
  hex_code: string;
}
