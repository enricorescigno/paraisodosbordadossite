
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  onClose: () => void;
  showCloseButton?: boolean;
}

const SearchBox = ({ onClose, showCloseButton = true }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            "w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200",
            "focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30",
            "transition-all duration-300 placeholder:text-gray-400"
          )}
        />
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;
