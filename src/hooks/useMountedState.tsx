
import { useRef, useEffect } from 'react';

/**
 * A hook that tracks component mounting state
 * to prevent memory leaks and state updates on unmounted components
 * 
 * @returns {React.RefObject<boolean>} - A ref tracking if the component is mounted
 */
export const useMountedState = () => {
  const isMounted = useRef(true);
  
  useEffect(() => {
    // Set to true on mount (redundant but explicit)
    isMounted.current = true;
    
    // Cleanup function to set false on unmount
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  return isMounted;
};

export default useMountedState;
