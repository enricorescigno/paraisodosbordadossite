
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ImageCache {
  [key: string]: {
    url: string;
    loaded: boolean;
    error: boolean;
    timestamp: number;
  };
}

interface ImageState {
  cache: ImageCache;
  preloadQueue: string[];
  loading: Set<string>;
}

type ImageAction =
  | { type: 'CACHE_IMAGE'; payload: { key: string; url: string } }
  | { type: 'IMAGE_LOADED'; payload: string }
  | { type: 'IMAGE_ERROR'; payload: string }
  | { type: 'ADD_TO_PRELOAD'; payload: string[] }
  | { type: 'START_LOADING'; payload: string }
  | { type: 'STOP_LOADING'; payload: string }
  | { type: 'CLEAR_CACHE' };

const initialState: ImageState = {
  cache: {},
  preloadQueue: [],
  loading: new Set(),
};

const imageReducer = (state: ImageState, action: ImageAction): ImageState => {
  switch (action.type) {
    case 'CACHE_IMAGE':
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.key]: {
            url: action.payload.url,
            loaded: false,
            error: false,
            timestamp: Date.now(),
          },
        },
      };
    case 'IMAGE_LOADED':
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload]: {
            ...state.cache[action.payload],
            loaded: true,
          },
        },
        loading: new Set([...state.loading].filter(key => key !== action.payload)),
      };
    case 'IMAGE_ERROR':
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload]: {
            ...state.cache[action.payload],
            error: true,
          },
        },
        loading: new Set([...state.loading].filter(key => key !== action.payload)),
      };
    case 'ADD_TO_PRELOAD':
      return {
        ...state,
        preloadQueue: [...new Set([...state.preloadQueue, ...action.payload])],
      };
    case 'START_LOADING':
      return {
        ...state,
        loading: new Set([...state.loading, action.payload]),
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: new Set([...state.loading].filter(key => key !== action.payload)),
      };
    case 'CLEAR_CACHE':
      return initialState;
    default:
      return state;
  }
};

const ImageContext = createContext<{
  state: ImageState;
  dispatch: React.Dispatch<ImageAction>;
} | null>(null);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(imageReducer, initialState);

  return (
    <ImageContext.Provider value={{ state, dispatch }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
