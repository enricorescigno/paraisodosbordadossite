
import * as React from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIfMobile = () => {
      const mobileWidth = 768; // Consider screens narrower than 768px as mobile
      setIsMobile(window.innerWidth < mobileWidth);
    };

    // Check on mount
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

// Also export as default for backward compatibility
export default useIsMobile;
