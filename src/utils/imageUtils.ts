
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
  
  // For local images, create WebP srcSet
  // Extract base name without extension
  const baseUrl = imageUrl.replace(/\.[^/.]+$/, "");
  
  // Create srcSet for WebP versions
  return `${baseUrl}.webp 1x, ${baseUrl}@2x.webp 2x`;
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

// Function to return WebP version if available
export const getWebPImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  // Skip for external URLs
  if (imageUrl.includes('unsplash.com') || (imageUrl.includes('http') && !imageUrl.includes(window.location.hostname))) {
    return imageUrl;
  }
  
  // Skip if already webp
  if (imageUrl.toLowerCase().endsWith('.webp')) {
    return imageUrl;
  }
  
  // Replace extension with .webp
  return imageUrl.replace(/\.[^/.]+$/, ".webp");
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
