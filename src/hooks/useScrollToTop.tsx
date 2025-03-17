
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    // Usando behavior: 'instant' para evitar animação de scroll que pode causar problemas de UX
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);
  
  return null;
}
