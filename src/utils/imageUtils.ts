
/**
 * Image optimization utilities
 */

// Function to generate optimized image sources with different sizes
export const getSrcSet = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  // For external URLs like Unsplash, let's return the original
  if (imageUrl.includes('unsplash.com') || imageUrl.includes('http')) {
    return imageUrl;
  }
  
  // For local images, we won't try to use WebP for now due to conversion issues
  return imageUrl;
};

// Function to get placeholder while images are loading
export const getImagePlaceholder = (category: string = ''): string => {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes('bone') || lowerCategory.includes('bonés')) {
    return '/placeholder.svg';
  }
  
  if (lowerCategory.includes('necessaire') || lowerCategory.includes('bolsa')) {
    return "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop";
  } 
  
  if (lowerCategory.includes('toalha') || lowerCategory.includes('banho')) {
    return "https://images.unsplash.com/photo-1563293815-7b9673b068a9?q=80&w=500&auto=format&fit=crop";
  } 
  
  if (lowerCategory.includes('camisa') || lowerCategory.includes('fardamento') || lowerCategory.includes('avental') || lowerCategory.includes('jaleco')) {
    return "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop";
  } 
  
  if (lowerCategory.includes('infantil') || lowerCategory.includes('fralda') || lowerCategory.includes('macacão') || lowerCategory.includes('manta')) {
    return "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop";
  } 
  
  if (lowerCategory.includes('bordado') || lowerCategory.includes('cama')) {
    return "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=500&auto=format&fit=crop";
  }
  
  // Default placeholder
  return '/placeholder.svg';
};

// Function to optimize image loading attributes
export const getImageLoading = (priority: boolean = false): "lazy" | "eager" => {
  return priority ? "eager" : "lazy";
};

// Image dimensions optimization helper
export const getOptimizedDimensions = (width: number, height?: number): { width: number, height: number } => {
  const aspectRatio = height ? width / height : 1;
  const optimizedWidth = Math.min(width, 1200); // Cap max width
  const optimizedHeight = height ? Math.round(optimizedWidth / aspectRatio) : optimizedWidth;
  
  return { width: optimizedWidth, height: optimizedHeight };
};

// Function to return image URL without WebP conversion
export const getWebPImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  // Just return the original image URL - don't try to use WebP
  return imageUrl;
};

// Function to detect connection speed and choose appropriate image quality
export const getImageQualityByConnection = (): 'low' | 'medium' | 'high' => {
  if (typeof navigator === 'undefined') return 'medium';
  
  const connection = (navigator as any).connection;
  
  if (connection) {
    const { effectiveType, downlink, saveData } = connection;
    
    // Save data mode takes precedence
    if (saveData) return 'low';
    
    // Based on effective connection type
    if (effectiveType === '4g' && downlink > 1.5) return 'high';
    if (effectiveType === '4g' || effectiveType === '3g') return 'medium';
    return 'low';
  }
  
  // Default to medium if Network Information API is not available
  return 'medium';
};

// New function to determine if an image should be preloaded
export const shouldPreloadImage = (index: number, imageCount: number): boolean => {
  // Only preload the first few images to improve initial page load
  return index < 3 && imageCount > 0;
};

// Helper to create optimized image URL with size parameters
export const getOptimizedImageUrl = (url: string, width?: number): string => {
  if (!url) return '';
  
  // Don't modify external URLs
  if (url.includes('http') && !url.includes(window.location.origin)) {
    return url;
  }
  
  // For local images, we'll just return the original
  return url;
};

// Updated cacheImagesInBrowser function with proper export
export function cacheImagesInBrowser(imageUrls: string[]): void {
  if (typeof window === 'undefined' || !('caches' in window)) return;
  
  // Use Cache API to store images (if browser supports it)
  const cacheName = 'paraiso-images-v1';
  
  caches.open(cacheName).then(cache => {
    imageUrls.forEach(url => {
      // Only cache local images
      if (!url.includes('http') || url.includes(window.location.origin)) {
        fetch(url, { mode: 'no-cors' })
          .then(response => {
            if (response.ok || response.type === 'opaque') {
              cache.put(url, response);
            }
          })
          .catch(() => {
            // Silently fail if we can't cache the image
          });
      }
    });
  });
}

// Pre-load specific images for faster access
export const preloadImages = (urls: string[]): void => {
  if (!urls || urls.length === 0) return;
  
  urls.forEach(url => {
    if (!url) return;
    
    const img = new Image();
    img.src = url;
    
    // Optional: Set loading priority using attribute
    if ('loading' in HTMLImageElement.prototype) {
      (img as any).loading = urls.length < 5 ? 'eager' : 'lazy';
    }
  });
};

// Fix image extension issues - updated to handle PNG files correctly
export const fixImageExtension = (url: string): string => {
  if (!url) return '';
  
  // Always return the original URL for external URLs
  if (url.startsWith('http') || url.startsWith('data:')) {
    return url;
  }
  
  // Return the URL as is since we're no longer forcing an extension
  return url;
};
