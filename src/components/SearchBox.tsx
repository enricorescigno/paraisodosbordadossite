
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchProducts, getProductUrl, Product } from '../utils/searchUtils';

interface SearchBoxProps {
  className?: string;
  mobileView?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ className, mobileView = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle search on input change
  useEffect(() => {
    if (searchQuery.length > 1) {
      const foundProducts = searchProducts(searchQuery);
      setResults(foundProducts);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If we have results, navigate to the first one
    if (results.length > 0) {
      const url = getProductUrl(results[0]);
      console.log(`Navigating to: ${url}`);
      navigate(url);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleResultClick = (product: Product) => {
    const url = getProductUrl(product);
    console.log(`Result clicked, navigating to: ${url}`);
    navigate(url);
    setSearchQuery('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="O que você procura?"
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-10 top-0 h-full px-2 text-gray-500 hover:text-brand-red"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-brand-red rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Search results dropdown */}
      {isOpen && results.length > 0 && (
        <div className={`absolute top-full mt-1 w-full bg-white shadow-lg rounded-lg z-50 max-h-[80vh] overflow-y-auto ${mobileView ? 'left-0' : ''}`}>
          <div className="py-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b">
              Resultados da pesquisa
            </div>
            {results.map((product) => (
              <div
                key={product.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(product)}
              >
                <div className="text-sm font-medium">{product.name}</div>
                <div className="text-xs text-gray-500">
                  {product.type === 'portfolio' ? 'Portfólio: ' : 'Produto: '}
                  {product.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && searchQuery.length > 1 && results.length === 0 && (
        <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-lg z-50">
          <div className="p-4 text-sm text-gray-500">
            Nenhum resultado encontrado para "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
