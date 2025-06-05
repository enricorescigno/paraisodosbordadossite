
import { useCallback } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { useUIContext } from '@/contexts/UIContext';
import { Product } from '@/types/product';

export const useProductActions = () => {
  const { state: productState, dispatch: productDispatch } = useProductContext();
  const { dispatch: uiDispatch } = useUIContext();

  const loadProducts = useCallback(async (products: Product[]) => {
    try {
      uiDispatch({ type: 'SET_LOADING', payload: { key: 'products', value: true } });
      productDispatch({ type: 'SET_PRODUCTS', payload: products });
      uiDispatch({ type: 'SET_ERROR', payload: { key: 'products', value: null } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar produtos';
      uiDispatch({ type: 'SET_ERROR', payload: { key: 'products', value: errorMessage } });
      uiDispatch({
        type: 'ADD_NOTIFICATION',
        payload: { type: 'error', message: errorMessage },
      });
    } finally {
      uiDispatch({ type: 'SET_LOADING', payload: { key: 'products', value: false } });
    }
  }, [productDispatch, uiDispatch]);

  const selectProduct = useCallback((product: Product | null) => {
    productDispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
  }, [productDispatch]);

  const getWhatsAppLink = useCallback((
    product: Product,
    selectedColor?: string,
    selectedSize?: string,
    quantity: number = 1
  ) => {
    let message = `Olá! Vi o ${product.name} e gostaria de fazer um orçamento!`;
    
    if (selectedColor) {
      message += ` Cor: ${selectedColor}.`;
    }
    
    if (selectedSize) {
      message += ` Tamanho: ${selectedSize}.`;
    }
    
    message += ` Quantidade: ${quantity}.`;
    
    return `https://wa.me/5581995970776?text=${encodeURIComponent(message)}`;
  }, []);

  const shareProduct = useCallback(async (product: Product) => {
    const shareData = {
      title: product.name,
      text: product.description || `Confira este produto: ${product.name}`,
      url: `${window.location.origin}/produto/${product.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        uiDispatch({
          type: 'ADD_NOTIFICATION',
          payload: { type: 'success', message: 'Produto compartilhado com sucesso!' },
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareData.url);
        uiDispatch({
          type: 'ADD_NOTIFICATION',
          payload: { type: 'success', message: 'Link copiado para a área de transferência!' },
        });
      }
    } catch (error) {
      uiDispatch({
        type: 'ADD_NOTIFICATION',
        payload: { type: 'error', message: 'Erro ao compartilhar produto' },
      });
    }
  }, [uiDispatch]);

  const addToFavorites = useCallback((product: Product) => {
    // This could be extended to persist to localStorage or backend
    uiDispatch({
      type: 'ADD_NOTIFICATION',
      payload: { type: 'success', message: `${product.name} adicionado aos favoritos!` },
    });
  }, [uiDispatch]);

  return {
    loadProducts,
    selectProduct,
    getWhatsAppLink,
    shareProduct,
    addToFavorites,
    selectedProduct: productState.selectedProduct,
    products: productState.products,
  };
};
