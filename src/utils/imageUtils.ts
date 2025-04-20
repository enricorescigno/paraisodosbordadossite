
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
  
  // For local images, we'll just return the original since we aren't implementing
  // a resizing server right now
  return url;
};

// Cache images in browser 
export const cacheImagesInBrowser = (imageUrls: string[]): void => {
  if (!('caches' in window)) return;
  
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
};
