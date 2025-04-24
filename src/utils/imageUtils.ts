
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
  if (!category) return '/placeholder.svg';
  
  if (category.toLowerCase().includes('bone') || category.toLowerCase().includes('bonés')) {
    return '/placeholder.svg';
  }
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
  if (typeof navigator === 'undefined' || !navigator) {
    return 'medium';
  }
  
  // Safely check for navigator.connection
  try {
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
  } catch (e) {
    console.log('Error detecting connection type:', e);
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
  
  try {
    // Don't modify external URLs
    if (url.includes('http') && typeof window !== 'undefined' && !url.includes(window.location.origin)) {
      return url;
    }
  } catch (e) {
    console.error('Error in getOptimizedImageUrl:', e);
  }
  
  // For local images, we'll just return the original since we aren't implementing
  // a resizing server right now
  return url;
};

// Cache images in browser - this was missing
export const cacheImagesInBrowser = (imageUrls: string[]): void => {
  if (!imageUrls || !Array.isArray(imageUrls)) return;
  
  if (typeof window === 'undefined' || !('caches' in window)) return;
  
  try {
    // Use Cache API to store images (if browser supports it)
    const cacheName = 'paraiso-images-v1';
    
    caches.open(cacheName).then(cache => {
      imageUrls.forEach(url => {
        if (!url) return;
        
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
    }).catch(err => {
      console.error('Error caching images:', err);
    });
  } catch (e) {
    console.error('Error in cacheImagesInBrowser:', e);
  }
};

// Pre-load specific images for faster access
export const preloadImages = (urls: string[]): void => {
  if (!urls || !Array.isArray(urls) || urls.length === 0 || typeof window === 'undefined') return;
  
  try {
    urls.forEach(url => {
      if (!url) return;
      
      const img = new Image();
      img.src = url;
    });
  } catch (e) {
    console.error('Error preloading images:', e);
  }
};

// Fix image extension issues
export const fixImageExtension = (url: string): string => {
  if (!url) return '';
  
  try {
    // Se for alguma das novas imagens de bonés, garanta que esteja correta
    if (url.includes('afe9f856-920c-4f37-a090-e54c6d0eb85d') || 
        url.includes('3a0d16aa-8bb6-45a1-92a5-352852950663') ||
        url.includes('60729ca5-43f4-4c68-bc00-bdbf97652252') ||
        url.includes('a521517c-0d8f-4061-88b7-b003cb7e2a92') ||
        url.includes('f4081104-c422-44ea-9a18-e282baa1e084') ||
        url.includes('092178c1-5607-4b9f-bf81-372d811d380d')) {
      return url;
    }
    
    // If the URL ends with .webp but we're having issues, try removing it
    if (url.endsWith('.webp')) {
      return url.replace('.webp', '.png');
    }
    
    // If there's no extension, add .png as fallback
    if (!url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) && !url.includes('?')) {
      return `${url}.png`;
    }
  } catch (e) {
    console.error('Error in fixImageExtension:', e);
    return url || '';
  }
  
  return url;
};
