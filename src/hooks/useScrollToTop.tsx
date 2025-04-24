
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to scroll to top when the route changes
 * Must be used within a component that's inside a Router
 */
export function useScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    try {
      // Scroll to top immediately when the route changes
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    } catch (error) {
      console.error('Error in useScrollToTop:', error);
    }
  }, [location.pathname]);
}
