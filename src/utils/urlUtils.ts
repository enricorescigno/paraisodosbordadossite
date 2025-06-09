
export const toAbsoluteURL = (url: string): string => {
  if (!url) return '';
  
  // If already absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If starts with /, make it relative to current origin
  if (url.startsWith('/')) {
    return `${window.location.origin}${url}`;
  }
  
  // If relative path, make it relative to current origin
  return `${window.location.origin}/${url}`;
};
