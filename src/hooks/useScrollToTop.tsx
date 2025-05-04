
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = (): void => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
};

// Export as default for backward compatibility
export default useScrollToTop;
