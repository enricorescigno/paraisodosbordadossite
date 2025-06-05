
import { ProductImage } from '../value-objects/ProductImage';
import { ProductVariant } from '../value-objects/ProductVariant';
import { ProductPricing } from '../value-objects/ProductPricing';

export interface ProductEntityData {
  id: string | number;
  name: string;
  type: 'product' | 'portfolio';
  category: string;
  description?: string;
  images?: string[] | Record<string, string[]>;
  imageUrl?: string;
  colors?: string[];
  sizes?: string[];
  price?: string;
  rating?: number;
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
    this._pricing = new ProductPricing(data.price || '');
    this._rating = data.rating || 4.8;
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

  private processImages(data: ProductEntityData): ProductImage[] {
    const images: ProductImage[] = [];
    
    // Handle imageUrl
    if (data.imageUrl) {
      images.push(new ProductImage(data.imageUrl, true));
    }
    
    // Handle images array
    if (Array.isArray(data.images)) {
      data.images.forEach((url, index) => {
        if (url && url.trim()) {
          images.push(new ProductImage(url, index === 0 && !data.imageUrl));
        }
      });
    }
    
    // Handle images by color
    if (data.images && typeof data.images === 'object' && !Array.isArray(data.images)) {
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
    
    return images;
  }

  private processFeatures(features?: string[] | object): string[] {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === 'object') {
      const result: string[] = [];
      Object.values(features).forEach(value => {
        if (Array.isArray(value)) {
          result.push(...value);
        }
      });
      return result;
    }
    return [];
  }
}
