
import { useState, useEffect, useMemo } from 'react';
import { Product, ProductCategory } from '../types/product';
import { useProductContext } from '../contexts/ProductContext';

export interface FilterOptions {
  categories: ProductCategory[];
  colors: string[];
  sizes: string[];
  priceRange: { min: number; max: number };
}

export const useProductFilters = (products: Product[]) => {
  const { state, actions } = useProductContext();
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'newest'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Generate filter options from available products
  const filterOptions = useMemo((): FilterOptions => {
    const categories = [...new Set(products.map(p => p.category))];
    const colors = [...new Set(products.flatMap(p => p.variants?.colors || p.colors || []))];
    const sizes = [...new Set(products.flatMap(p => p.variants?.sizes || p.sizes || []))];
    
    const prices = products
      .map(p => {
        const price = typeof p.price === 'string' 
          ? parseFloat(p.price.replace(/[^\d,]/g, '').replace(',', '.')) 
          : 0;
        return isNaN(price) ? 0 : price;
      })
      .filter(p => p > 0);
    
    const priceRange = {
      min: Math.min(...prices) || 0,
      max: Math.max(...prices) || 1000
    };

    return { categories, colors, sizes, priceRange };
  }, [products]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (state.selectedCategory) {
      filtered = filtered.filter(p => p.category === state.selectedCategory);
    }

    // Search query filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.keywords?.some(k => k.toLowerCase().includes(query)) ||
        p.tags?.some(t => t.toLowerCase().includes(query))
      );
    }

    // Price filter
    if (state.filters.minPrice !== undefined || state.filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => {
        const price = typeof p.price === 'string' 
          ? parseFloat(p.price.replace(/[^\d,]/g, '').replace(',', '.')) 
          : 0;
        
        if (isNaN(price)) return true;
        
        if (state.filters.minPrice !== undefined && price < state.filters.minPrice) return false;
        if (state.filters.maxPrice !== undefined && price > state.filters.maxPrice) return false;
        
        return true;
      });
    }

    // Color filter
    if (state.filters.colors && state.filters.colors.length > 0) {
      filtered = filtered.filter(p => {
        const productColors = p.variants?.colors || p.colors || [];
        return state.filters.colors!.some(color => productColors.includes(color));
      });
    }

    // Size filter
    if (state.filters.sizes && state.filters.sizes.length > 0) {
      filtered = filtered.filter(p => {
        const productSizes = p.variants?.sizes || p.sizes || [];
        return state.filters.sizes!.some(size => productSizes.includes(size));
      });
    }

    // isNew filter
    if (state.filters.isNew) {
      filtered = filtered.filter(p => p.isNew);
    }

    // isFeatured filter
    if (state.filters.isFeatured) {
      filtered = filtered.filter(p => p.isFeatured || p.featured);
    }

    return filtered;
  }, [products, state]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          const priceA = typeof a.price === 'string' 
            ? parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.')) 
            : 0;
          const priceB = typeof b.price === 'string' 
            ? parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.')) 
            : 0;
          comparison = priceA - priceB;
          break;
        case 'rating':
          const ratingA = typeof a.rating === 'number' ? a.rating : 0;
          const ratingB = typeof b.rating === 'number' ? b.rating : 0;
          comparison = ratingA - ratingB;
          break;
        case 'newest':
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          comparison = dateB - dateA; // Newest first by default
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return sorted;
  }, [filteredProducts, sortBy, sortOrder]);

  const handleCategoryChange = (category: ProductCategory | null) => {
    actions.setCategory(category);
  };

  const handleSearchChange = (query: string) => {
    actions.setSearchQuery(query);
  };

  const handleFiltersChange = (filters: Partial<typeof state.filters>) => {
    actions.setFilters(filters);
  };

  const clearAllFilters = () => {
    actions.clearFilters();
    setSortBy('name');
    setSortOrder('asc');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (state.selectedCategory) count++;
    if (state.searchQuery) count++;
    if (state.filters.minPrice !== undefined || state.filters.maxPrice !== undefined) count++;
    if (state.filters.colors && state.filters.colors.length > 0) count++;
    if (state.filters.sizes && state.filters.sizes.length > 0) count++;
    if (state.filters.isNew) count++;
    if (state.filters.isFeatured) count++;
    return count;
  }, [state]);

  return {
    filteredProducts: sortedProducts,
    filterOptions,
    currentFilters: state.filters,
    selectedCategory: state.selectedCategory,
    searchQuery: state.searchQuery,
    sortBy,
    sortOrder,
    activeFiltersCount,
    setSortBy,
    setSortOrder,
    handleCategoryChange,
    handleSearchChange,
    handleFiltersChange,
    clearAllFilters
  };
};
