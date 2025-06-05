
import { Product, LegacyProduct } from '../../types/product';
import { ImageService } from '../../services/ImageService';
import { ProductImage } from '../../types/image';

export class ProductAdapter {
  private static imageService = ImageService.getInstance();

  public static toLegacyProduct(product: Product): LegacyProduct {
    // Handle images - check if it's an array, ImageCollection, or Record
    let imageUrl = '';
    if (typeof product.images === 'object' && product.images !== null) {
      if (Array.isArray(product.images)) {
        imageUrl = product.images[0] || '';
      } else if ('primary' in product.images) {
        // ImageCollection type
        const primaryImages = product.images.primary;
        if (Array.isArray(primaryImages)) {
          // Check if primary is array of strings or objects
          const firstImage = primaryImages[0];
          if (typeof firstImage === 'string') {
            imageUrl = firstImage;
          } else if (firstImage && typeof firstImage === 'object' && 'url' in firstImage) {
            imageUrl = (firstImage as ProductImage).url || '';
          }
        } else if (typeof primaryImages === 'string') {
          imageUrl = primaryImages;
        } else if (primaryImages && typeof primaryImages === 'object' && 'url' in primaryImages) {
          imageUrl = (primaryImages as ProductImage).url || '';
        }
      } else {
        // Record<string, string[]> type
        const firstKey = Object.keys(product.images)[0];
        const firstKeyImages = firstKey ? product.images[firstKey] : null;
        if (Array.isArray(firstKeyImages) && firstKeyImages.length > 0) {
          imageUrl = firstKeyImages[0] || '';
        }
      }
    } else if (typeof product.images === 'string') {
      imageUrl = product.images;
    }

    // Handle price - check if it's a string or Price object
    const price = typeof product.price === 'string' ? product.price : product.price?.value || 'R$ 0,00';
    const originalPrice = typeof product.price === 'object' ? product.price?.originalValue : undefined;
    const discount = typeof product.price === 'object' ? product.price?.discount : undefined;

    // Handle rating - check if it's a number or Rating object
    const rating = typeof product.rating === 'number' ? product.rating : product.rating?.value;

    // Convert images to string array format
    let imagesArray: string[] = [];
    if (typeof product.images === 'object' && product.images !== null) {
      if (Array.isArray(product.images)) {
        imagesArray = product.images.map(img => typeof img === 'string' ? img : 
          (img && typeof img === 'object' && 'url' in img ? (img as ProductImage).url || '' : ''));
      } else if ('gallery' in product.images) {
        const galleryImages = product.images.gallery;
        if (Array.isArray(galleryImages)) {
          imagesArray = galleryImages.map(img => typeof img === 'string' ? img : 
            (img && typeof img === 'object' && 'url' in img ? (img as ProductImage).url || '' : ''));
        }
      }
    }

    return {
      id: product.id,
      name: product.name,
      type: product.type,
      category: product.category,
      imageUrl: imageUrl || this.imageService.getPlaceholderImage(product.category),
      description: product.description,
      price,
      originalPrice,
      discount,
      colors: product.variants?.colors || product.colors,
      sizes: product.variants?.sizes || product.sizes,
      rating,
      isNew: product.isNew,
      isAvailable: product.stock?.isAvailable ?? product.isAvailable,
      isCustomizable: product.isCustomizable,
      stockQuantity: product.stock?.quantity ?? product.stockQuantity,
      minPurchaseQuantity: product.stock?.minPurchaseQuantity ?? product.minPurchaseQuantity,
      tags: product.tags,
      featured: product.isFeatured || product.featured,
      dimensions: product.dimensions,
      createdAt: product.createdAt,
      features: Array.isArray(product.features) ? product.features : product.features?.specifications,
      keywords: product.keywords,
      slug: product.slug,
      images: imagesArray
    };
  }

  public static fromLegacyProduct(legacyProduct: LegacyProduct): Product {
    return {
      id: legacyProduct.id,
      name: legacyProduct.name,
      type: legacyProduct.type as 'product' | 'portfolio',
      category: legacyProduct.category as any,
      description: legacyProduct.description,
      slug: legacyProduct.slug,
      keywords: legacyProduct.keywords,
      tags: legacyProduct.tags,
      price: legacyProduct.price || 'R$ 0,00',
      isCustomizable: legacyProduct.isCustomizable,
      images: legacyProduct.images || [legacyProduct.imageUrl || ''],
      videos: [],
      imageUrl: legacyProduct.imageUrl,
      rating: legacyProduct.rating,
      isNew: legacyProduct.isNew,
      isFeatured: legacyProduct.featured,
      dimensions: legacyProduct.dimensions,
      features: legacyProduct.features,
      variants: {
        colors: legacyProduct.colors,
        sizes: legacyProduct.sizes
      },
      stock: {
        quantity: legacyProduct.stockQuantity || 0,
        minPurchaseQuantity: legacyProduct.minPurchaseQuantity || 1,
        isAvailable: legacyProduct.isAvailable ?? true
      },
      colors: legacyProduct.colors,
      sizes: legacyProduct.sizes,
      originalPrice: legacyProduct.originalPrice,
      discount: legacyProduct.discount,
      isAvailable: legacyProduct.isAvailable,
      stockQuantity: legacyProduct.stockQuantity,
      minPurchaseQuantity: legacyProduct.minPurchaseQuantity,
      featured: legacyProduct.featured,
      createdAt: legacyProduct.createdAt
    };
  }
}
