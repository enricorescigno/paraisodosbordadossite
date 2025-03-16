
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchProducts, 
  fetchProductsByCategorySlug, 
  fetchProductById, 
  fetchHighlightedProducts,
  createProduct, 
  updateProduct, 
  removeProduct
} from '../services/apiService';
import { Product } from '../types/database';

export const useProducts = (type: 'product' | 'portfolio' = 'product') => {
  const queryClient = useQueryClient();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', type],
    queryFn: () => fetchProducts(type),
  });

  const createProductMutation = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct: Product) => updateProduct(updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId: number) => removeProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products: products || [],
    isLoading,
    error,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    createProductLoading: createProductMutation.isPending,
    updateProductLoading: updateProductMutation.isPending,
    deleteProductLoading: deleteProductMutation.isPending,
  };
};

export const useProductsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug],
    queryFn: () => fetchProductsByCategorySlug(categorySlug),
    enabled: !!categorySlug,
  });
};

export const useProductById = (id: number | string) => {
  const productId = typeof id === 'string' ? parseInt(id) : id;
  
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!id,
  });
};

export const useHighlightedProducts = (type?: 'product' | 'portfolio') => {
  return useQuery({
    queryKey: ['products', 'highlighted', type],
    queryFn: () => fetchHighlightedProducts(type),
  });
};
