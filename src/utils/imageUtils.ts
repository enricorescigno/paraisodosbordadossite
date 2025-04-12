
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
  
  // For local images, create srcSet for different sizes
  return `${imageUrl} 1x, ${imageUrl} 2x`;
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
