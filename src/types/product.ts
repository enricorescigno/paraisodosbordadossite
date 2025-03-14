
export interface Product {
  id: number;
  name: string;
  type: string;
  category: string;
  imageUrl: string;
  description?: string;
  price?: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  isNew?: boolean;
  features?: string[];
}
