
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, ProductCategory } from '../types/product';

interface ProductState {
  products: Product[];
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

type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CATEGORY'; payload: ProductCategory | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<ProductState['filters']> }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: string | number };

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedCategory: null,
  searchQuery: '',
  filters: {}
};

function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'CLEAR_FILTERS':
      return { ...state, filters: {}, selectedCategory: null, searchQuery: '' };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    default:
      return state;
  }
}

interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  actions: {
    setProducts: (products: Product[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategory: (category: ProductCategory | null) => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: Partial<ProductState['filters']>) => void;
    clearFilters: () => void;
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    removeProduct: (id: string | number) => void;
  };
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const actions = {
    setProducts: (products: Product[]) => 
      dispatch({ type: 'SET_PRODUCTS', payload: products }),
    setLoading: (loading: boolean) => 
      dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) => 
      dispatch({ type: 'SET_ERROR', payload: error }),
    setCategory: (category: ProductCategory | null) => 
      dispatch({ type: 'SET_CATEGORY', payload: category }),
    setSearchQuery: (query: string) => 
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    setFilters: (filters: Partial<ProductState['filters']>) => 
      dispatch({ type: 'SET_FILTERS', payload: filters }),
    clearFilters: () => 
      dispatch({ type: 'CLEAR_FILTERS' }),
    addProduct: (product: Product) => 
      dispatch({ type: 'ADD_PRODUCT', payload: product }),
    updateProduct: (product: Product) => 
      dispatch({ type: 'UPDATE_PRODUCT', payload: product }),
    removeProduct: (id: string | number) => 
      dispatch({ type: 'REMOVE_PRODUCT', payload: id }),
  };

  return (
    <ProductContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
