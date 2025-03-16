
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchProductImages, 
  fetchProductColorVariants,
  createProductImage, 
  updateProductImage, 
  removeProductImage 
} from '../services/apiService';
import { ProductImage } from '../types/database';

export const useProductImages = (productId: number) => {
  const queryClient = useQueryClient();

  const { data: images, isLoading, error } = useQuery({
    queryKey: ['product-images', productId],
    queryFn: () => fetchProductImages(productId),
    enabled: !!productId,
  });

  const createImageMutation = useMutation({
    mutationFn: (newImage: Omit<ProductImage, 'id'>) => createProductImage(newImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images', productId] });
      queryClient.invalidateQueries({ queryKey: ['product-color-variants', productId] });
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: (updatedImage: ProductImage) => updateProductImage(updatedImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images', productId] });
      queryClient.invalidateQueries({ queryKey: ['product-color-variants', productId] });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: (imageId: number) => removeProductImage(imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-images', productId] });
      queryClient.invalidateQueries({ queryKey: ['product-color-variants', productId] });
    },
  });

  return {
    images: images || [],
    isLoading,
    error,
    createImage: createImageMutation.mutate,
    updateImage: updateImageMutation.mutate,
    deleteImage: deleteImageMutation.mutate,
    createImageLoading: createImageMutation.isPending,
    updateImageLoading: updateImageMutation.isPending,
    deleteImageLoading: deleteImageMutation.isPending,
  };
};

export const useProductColorVariants = (productId: number) => {
  return useQuery({
    queryKey: ['product-color-variants', productId],
    queryFn: () => fetchProductColorVariants(productId),
    enabled: !!productId,
  });
};
