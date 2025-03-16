
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../services/apiService';
import { Product } from '../types/database';

export const useProducts = (type: 'product' | 'portfolio' = 'product') => {
  return useQuery({
    queryKey: ['products', type],
    queryFn: () => apiService.getProductsWithImages(type)
  });
};

export const useProductById = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiService.getProductWithImagesById(id as string | number),
    enabled: !!id, // Only run if id is defined
  });
};

export const useProductsByCategory = (categorySlug: string | undefined) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug],
    queryFn: () => apiService.getProductsByCategorySlug(categorySlug as string),
    enabled: !!categorySlug, // Only run if categorySlug is defined
  });
};

export const useHighlightedProducts = () => {
  return useQuery({
    queryKey: ['products', 'highlighted'],
    queryFn: () => apiService.getHighlightedProducts()
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (product: Omit<Product, 'id'>) => apiService.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: number | string, updates: Partial<Product> }) => 
      apiService.updateProduct(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number | string) => apiService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};
