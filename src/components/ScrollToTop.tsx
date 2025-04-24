
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This component scrolls the window to the top when the route changes
 * It must be used inside a Router component
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      // Scroll the page to the top with behavior instant for better UX
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    } catch (error) {
      console.error("Failed to scroll to top:", error);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
