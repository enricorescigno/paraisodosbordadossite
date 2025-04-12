
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonLoaderProps {
  type: 'product' | 'category' | 'text' | 'banner' | 'image';
  count?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type, 
  count = 1, 
  height, 
  width,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'product':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </div>
        );
        
      case 'category':
        return (
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        );
        
      case 'text':
        return (
          <Skeleton 
            className={`h-${height || 4} w-${width || 'full'} ${className}`} 
          />
        );
        
      case 'banner':
        return (
          <Skeleton 
            className={`w-full h-${height || 40} rounded-lg ${className}`} 
          />
        );
        
      case 'image':
        return (
          <Skeleton 
            className={`aspect-square ${width ? `w-${width}` : 'w-full'} ${className}`} 
          />
        );
        
      default:
        return <Skeleton className={`h-${height || 4} w-${width || 'full'} ${className}`} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
};

export default SkeletonLoader;
