
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

/**
 * This component scrolls the window to the top when the route changes
 * and provides a button to scroll to top that appears after scrolling down
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Scroll the page to the top with behavior instant for better UX
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  useEffect(() => {
    // Create a hidden element at the top of the page
    const topAnchor = document.createElement('div');
    topAnchor.id = 'top-anchor';
    topAnchor.style.position = 'absolute';
    topAnchor.style.top = '0';
    topAnchor.style.height = '10px';
    topAnchor.style.width = '100%';
    topAnchor.style.pointerEvents = 'none';
    topAnchor.setAttribute('aria-hidden', 'true');
    document.body.prepend(topAnchor);

    // Use IntersectionObserver to detect when user scrolls away from top
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    
    observer.observe(topAnchor);
    
    return () => {
      observer.disconnect();
      topAnchor.remove();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 p-3 bg-white/80 backdrop-blur-sm text-brand-dark rounded-full shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
