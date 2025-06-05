
import { ProductImage } from '../value-objects/ProductImage';
import { ProductVariant } from '../value-objects/ProductVariant';
import { ProductPricing } from '../value-objects/ProductPricing';
import { ImageCollection } from '../../types/image';
import { Price, Rating } from '../../types/base';

export interface ProductEntityData {
  id: string | number;
  name: string;
  type: 'product' | 'portfolio';
  category: string;
  description?: string;
  images?: string[] | Record<string, string[]> | ImageCollection;
  imageUrl?: string;
  colors?: string[];
  sizes?: string[];
  price?: string | Price;
  rating?: number | Rating;
  isNew?: boolean;
  features?: string[] | object;
}

export class ProductEntity {
  private readonly _id: string | number;
  private readonly _name: string;
  private readonly _type: 'product' | 'portfolio';
  private readonly _category: string;
  private readonly _description: string;
  private readonly _images: ProductImage[];
  private readonly _variants: ProductVariant;
  private readonly _pricing: ProductPricing;
  private readonly _rating: number;
  private readonly _isNew: boolean;
  private readonly _features: string[];

  constructor(data: ProductEntityData) {
    this.validateRequired(data);
    
    this._id = data.id;
    this._name = data.name;
    this._type = data.type;
    this._category = data.category;
    this._description = data.description || '';
    this._images = this.processImages(data);
    this._variants = new ProductVariant(data.colors || [], data.sizes || []);
    this._pricing = new ProductPricing(this.convertPrice(data.price) || '');
    this._rating = this.convertRating(data.rating);
    this._isNew = data.isNew || false;
    this._features = this.processFeatures(data.features);
  }

  // Getters
  get id(): string | number { return this._id; }
  get name(): string { return this._name; }
  get type(): 'product' | 'portfolio' { return this._type; }
  get category(): string { return this._category; }
  get description(): string { return this._description; }
  get images(): ProductImage[] { return this._images; }
  get variants(): ProductVariant { return this._variants; }
  get pricing(): ProductPricing { return this._pricing; }
  get rating(): number { return this._rating; }
  get isNew(): boolean { return this._isNew; }
  get features(): string[] { return this._features; }

  // Business methods
  getImagesForColor(color: string): ProductImage[] {
    return this._images.filter(img => img.colorVariant === color || !img.colorVariant);
  }

  getPrimaryImage(): ProductImage | null {
    return this._images.find(img => img.isPrimary) || this._images[0] || null;
  }

  hasVariants(): boolean {
    return this._variants.hasColors() || this._variants.hasSizes();
  }

  private validateRequired(data: ProductEntityData): void {
    if (!data.id) throw new Error('Product ID is required');
    if (!data.name) throw new Error('Product name is required');
    if (!data.type) throw new Error('Product type is required');
    if (!data.category) throw new Error('Product category is required');
  }

  private convertPrice(price?: string | Price): string {
    if (!price) return '';
    if (typeof price === 'string') return price;
    return price.value || '';
  }

  private convertRating(rating?: number | Rating): number {
    if (!rating) return 4.8;
    if (typeof rating === 'number') return rating;
    return rating.value || 4.8;
  }

  private processImages(data: ProductEntityData): ProductImage[] {
    const images: ProductImage[] = [];
    
    // Handle imageUrl
    if (data.imageUrl) {
      images.push(new ProductImage(data.imageUrl, true));
    }
    
    // Handle different image formats
    if (data.images) {
      if (Array.isArray(data.images)) {
        // Simple array format
        data.images.forEach((url, index) => {
          if (url && url.trim()) {
            images.push(new ProductImage(url, index === 0 && !data.imageUrl));
          }
        });
      } else if (this.isImageCollection(data.images)) {
        // ImageCollection format
        this.processImageCollection(data.images, images, !data.imageUrl);
      } else {
        // Record<string, string[]> format (by color)
        Object.entries(data.images).forEach(([color, urls]) => {
          if (Array.isArray(urls)) {
            urls.forEach((url, index) => {
              if (url && url.trim()) {
                images.push(new ProductImage(url, false, color));
              }
            });
          }
        });
      }
    }
    
    return images;
  }

  private isImageCollection(images: any): images is ImageCollection {
    return images && typeof images === 'object' && ('primary' in images || 'gallery' in images);
  }

  private processImageCollection(collection: ImageCollection, images: ProductImage[], setPrimary: boolean): void {
    // Process primary images
    if (collection.primary) {
      if (Array.isArray(collection.primary)) {
        collection.primary.forEach((img, index) => {
          const url = typeof img === 'string' ? img : img.url;
          if (url) {
            images.push(new ProductImage(url, setPrimary && index === 0));
          }
        });
      } else if (typeof collection.primary === 'string') {
        images.push(new ProductImage(collection.primary, setPrimary));
      } else if (collection.primary.url) {
        images.push(new ProductImage(collection.primary.url, setPrimary));
      }
    }

    // Process gallery images
    if (collection.gallery && Array.isArray(collection.gallery)) {
      collection.gallery.forEach(img => {
        const url = typeof img === 'string' ? img : img.url;
        if (url) {
          images.push(new ProductImage(url, false));
        }
      });
    }
  }

  private processFeatures(features?: string[] | object): string[] {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === 'object') {
      const result: string[] = [];
      Object.values(features).forEach(value => {
        if (Array.isArray(value)) {
          result.push(...value);
        } else if (typeof value === 'string') {
          result.push(value);
        }
      });
      return result;
    }
    return [];
  }
}
