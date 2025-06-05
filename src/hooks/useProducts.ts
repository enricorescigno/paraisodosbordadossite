
import { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../types/product';
import { ProductService } from '../services/ProductService';

export interface UseProductsOptions {
  category?: ProductCategory;
  featured?: boolean;
  newOnly?: boolean;
  limit?: number;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productService = ProductService.getInstance();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        let result = productService.getProducts();

        // Apply filters
        if (options.category) {
          result = productService.getProductsByCategory(options.category);
        }

        if (options.featured) {
          result = result.filter(p => p.isFeatured);
        }

        if (options.newOnly) {
          result = result.filter(p => p.isNew);
        }

        if (options.limit) {
          result = result.slice(0, options.limit);
        }

        setProducts(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [options.category, options.featured, options.newOnly, options.limit]);

  return { products, loading, error };
};

export const useProduct = (id: string | number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productService = ProductService.getInstance();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const result = productService.getProductById(id);
        
        if (!result) {
          throw new Error('Produto não encontrado');
        }

        setProduct(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produto');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return { product, loading, error };
};
