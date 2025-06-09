
import { useState, useEffect, useRef } from 'react';

type Priority = 'critical' | 'high' | 'medium' | 'low' | 'idle';

interface UseViewportPriorityOptions {
  rootMargin?: string;
  threshold?: number;
}

export const useViewportPriority = (
  options: UseViewportPriorityOptions = {}
) => {
  const { rootMargin = '200px', threshold = 0.1 } = options;
  const [priority, setPriority] = useState<Priority>('idle');
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Multiple observers for different priority zones
    const criticalObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPriority('critical');
        }
      },
      { rootMargin: '0px', threshold }
    );

    const highObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && priority === 'idle') {
          setPriority('high');
        }
      },
      { rootMargin: '100px', threshold }
    );

    const mediumObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && priority === 'idle') {
          setPriority('medium');
        }
      },
      { rootMargin: '300px', threshold }
    );

    const lowObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && priority === 'idle') {
          setPriority('low');
        }
      },
      { rootMargin: '500px', threshold }
    );

    if (elementRef.current) {
      criticalObserver.observe(elementRef.current);
      highObserver.observe(elementRef.current);
      mediumObserver.observe(elementRef.current);
      lowObserver.observe(elementRef.current);
    }

    return () => {
      criticalObserver.disconnect();
      highObserver.disconnect();
      mediumObserver.disconnect();
      lowObserver.disconnect();
    };
  }, [threshold, rootMargin]);

  return {
    ref: elementRef,
    priority
  };
};
