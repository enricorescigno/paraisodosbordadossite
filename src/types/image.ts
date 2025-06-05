
export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
  colorVariant?: string;
  order?: number;
}

export interface ImageCollection {
  primary: ProductImage;
  gallery: ProductImage[];
  thumbnails?: ProductImage[];
}

export type ImageFormat = 'webp' | 'jpg' | 'png';

export interface ImageConfig {
  sizes: string[];
  formats: ImageFormat[];
  quality: number;
  lazy: boolean;
}
