
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
