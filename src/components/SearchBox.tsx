
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchProducts, getProductUrl, Product } from '../utils/searchUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

interface SearchBoxProps {
  className?: string;
  mobileView?: boolean;
  onClose?: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ className, mobileView = false, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Handle search on input change with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 1) {
        const foundProducts = searchProducts(searchQuery);
        setResults(foundProducts);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
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
      navigate(url);
      setSearchQuery('');
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const handleResultClick = (product: Product) => {
    const url = getProductUrl(product);
    navigate(url);
    setSearchQuery('');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-yellow-100 font-semibold">{part}</span> : part
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="w-full">
        <div className="relative w-full">
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="O que você procura?"
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            whileFocus={{ scale: isMobile ? 1 : 1.02 }}
            transition={{ duration: 0.2 }}
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
          <motion.button
            type="submit"
            className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-brand-red rounded-r-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Search className="h-5 w-5" />
          </motion.button>
        </div>
      </form>

      {/* Search results dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-1 w-full bg-white shadow-lg rounded-lg z-50 max-h-[60vh] overflow-y-auto ${mobileView ? 'left-0' : ''}`}
          >
            <div className="py-2">
              <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b">
                Resultados da pesquisa
              </div>
              {results.map((product) => (
                <motion.div
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  onClick={() => handleResultClick(product)}
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                >
                  {product.imageUrl ? (
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">Sem imagem</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{highlightMatch(product.name, searchQuery)}</div>
                    <div className="text-xs text-gray-500">
                      {product.type === 'portfolio' ? 'Portfólio: ' : 'Produto: '}
                      {highlightMatch(product.category, searchQuery)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && searchQuery.length > 1 && results.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-lg z-50"
          >
            <div className="p-4 text-sm text-gray-500">
              Nenhum resultado encontrado para "{searchQuery}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
