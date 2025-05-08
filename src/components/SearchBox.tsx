
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

const SearchBox = ({ onClose, showCloseButton = true }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length >= 2) {
      setIsSearching(true);
      const results = searchProducts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If we have search results, navigate to the first one
    if (searchResults.length > 0) {
      navigate(getProductUrl(searchResults[0]));
      onClose();
    }
  };
  
  const handleResultClick = (product: Product) => {
    navigate(getProductUrl(product));
    onClose();
  };
  
  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
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
      
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          <ul className="py-2">
            {searchResults.map((product) => (
              <li key={product.id} className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => handleResultClick(product)}>
                <div className="flex items-center gap-3">
                  {product.imageUrl && (
                    <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
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
        </div>
      )}
    </div>
  );
};

export default SearchBox;
