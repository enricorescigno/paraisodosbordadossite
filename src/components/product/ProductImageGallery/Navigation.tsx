
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  hasMultipleImages: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const Navigation = ({ hasMultipleImages, onPrevious, onNext }: NavigationProps) => {
  if (!hasMultipleImages) return null;

  return (
    <>
      <button 
        onClick={onPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      <button 
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
    </>
  );
};

export default Navigation;
