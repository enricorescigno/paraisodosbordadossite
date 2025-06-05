
import { Product, LegacyProduct } from '../../types/product';
import { toAbsoluteURL } from '../../utils/urlUtils';

export class ProductAdapter {
  static toLegacyProduct(product: Product): LegacyProduct {
    // Helper to get image URL safely
    const getImageUrl = () => {
      if (product.imageUrl) return product.imageUrl;
      if (product.images) {
        if (typeof product.images === 'object' && 'primary' in product.images) {
          return product.images.primary.url;
        }
        if (Array.isArray(product.images) && product.images.length > 0) {
          return product.images[0];
        }
        if (typeof product.images === 'object' && !Array.isArray(product.images)) {
          const firstColorImages = Object.values(product.images)[0];
          if (Array.isArray(firstColorImages) && firstColorImages.length > 0) {
            return firstColorImages[0];
          }
        }
      }
      return '/placeholder.svg';
    };

    // Helper to get price value safely
    const getPriceValue = () => {
      if (typeof product.price === 'string') return product.price;
      if (typeof product.price === 'object' && 'value' in product.price) return product.price.value;
      return 'Sob consulta';
    };

    // Helper to get original price safely
    const getOriginalPrice = () => {
      if (typeof product.price === 'object' && 'originalValue' in product.price) return product.price.originalValue;
      return product.originalPrice;
    };

    // Helper to get discount safely
    const getDiscount = () => {
      if (typeof product.price === 'object' && 'discount' in product.price) return product.price.discount;
      return product.discount;
    };

    // Helper to get rating value safely
    const getRatingValue = () => {
      if (typeof product.rating === 'number') return product.rating;
      if (typeof product.rating === 'object' && 'value' in product.rating) return product.rating.value;
      return undefined;
    };

    // Helper to get features safely
    const getFeatures = () => {
      if (Array.isArray(product.features)) return product.features;
      if (typeof product.features === 'object' && 'specifications' in product.features) {
        return product.features.specifications;
      }
      return undefined;
    };

    // Helper to get images array safely
    const getImagesArray = () => {
      if (Array.isArray(product.images)) return product.images;
      if (typeof product.images === 'object' && 'gallery' in product.images) {
        return product.images.gallery.map(img => img.url);
      }
      if (typeof product.images === 'object' && !Array.isArray(product.images)) {
        return Object.values(product.images).flat();
      }
      return [];
    };

    return {
      id: product.id,
      name: product.name,
      type: product.type,
      category: product.category,
      imageUrl: getImageUrl(),
      description: product.description,
      price: getPriceValue(),
      originalPrice: getOriginalPrice(),
      discount: getDiscount(),
      colors: product.variants?.colors || product.colors,
      sizes: product.variants?.sizes || product.sizes,
      rating: getRatingValue(),
      isNew: product.isNew,
      isAvailable: product.stock?.isAvailable ?? product.isAvailable,
      isCustomizable: product.isCustomizable,
      stockQuantity: product.stock?.quantity || product.stockQuantity,
      minPurchaseQuantity: product.stock?.minPurchaseQuantity || product.minPurchaseQuantity,
      tags: product.tags,
      featured: product.isFeatured || product.featured,
      dimensions: product.dimensions,
      createdAt: product.createdAt,
      features: getFeatures(),
      keywords: product.keywords,
      slug: product.slug,
      images: getImagesArray()
    };
  }

  static fromLegacyProduct(legacyProduct: LegacyProduct): Product {
    // Handle images - could be array or object
    let galleryImages: string[] = [];
    
    if (Array.isArray(legacyProduct.images)) {
      galleryImages = legacyProduct.images;
    } else if (legacyProduct.images && typeof legacyProduct.images === 'object') {
      // Handle object format - flatten all color variants
      galleryImages = Object.values(legacyProduct.images).flat();
    }

    // Ensure we have at least the primary image
    if (galleryImages.length === 0 && legacyProduct.imageUrl) {
      galleryImages = [legacyProduct.imageUrl];
    }

    return {
      id: legacyProduct.id,
      name: legacyProduct.name,
      type: legacyProduct.type as 'product' | 'portfolio',
      category: legacyProduct.category as any,
      description: legacyProduct.description,
      slug: legacyProduct.slug,
      keywords: legacyProduct.keywords,
      tags: legacyProduct.tags,
      price: legacyProduct.price || 'Sob consulta',
      isCustomizable: legacyProduct.isCustomizable,
      images: galleryImages.map(url => toAbsoluteURL(url)),
      variants: {
        colors: legacyProduct.colors,
        sizes: legacyProduct.sizes
      },
      stock: {
        quantity: legacyProduct.stockQuantity || 0,
        minPurchaseQuantity: legacyProduct.minPurchaseQuantity || 1,
        isAvailable: legacyProduct.isAvailable ?? true
      },
      rating: legacyProduct.rating,
      isNew: legacyProduct.isNew,
      isFeatured: legacyProduct.featured,
      dimensions: legacyProduct.dimensions,
      features: legacyProduct.features,
      createdAt: legacyProduct.createdAt,
      imageUrl: toAbsoluteURL(legacyProduct.imageUrl),
      colors: legacyProduct.colors,
      sizes: legacyProduct.sizes,
      originalPrice: legacyProduct.originalPrice,
      discount: legacyProduct.discount,
      isAvailable: legacyProduct.isAvailable,
      stockQuantity: legacyProduct.stockQuantity,
      minPurchaseQuantity: legacyProduct.minPurchaseQuantity,
      featured: legacyProduct.featured
    };
  }
}
