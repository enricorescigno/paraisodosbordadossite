
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchProducts, getProductUrl } from '@/utils/searchUtils';
import { Product } from '@/types/product';
import { useNavigate } from 'react-router-dom';

interface SearchBoxProps {
  onClose: () => void;
  showCloseButton?: boolean;
}

// Input sanitization helper
const sanitizeSearchQuery = (query: string): string => {
  return query.trim().replace(/[<>]/g, '').substring(0, 100); // Limit to 100 chars
};

const SearchBox = ({ onClose, showCloseButton = true }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    const sanitizedQuery = sanitizeSearchQuery(query);
    setSearchQuery(sanitizedQuery);
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    if (sanitizedQuery.length >= 2) {
      setIsSearching(true);
      
      // Debounce search to prevent excessive requests
      const newTimeout = setTimeout(() => {
        try {
          const results = searchProducts(sanitizedQuery);
          setSearchResults(results.slice(0, 10)); // Limit results to 10 items
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);
      
      setSearchTimeout(newTimeout);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear timeout on submit
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // If we have search results, navigate to the first one
    if (searchResults.length > 0) {
      try {
        navigate(getProductUrl(searchResults[0]));
        onClose();
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };
  
  const handleResultClick = (product: Product) => {
    try {
      navigate(getProductUrl(product));
      onClose();
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };
  
  // Cleanup timeout on unmount
  useState(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  });
  
  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className={cn(
              "w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200",
              "focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30",
              "transition-all duration-300 placeholder:text-gray-400"
            )}
            maxLength={100}
            autoComplete="off"
            spellCheck="false"
          />
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Fechar busca"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </form>
      
      {(searchResults.length > 0 || isSearching) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {isSearching ? (
            <div className="py-4 px-4 text-center text-gray-500">
              Buscando...
            </div>
          ) : (
            <ul className="py-2" role="listbox">
              {searchResults.map((product) => (
                <li 
                  key={product.id} 
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer focus:bg-gray-50" 
                  onClick={() => handleResultClick(product)}
                  role="option"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleResultClick(product);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    {product.imageUrl && (
                      <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
