
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top imediatamente quando a rota muda
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);
  
  return null;
}
