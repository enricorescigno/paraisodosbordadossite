
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../services/apiService';
import { Category } from '../types/database';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiService.getCategories()
  });
};

export const useMainCategories = (type: 'product' | 'portfolio' = 'product') => {
  return useQuery({
    queryKey: ['categories', 'main', type],
    queryFn: () => apiService.getMainCategories(type)
  });
};

export const useSubcategories = (parentId: number | string | undefined) => {
  return useQuery({
    queryKey: ['categories', 'sub', parentId],
    queryFn: () => apiService.getSubcategories(parentId as number | string),
    enabled: !!parentId, // Only run if parentId is defined
  });
};

export const useCategoryById = (id: number | string | undefined) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => apiService.getCategoryById(id as number | string),
    enabled: !!id, // Only run if id is defined
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (category: Omit<Category, 'id'>) => apiService.createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: number | string, updates: Partial<Category> }) => 
      apiService.updateCategory(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number | string) => apiService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  });
};
