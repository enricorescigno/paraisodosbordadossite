
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
    return "/placeholder.svg";
  } 
  else if (lowerCategory.includes('cama')) {
    return "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop";
  }
  else if (lowerCategory.includes('mesa') || lowerCategory.includes('cozinha')) {
    return "https://images.unsplash.com/photo-1556911899-5df3189a6e32?q=80&w=500&auto=format&fit=crop";
  }
  else if (lowerCategory.includes('banho') || lowerCategory.includes('toalha')) {
    return "https://images.unsplash.com/photo-1563293815-7b9673b068a9?q=80&w=500&auto=format&fit=crop";
  }
  else if (lowerCategory.includes('vestuário') || lowerCategory.includes('camisa')) {
    return "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop";
  }
  else if (lowerCategory.includes('infantil')) {
    return "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop";
  }
  
  return "/placeholder.svg";
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

// Cache images in browser for faster subsequent loads
export const cacheImagesInBrowser = (imageUrls: string[]): void => {
  if (!('caches' in window)) return;
  
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
    console.error('Failed to open cache:', err);
  });
};

// Pre-load specific images for faster access
export const preloadImages = (urls: string[]): void => {
  if (!urls || urls.length === 0) return;
  
  urls.forEach(url => {
    if (!url) return;
    
    const img = new Image();
    img.src = url;
    
    // Optional: Set loading priority
    if ('fetchPriority' in HTMLImageElement.prototype) {
      (img as any).fetchPriority = urls.length < 5 ? 'high' : 'auto';
    }
    
    // Log success or failure
    img.onload = () => console.log(`Preloaded: ${url}`);
    img.onerror = () => console.error(`Failed to preload: ${url}`);
  });
};

// Fix image extension issues
export const fixImageExtension = (url: string): string => {
  if (!url) return '';
  
  // Se for alguma das novas imagens de bonés, garanta que esteja correta
  if (url.includes('afe9f856-920c-4f37-a090-e54c6d0eb85d') || 
      url.includes('3a0d16aa-8bb6-45a1-92a5-352852950663') ||
      url.includes('60729ca5-43f4-4c68-bc00-bdbf97652252') ||
      url.includes('a521517c-0d8f-4061-88b7-b003cb7e2a92')) {
    return url;
  }
  
  // Check if URL has lovable-uploads and verify path is correct
  if (url.includes('lovable-uploads') && !url.startsWith('/')) {
    return `/${url}`;
  }
  
  // Check for absolute path issues
  if (url.startsWith('lovable-uploads/')) {
    return `/${url}`;
  }
  
  // If the URL ends with .webp but we're having issues, try removing it
  if (url.endsWith('.webp')) {
    return url.replace('.webp', '.png');
  }
  
  // If there's no extension, add .png as fallback
  if (!url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) && !url.includes('?')) {
    return `${url}.png`;
  }
  
  return url;
};
