
import React from 'react';
import { Skeleton } from "./skeleton";

export const ImageSkeleton = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
    <Skeleton className="h-full w-full" />
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="flex flex-col h-full w-full">
    <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-4 overflow-hidden relative shadow-sm">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="flex flex-col flex-grow w-full">
      <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-full mb-4" />
    </div>
    <div className="flex justify-center mt-auto w-full">
      <Skeleton className="h-12 w-32 rounded-full" />
    </div>
  </div>
);

export const GallerySkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden">
    <div className="relative" style={{ width: '100%', aspectRatio: '1/1' }}>
      <Skeleton className="w-full h-full" />
    </div>
    <div className="flex justify-center gap-3 mt-4 overflow-x-auto py-2">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="h-16 w-16 rounded-md" />
      ))}
    </div>
  </div>
);
