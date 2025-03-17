
import { useScrollToTop } from '../hooks/useScrollToTop';

/**
 * Componente utilitário que reseta a posição de rolagem para o topo 
 * sempre que uma navegação ocorre.
 */
const ScrollToTop = () => {
  // Usando hook personalizado para resetar scroll
  useScrollToTop();
  return null;
};

export default ScrollToTop;
