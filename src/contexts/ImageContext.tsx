
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ImageCache {
  [url: string]: {
    data: string | null;
    loading: boolean;
    error: boolean;
    timestamp: number;
  };
}

interface ImageState {
  cache: ImageCache;
  preloadQueue: string[];
  maxCacheSize: number;
}

type ImageAction =
  | { type: 'SET_IMAGE_LOADING'; payload: { url: string } }
  | { type: 'SET_IMAGE_LOADED'; payload: { url: string; data: string } }
  | { type: 'SET_IMAGE_ERROR'; payload: { url: string } }
  | { type: 'ADD_TO_PRELOAD_QUEUE'; payload: string[] }
  | { type: 'REMOVE_FROM_PRELOAD_QUEUE'; payload: string }
  | { type: 'CLEAR_CACHE' }
  | { type: 'CLEANUP_OLD_CACHE' };

const initialState: ImageState = {
  cache: {},
  preloadQueue: [],
  maxCacheSize: 100
};

function imageReducer(state: ImageState, action: ImageAction): ImageState {
  switch (action.type) {
    case 'SET_IMAGE_LOADING':
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.url]: {
            data: null,
            loading: true,
            error: false,
            timestamp: Date.now()
          }
        }
      };
    case 'SET_IMAGE_LOADED':
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.url]: {
            data: action.payload.data,
            loading: false,
            error: false,
            timestamp: Date.now()
          }
        }
      };
    case 'SET_IMAGE_ERROR':
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.url]: {
            data: null,
            loading: false,
            error: true,
            timestamp: Date.now()
          }
        }
      };
    case 'ADD_TO_PRELOAD_QUEUE':
      return {
        ...state,
        preloadQueue: [...new Set([...state.preloadQueue, ...action.payload])]
      };
    case 'REMOVE_FROM_PRELOAD_QUEUE':
      return {
        ...state,
        preloadQueue: state.preloadQueue.filter(url => url !== action.payload)
      };
    case 'CLEAR_CACHE':
      return {
        ...state,
        cache: {},
        preloadQueue: []
      };
    case 'CLEANUP_OLD_CACHE':
      const now = Date.now();
      const maxAge = 30 * 60 * 1000; // 30 minutes
      const cleanedCache = Object.fromEntries(
        Object.entries(state.cache).filter(
          ([, value]) => now - value.timestamp < maxAge
        )
      );
      return {
        ...state,
        cache: cleanedCache
      };
    default:
      return state;
  }
}

interface ImageContextType {
  state: ImageState;
  dispatch: React.Dispatch<ImageAction>;
  actions: {
    setImageLoading: (url: string) => void;
    setImageLoaded: (url: string, data: string) => void;
    setImageError: (url: string) => void;
    addToPreloadQueue: (urls: string[]) => void;
    removeFromPreloadQueue: (url: string) => void;
    clearCache: () => void;
    cleanupOldCache: () => void;
  };
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, initialState);

  const actions = {
    setImageLoading: (url: string) => 
      dispatch({ type: 'SET_IMAGE_LOADING', payload: { url } }),
    setImageLoaded: (url: string, data: string) => 
      dispatch({ type: 'SET_IMAGE_LOADED', payload: { url, data } }),
    setImageError: (url: string) => 
      dispatch({ type: 'SET_IMAGE_ERROR', payload: { url } }),
    addToPreloadQueue: (urls: string[]) => 
      dispatch({ type: 'ADD_TO_PRELOAD_QUEUE', payload: urls }),
    removeFromPreloadQueue: (url: string) => 
      dispatch({ type: 'REMOVE_FROM_PRELOAD_QUEUE', payload: url }),
    clearCache: () => 
      dispatch({ type: 'CLEAR_CACHE' }),
    cleanupOldCache: () => 
      dispatch({ type: 'CLEANUP_OLD_CACHE' }),
  };

  return (
    <ImageContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
