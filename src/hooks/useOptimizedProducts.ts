
import { useEffect, useCallback } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Product, ProductCategory } from '../types/product';
import { ProductService } from '../services/ProductService';

export interface UseOptimizedProductsOptions {
  category?: ProductCategory;
  featured?: boolean;
  newOnly?: boolean;
  limit?: number;
  enabled?: boolean;
}

export const useOptimizedProducts = (options: UseOptimizedProductsOptions = {}) => {
  const {
    products,
    loading,
    error,
    filteredProducts,
    setProducts,
    setLoading,
    setError,
    setCategory,
  } = useAppStore();

  const { category, featured, newOnly, limit, enabled = true } = options;

  const loadProducts = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);

      const productService = ProductService.getInstance();
      let result = productService.getProducts();

      // Apply server-side filters if needed
      if (category) {
        result = productService.getProductsByCategory(category);
        setCategory(category);
      }

      if (featured) {
        result = result.filter(p => p.isFeatured);
      }

      if (newOnly) {
        result = result.filter(p => p.isNew);
      }

      if (limit) {
        result = result.slice(0, limit);
      }

      setProducts(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [category, featured, newOnly, limit, enabled, setProducts, setLoading, setError, setCategory]);

  // Load products on mount and when options change
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Return memoized filtered products
  const finalProducts = filteredProducts();

  return {
    products: finalProducts,
    loading,
    error,
    refetch: loadProducts,
  };
};

export const useOptimizedProduct = (id: string | number) => {
  const { selectedProduct, loading, error, setSelectedProduct, setLoading, setError } = useAppStore();

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const productService = ProductService.getInstance();
      const result = productService.getProductById(id);
      
      if (!result) {
        throw new Error('Produto não encontrado');
      }

      setSelectedProduct(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produto';
      setError(errorMessage);
      setSelectedProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id, setSelectedProduct, setLoading, setError]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    product: selectedProduct,
    loading,
    error,
    refetch: loadProduct,
  };
};
