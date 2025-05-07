
/**
 * Converts a local image path to an absolute URL
 * @param path Local image path (e.g., "/lovable-uploads/image.png")
 * @returns Absolute URL for the image
 */
export const toAbsoluteURL = (path: string): string => {
  // Only transform local paths that don't already have a domain
  if (!path) return '';
  
  if (path.startsWith('http')) {
    return path;
  }
  
  return `https://191fbbb5-946d-442c-89b6-c5be03313102.lovableproject.com${path}`;
};

/**
 * Gets the appropriate loading attribute based on importance
 * @param isImportant Whether the image is important (above the fold)
 * @returns Loading attribute for image tag
 */
export const getImageLoading = (isImportant: boolean): "eager" | "lazy" => {
  return isImportant ? "eager" : "lazy";
};

/**
 * Fixes image extension if needed
 * @param url Image URL
 * @returns Fixed URL with proper extension
 */
export const fixImageExtension = (url: string): string => {
  if (!url) return '';
  return url;
};

/**
 * Gets a placeholder image for a specific category
 * @param category Product category
 * @returns Placeholder image URL
 */
export const getImagePlaceholder = (category: string): string => {
  const defaultPlaceholder = '/placeholder.svg';
  
  const categoryPlaceholders: Record<string, string> = {
    'Cama': 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=250',
    'Banho': 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=250',
    'Mesa e Cozinha': 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=250',
    'Vestuário': 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=250',
    'Infantil': 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=250'
  };
  
  return categoryPlaceholders[category] || defaultPlaceholder;
};

/**
 * Caches images in browser for faster loading
 * @param images Array of image URLs to cache
 */
export const cacheImagesInBrowser = (images: string[]): void => {
  if (!Array.isArray(images)) return;
  
  images.forEach(src => {
    if (typeof src !== 'string') return;
    
    const img = new Image();
    img.src = src;
  });
};

/**
 * Preloads important images
 * @param images Array of image URLs to preload
 */
export const preloadImages = (images: string[]): void => {
  if (!Array.isArray(images) || images.length === 0) return;
  
  images.forEach(src => {
    if (typeof src !== 'string') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};
