
import { useMemo, useCallback } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Product } from '@/types/product';

export const useProductFilters = () => {
  const { state, dispatch } = useProductContext();

  const filteredProducts = useMemo(() => {
    let filtered = [...state.products];

    // Category filter
    if (state.filters.category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().includes(state.filters.category.toLowerCase())
      );
    }

    // Search filter
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.keywords && product.keywords.some(keyword =>
          keyword.toLowerCase().includes(searchTerm)
        ))
      );
    }

    // Color filter
    if (state.filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors && product.colors.some(color =>
          state.filters.colors.includes(color)
        )
      );
    }

    // New products filter
    if (state.filters.isNew !== null) {
      filtered = filtered.filter(product => product.isNew === state.filters.isNew);
    }

    return filtered;
  }, [state.products, state.filters]);

  const updateFilter = useCallback((filterKey: keyof typeof state.filters, value: any) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { [filterKey]: value },
    });
  }, [dispatch]);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, [dispatch]);

  const getAvailableCategories = useMemo(() => {
    const categories = new Set(state.products.map(p => p.category));
    return Array.from(categories).sort();
  }, [state.products]);

  const getAvailableColors = useMemo(() => {
    const colors = new Set<string>();
    state.products.forEach(product => {
      if (product.colors) {
        product.colors.forEach(color => colors.add(color));
      }
    });
    return Array.from(colors).sort();
  }, [state.products]);

  return {
    filteredProducts,
    filters: state.filters,
    updateFilter,
    clearFilters,
    getAvailableCategories,
    getAvailableColors,
    hasActiveFilters: Object.values(state.filters).some(value =>
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    ),
  };
};
