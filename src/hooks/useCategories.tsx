
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, fetchCategoryBySlug, createCategory, updateCategory, removeCategory } from '../services/apiService';
import { Category } from '../types/database';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });

  const createCategoryMutation = useMutation({
    mutationFn: (newCategory: Omit<Category, 'id'>) => createCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (updatedCategory: Category) => updateCategory(updatedCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: number) => removeCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    categories: categories || [],
    isLoading,
    error,
    createCategory: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    createCategoryLoading: createCategoryMutation.isPending,
    updateCategoryLoading: updateCategoryMutation.isPending,
    deleteCategoryLoading: deleteCategoryMutation.isPending,
  };
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => fetchCategoryBySlug(slug),
    enabled: !!slug,
  });
};

export const getParentCategories = (categories: Category[]) => {
  return categories.filter(category => category.parent_id === null);
};

export const getChildCategories = (categories: Category[], parentId: number) => {
  return categories.filter(category => category.parent_id === parentId);
};

export const getCategoryPath = (categories: Category[], categoryId: number): Category[] => {
  const path: Category[] = [];
  let currentCategory = categories.find(c => c.id === categoryId);
  
  while (currentCategory) {
    path.unshift(currentCategory);
    currentCategory = currentCategory.parent_id 
      ? categories.find(c => c.id === currentCategory.parent_id) 
      : null;
  }
  
  return path;
};
