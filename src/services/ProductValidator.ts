
import { z } from 'zod';
import { 
  ProductSchema, 
  VestuarioProductSchema, 
  BordadoProductSchema,
  CamaProductSchema,
  type ProductUnion 
} from '@/types/product-base';

export class ProductValidator {
  static validateProduct(data: unknown): ProductUnion {
    return ProductSchema.parse(data);
  }

  static validateVestuarioProduct(data: unknown) {
    return VestuarioProductSchema.parse(data);
  }

  static validateBordadoProduct(data: unknown) {
    return BordadoProductSchema.parse(data);
  }

  static validateCamaProduct(data: unknown) {
    return CamaProductSchema.parse(data);
  }

  static isValidProduct(data: unknown): data is ProductUnion {
    try {
      ProductSchema.parse(data);
      return true;
    } catch {
      return false;
    }
  }

  static validateProductArray(data: unknown[]): ProductUnion[] {
    return data.map(item => this.validateProduct(item));
  }

  static sanitizeProduct(product: any): ProductUnion {
    // Basic sanitization before validation
    const sanitized = {
      ...product,
      id: product.id ? String(product.id) : undefined,
      name: product.name ? String(product.name).trim() : '',
      description: product.description ? String(product.description).trim() : undefined,
      rating: product.rating ? Number(product.rating) : undefined,
      isNew: Boolean(product.isNew),
      isAvailable: product.isAvailable !== false, // default to true
    };

    return this.validateProduct(sanitized);
  }
}
