
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface UIState {
  loading: {
    products: boolean;
    images: boolean;
    global: boolean;
  };
  errors: {
    products: string | null;
    images: string | null;
    global: string | null;
  };
  modals: {
    imageGallery: boolean;
    productFilters: boolean;
  };
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
}

type UIAction =
  | { type: 'SET_LOADING'; payload: { key: keyof UIState['loading']; value: boolean } }
  | { type: 'SET_ERROR'; payload: { key: keyof UIState['errors']; value: string | null } }
  | { type: 'TOGGLE_MODAL'; payload: { key: keyof UIState['modals']; value?: boolean } }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<UIState['notifications'][0], 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

const initialState: UIState = {
  loading: {
    products: false,
    images: false,
    global: false,
  },
  errors: {
    products: null,
    images: null,
    global: null,
  },
  modals: {
    imageGallery: false,
    productFilters: false,
  },
  notifications: [],
};

const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.payload.key]: action.payload.value },
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.key]: action.payload.value ?? !state.modals[action.payload.key],
        },
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
          },
        ],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    default:
      return state;
  }
};

const UIContext = createContext<{
  state: UIState;
  dispatch: React.Dispatch<UIAction>;
} | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};
