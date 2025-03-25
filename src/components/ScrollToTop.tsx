
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Este componente garante que o scroll volta ao topo quando a navegação ocorre
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rola a página para o topo com behavior instant para melhor UX
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
