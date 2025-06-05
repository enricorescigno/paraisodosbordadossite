
import { useState, useEffect } from 'react';
import { LucideProps } from 'lucide-react';
import { IconOptimizationService } from '../services/IconOptimizationService';

interface UseOptimizedIconReturn {
  IconComponent: React.ComponentType<LucideProps> | null;
  isLoading: boolean;
  error: string | null;
}

export const useOptimizedIcon = (
  iconName: string,
  priority: 'high' | 'normal' | 'low' = 'normal'
): UseOptimizedIconReturn => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<LucideProps> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const iconService = IconOptimizationService.getInstance();
    
    const loadIcon = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const component = await iconService.loadIcon(iconName);
        
        if (isMounted) {
          setIconComponent(() => component);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load icon');
          setIsLoading(false);
        }
      }
    };

    // Load immediately for high priority, defer for others
    if (priority === 'high') {
      loadIcon();
    } else {
      const delay = priority === 'normal' ? 0 : 100;
      
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadIcon);
      } else {
        setTimeout(loadIcon, delay);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [iconName, priority]);

  return { IconComponent, isLoading, error };
};

export default useOptimizedIcon;
