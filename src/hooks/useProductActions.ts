
import { useCallback } from 'react';
import { Product } from '../types/product';
import { useProductContext } from '../contexts/ProductContext';
import { useUIContext } from '../contexts/UIContext';

export const useProductActions = () => {
  const { actions: productActions } = useProductContext();
  const { actions: uiActions } = useUIContext();

  const generateWhatsAppLink = useCallback((
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
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description || `Confira este produto: ${product.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        uiActions.addNotification({
          type: 'success',
          message: 'Link copiado para a área de transferência!'
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        uiActions.addNotification({
          type: 'error',
          message: 'Erro ao copiar link'
        });
      }
    }
  }, [uiActions]);

  const addToFavorites = useCallback((product: Product) => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const isAlreadyFavorite = favorites.some((fav: Product) => fav.id === product.id);
      
      if (isAlreadyFavorite) {
        const updatedFavorites = favorites.filter((fav: Product) => fav.id !== product.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        uiActions.addNotification({
          type: 'info',
          message: 'Produto removido dos favoritos'
        });
      } else {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        uiActions.addNotification({
          type: 'success',
          message: 'Produto adicionado aos favoritos!'
        });
      }
    } catch (error) {
      console.error('Error managing favorites:', error);
      uiActions.addNotification({
        type: 'error',
        message: 'Erro ao gerenciar favoritos'
      });
    }
  }, [uiActions]);

  const isProductFavorite = useCallback((productId: string | number): boolean => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      return favorites.some((fav: Product) => fav.id === productId);
    } catch (error) {
      console.error('Error checking favorites:', error);
      return false;
    }
  }, []);

  const getFavorites = useCallback((): Product[] => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }, []);

  const clearFavorites = useCallback(() => {
    try {
      localStorage.removeItem('favorites');
      uiActions.addNotification({
        type: 'info',
        message: 'Favoritos limpos'
      });
    } catch (error) {
      console.error('Error clearing favorites:', error);
      uiActions.addNotification({
        type: 'error',
        message: 'Erro ao limpar favoritos'
      });
    }
  }, [uiActions]);

  const requestQuote = useCallback((
    product: Product,
    options: {
      selectedColor?: string;
      selectedSize?: string;
      quantity: number;
      customMessage?: string;
    }
  ) => {
    const { selectedColor, selectedSize, quantity, customMessage } = options;
    
    let message = `Olá! Gostaria de solicitar um orçamento para:
    
Produto: ${product.name}`;
    
    if (selectedColor) {
      message += `\nCor: ${selectedColor}`;
    }
    
    if (selectedSize) {
      message += `\nTamanho: ${selectedSize}`;
    }
    
    message += `\nQuantidade: ${quantity}`;
    
    if (customMessage) {
      message += `\n\nObservações: ${customMessage}`;
    }
    
    const whatsappUrl = `https://wa.me/5581995970776?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    uiActions.addNotification({
      type: 'success',
      message: 'Redirecionando para WhatsApp...'
    });
  }, [uiActions]);

  return {
    generateWhatsAppLink,
    shareProduct,
    addToFavorites,
    isProductFavorite,
    getFavorites,
    clearFavorites,
    requestQuote
  };
};
