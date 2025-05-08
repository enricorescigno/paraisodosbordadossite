
/**
 * Converts a relative path to an absolute URL
 * @param path - The path to convert
 * @returns Absolute URL path
 */
export const toAbsoluteURL = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  
  // If it's already an absolute URL or a base64 data URL, return it as is
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  // Make sure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Don't attempt to add or change file extensions, just return the normalized path
  return normalizedPath;
};
