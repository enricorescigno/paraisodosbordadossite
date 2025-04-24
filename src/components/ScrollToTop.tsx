
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This component scrolls the window to the top when the route changes
 * It must be used inside a Layout component which is inside the Router
 */
const ScrollToTop = () => {
  // Get the current location using React Router's hook
  const location = useLocation();

  useEffect(() => {
    try {
      // Scroll the page to the top with behavior instant for better UX
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    } catch (error) {
      console.error('Error scrolling to top:', error);
    }
  }, [location.pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
