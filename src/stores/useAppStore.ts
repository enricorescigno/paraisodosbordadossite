
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { Product, ProductCategory } from '../types/product';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  selectedCategory: ProductCategory | null;
  searchQuery: string;
  filters: {
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    isNew?: boolean;
    isFeatured?: boolean;
  };
}

interface ImageState {
  imageCache: Map<string, string>;
  loadingImages: Set<string>;
  errorImages: Set<string>;
}

interface UIState {
  sidebar: {
    isOpen: boolean;
    activeTab: string | null;
  };
  modals: Record<string, boolean>;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
}

interface AppStore extends ProductState, ImageState, UIState {
  // Product actions
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCategory: (category: ProductCategory | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<ProductState['filters']>) => void;
  clearFilters: () => void;
  
  // Image actions
  setImageLoaded: (url: string, data: string) => void;
  setImageLoading: (url: string) => void;
  setImageError: (url: string) => void;
  clearImageCache: () => void;
  
  // UI actions
  setSidebar: (isOpen: boolean, activeTab?: string | null) => void;
  setModal: (key: string, value: boolean) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Computed values
  filteredProducts: () => Product[];
  isImageLoaded: (url: string) => boolean;
  isImageLoading: (url: string) => boolean;
  hasImageError: (url: string) => boolean;
}

export const useAppStore = create<AppStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,
      selectedCategory: null,
      searchQuery: '',
      filters: {},
      imageCache: new Map(),
      loadingImages: new Set(),
      errorImages: new Set(),
      sidebar: { isOpen: false, activeTab: null },
      modals: {},
      notifications: [],

      // Product actions
      setProducts: (products) => set({ products, error: null }),
      setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error, loading: false }),
      setCategory: (selectedCategory) => set({ selectedCategory }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilters: (newFilters) => 
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      clearFilters: () => 
        set({ filters: {}, selectedCategory: null, searchQuery: '' }),

      // Image actions
      setImageLoaded: (url, data) =>
        set((state) => {
          const newCache = new Map(state.imageCache);
          newCache.set(url, data);
          const newLoading = new Set(state.loadingImages);
          newLoading.delete(url);
          const newErrors = new Set(state.errorImages);
          newErrors.delete(url);
          return {
            imageCache: newCache,
            loadingImages: newLoading,
            errorImages: newErrors,
          };
        }),
      setImageLoading: (url) =>
        set((state) => {
          const newLoading = new Set(state.loadingImages);
          newLoading.add(url);
          return { loadingImages: newLoading };
        }),
      setImageError: (url) =>
        set((state) => {
          const newErrors = new Set(state.errorImages);
          newErrors.add(url);
          const newLoading = new Set(state.loadingImages);
          newLoading.delete(url);
          return {
            errorImages: newErrors,
            loadingImages: newLoading,
          };
        }),
      clearImageCache: () =>
        set({
          imageCache: new Map(),
          loadingImages: new Set(),
          errorImages: new Set(),
        }),

      // UI actions
      setSidebar: (isOpen, activeTab) =>
        set((state) => ({
          sidebar: {
            isOpen,
            activeTab: activeTab !== undefined ? activeTab : state.sidebar.activeTab,
          },
        })),
      setModal: (key, value) =>
        set((state) => ({
          modals: { ...state.modals, [key]: value },
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: Math.random().toString(36).substr(2, 9),
              timestamp: Date.now(),
            },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),

      // Computed values
      filteredProducts: () => {
        const { products, selectedCategory, searchQuery, filters } = get();
        let filtered = products;

        if (selectedCategory) {
          filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(query) ||
              p.description?.toLowerCase().includes(query)
          );
        }

        if (filters.isNew) {
          filtered = filtered.filter((p) => p.isNew);
        }

        if (filters.isFeatured) {
          filtered = filtered.filter((p) => p.isFeatured);
        }

        if (filters.colors?.length) {
          filtered = filtered.filter((p) =>
            filters.colors?.some((color) => p.colors?.includes(color))
          );
        }

        if (filters.sizes?.length) {
          filtered = filtered.filter((p) =>
            filters.sizes?.some((size) => p.sizes?.includes(size))
          );
        }

        return filtered;
      },

      isImageLoaded: (url) => get().imageCache.has(url),
      isImageLoading: (url) => get().loadingImages.has(url),
      hasImageError: (url) => get().errorImages.has(url),
    })),
    { name: 'app-store' }
  )
);

// Selectors for better performance
export const useProducts = () => useAppStore((state) => state.products);
export const useSelectedProduct = () => useAppStore((state) => state.selectedProduct);
export const useProductLoading = () => useAppStore((state) => state.loading);
export const useProductError = () => useAppStore((state) => state.error);
export const useFilteredProducts = () => useAppStore((state) => state.filteredProducts());
export const useImageCache = () => useAppStore((state) => ({
  isLoaded: state.isImageLoaded,
  isLoading: state.isImageLoading,
  hasError: state.hasImageError,
  setLoaded: state.setImageLoaded,
  setLoading: state.setImageLoading,
  setError: state.setImageError,
}));
