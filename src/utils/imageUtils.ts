
/**
 * Simplified image utilities - removed WebP conversion that was causing issues
 */

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

// Simplified image URL processing - no WebP conversion
export const getOptimizedImageUrl = (url: string): string => {
  if (!url) return '';
  
  // Don't modify external URLs
  if (url.includes('http') && !url.includes(window.location.origin)) {
    return url;
  }
  
  // For local images, ensure proper path
  return url.startsWith('/') ? url : `/${url}`;
};

// Pre-load specific images for faster access
export const preloadImages = (urls: string[]): void => {
  if (!urls || urls.length === 0) return;
  
  urls.forEach(url => {
    if (!url) return;
    
    const img = new Image();
    img.src = getOptimizedImageUrl(url);
    
    // Set loading priority
    if ('loading' in HTMLImageElement.prototype) {
      (img as any).loading = urls.length < 5 ? 'eager' : 'lazy';
    }
  });
};

// Clean up image URLs
export const cleanImageUrl = (url: string): string => {
  if (!url) return '';
  
  // Always return the original URL for external URLs
  if (url.startsWith('http') || url.startsWith('data:')) {
    return url;
  }
  
  // Ensure proper path for local images
  return getOptimizedImageUrl(url);
};
