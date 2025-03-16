
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente utilitário que reseta a posição de rolagem para o topo 
 * sempre que uma navegação ocorre.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Para uma transição imediata sem animação
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
