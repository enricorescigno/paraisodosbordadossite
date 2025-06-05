
import React, { Suspense, memo } from 'react';
import { LucideProps } from 'lucide-react';
import { IconOptimizationService } from '../../services/IconOptimizationService';

interface OptimizedIconProps extends LucideProps {
  name: string;
  fallback?: React.ReactNode;
  priority?: 'high' | 'normal' | 'low';
}

const iconService = IconOptimizationService.getInstance();

const IconFallback = ({ size = 24 }: { size?: number }) => (
  <div 
    className="animate-pulse bg-gray-200 rounded"
    style={{ width: size, height: size }}
  />
);

const OptimizedIcon = memo<OptimizedIconProps>(({ 
  name, 
  fallback, 
  priority = 'normal',
  size,
  ...props 
}) => {
  const [IconComponent, setIconComponent] = React.useState<React.ComponentType<LucideProps> | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Normalize size to number
  const normalizedSize = typeof size === 'string' ? parseInt(size, 10) || 24 : size || 24;

  React.useEffect(() => {
    let isMounted = true;

    const loadIcon = async () => {
      try {
        const component = await iconService.loadIcon(name);
        if (isMounted) {
          setIconComponent(() => component);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load icon');
        }
      }
    };

    // Prioritize loading based on priority
    if (priority === 'high') {
      loadIcon();
    } else {
      // Use requestIdleCallback for lower priority icons
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadIcon);
      } else {
        setTimeout(loadIcon, priority === 'normal' ? 0 : 100);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [name, priority]);

  if (error) {
    return fallback || <IconFallback size={normalizedSize} />;
  }

  if (!IconComponent) {
    return <IconFallback size={normalizedSize} />;
  }

  return (
    <Suspense fallback={fallback || <IconFallback size={normalizedSize} />}>
      <IconComponent size={normalizedSize} {...props} />
    </Suspense>
  );
});

OptimizedIcon.displayName = 'OptimizedIcon';

export default OptimizedIcon;
