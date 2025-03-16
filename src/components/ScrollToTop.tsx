
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente utilitário que reseta a posição de rolagem para o topo 
 * sempre que uma navegação ocorre.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately scroll to top when route changes
    window.scrollTo({
      top: 0,
      behavior: 'auto' // Changed from 'instant' to 'auto' for better browser compatibility
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
