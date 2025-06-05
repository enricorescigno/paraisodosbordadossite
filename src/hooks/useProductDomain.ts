
import { useState, useEffect } from 'react';
import { ProductEntity } from '../domain/entities/ProductEntity';
import { ProductServiceFactory } from '../application/factories/ProductServiceFactory';
import { toast } from 'sonner';

export const useProductDomain = (productId?: string) => {
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findProductByIdUseCase = ProductServiceFactory.createFindProductByIdUseCase();
  const processImagesUseCase = ProductServiceFactory.createProcessProductImagesUseCase();

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const foundProduct = await findProductByIdUseCase.execute(productId);
        
        if (!foundProduct) {
          setError('Produto não encontrado');
          toast.error('Produto não encontrado');
          return;
        }

        setProduct(foundProduct);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produto';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const processProductImages = (selectedColor?: string) => {
    if (!product) return null;

    try {
      return processImagesUseCase.execute(product, selectedColor);
    } catch (err) {
      console.error('Error processing images:', err);
      return null;
    }
  };

  return {
    product,
    loading,
    error,
    processProductImages,
    refetch: () => {
      if (productId) {
        setProduct(null);
        setError(null);
      }
    }
  };
};
