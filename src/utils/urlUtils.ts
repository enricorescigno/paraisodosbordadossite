
/**
 * Converts a relative path to an absolute URL
 * @param path - The path to convert
 * @returns Absolute URL path
 */
export const toAbsoluteURL = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  
  // If it's already an absolute URL (including imgur), a base64 data URL, return it as is
  if (path.startsWith('http') || path.startsWith('data:') || path.includes('imgur.com')) {
    return path;
  }
  
  // Make sure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Check if the path is actually valid to prevent issues
  if (normalizedPath === '/' || normalizedPath.length < 2) {
    return '/placeholder.svg';
  }
  
  return normalizedPath;
};
