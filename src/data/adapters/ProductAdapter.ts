
import { Product, LegacyProduct } from '../../types/product';
import { toAbsoluteURL } from '../../utils/urlUtils';

export class ProductAdapter {
  static toLegacyProduct(product: Product): LegacyProduct {
    return {
      id: product.id,
      name: product.name,
      type: product.type,
      category: product.category,
      imageUrl: product.images.primary.url,
      description: product.description,
      price: product.price.value,
      originalPrice: product.price.originalValue,
      discount: product.price.discount,
      colors: product.variants?.colors,
      sizes: product.variants?.sizes,
      rating: product.rating?.value,
      isNew: product.isNew,
      isAvailable: product.stock?.isAvailable,
      isCustomizable: product.isCustomizable,
      stockQuantity: product.stock?.quantity,
      minPurchaseQuantity: product.stock?.minPurchaseQuantity,
      tags: product.tags,
      featured: product.isFeatured,
      dimensions: product.dimensions,
      createdAt: product.createdAt,
      features: product.features?.specifications,
      keywords: product.keywords,
      slug: product.slug,
      images: product.images.gallery.map(img => img.url)
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
      price: {
        value: legacyProduct.price || 'Sob consulta',
        originalValue: legacyProduct.originalPrice,
        discount: legacyProduct.discount
      },
      isCustomizable: legacyProduct.isCustomizable,
      images: {
        primary: {
          url: toAbsoluteURL(legacyProduct.imageUrl),
          alt: legacyProduct.name,
          isPrimary: true
        },
        gallery: galleryImages.map((url, index) => ({
          url: toAbsoluteURL(url),
          alt: `${legacyProduct.name} - Imagem ${index + 1}`,
          order: index
        }))
      },
      variants: {
        colors: legacyProduct.colors,
        sizes: legacyProduct.sizes
      },
      stock: {
        quantity: legacyProduct.stockQuantity || 0,
        minPurchaseQuantity: legacyProduct.minPurchaseQuantity || 1,
        isAvailable: legacyProduct.isAvailable ?? true
      },
      rating: legacyProduct.rating ? { value: legacyProduct.rating } : undefined,
      isNew: legacyProduct.isNew,
      isFeatured: legacyProduct.featured,
      dimensions: legacyProduct.dimensions,
      features: legacyProduct.features ? {
        specifications: legacyProduct.features,
        materials: [],
        care: []
      } : undefined,
      createdAt: legacyProduct.createdAt
    };
  }
}
