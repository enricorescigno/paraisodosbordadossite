
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface UIState {
  loading: {
    global: boolean;
    products: boolean;
    images: boolean;
    [key: string]: boolean;
  };
  errors: {
    global: string | null;
    products: string | null;
    images: string | null;
    [key: string]: string | null;
  };
  modals: {
    [key: string]: boolean;
  };
  sidebar: {
    isOpen: boolean;
    activeTab: string | null;
  };
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
}

type UIAction =
  | { type: 'SET_LOADING'; payload: { key: string; value: boolean } }
  | { type: 'SET_ERROR'; payload: { key: string; value: string | null } }
  | { type: 'SET_MODAL'; payload: { key: string; value: boolean } }
  | { type: 'SET_SIDEBAR'; payload: { isOpen: boolean; activeTab?: string | null } }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<UIState['notifications'][0], 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'RESET_UI' };

const initialState: UIState = {
  loading: {
    global: false,
    products: false,
    images: false,
  },
  errors: {
    global: null,
    products: null,
    images: null,
  },
  modals: {},
  sidebar: {
    isOpen: false,
    activeTab: null,
  },
  notifications: [],
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'SET_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'SET_SIDEBAR':
      return {
        ...state,
        sidebar: {
          isOpen: action.payload.isOpen,
          activeTab: action.payload.activeTab !== undefined ? action.payload.activeTab : state.sidebar.activeTab,
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
      return {
        ...state,
        notifications: [],
      };
    case 'RESET_UI':
      return initialState;
    default:
      return state;
  }
}

interface UIContextType {
  state: UIState;
  dispatch: React.Dispatch<UIAction>;
  actions: {
    setLoading: (key: string, value: boolean) => void;
    setError: (key: string, value: string | null) => void;
    setModal: (key: string, value: boolean) => void;
    setSidebar: (isOpen: boolean, activeTab?: string | null) => void;
    addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
    resetUI: () => void;
  };
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const actions = {
    setLoading: (key: string, value: boolean) =>
      dispatch({ type: 'SET_LOADING', payload: { key, value } }),
    setError: (key: string, value: string | null) =>
      dispatch({ type: 'SET_ERROR', payload: { key, value } }),
    setModal: (key: string, value: boolean) =>
      dispatch({ type: 'SET_MODAL', payload: { key, value } }),
    setSidebar: (isOpen: boolean, activeTab?: string | null) =>
      dispatch({ type: 'SET_SIDEBAR', payload: { isOpen, activeTab } }),
    addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) =>
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    removeNotification: (id: string) =>
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
    clearNotifications: () =>
      dispatch({ type: 'CLEAR_NOTIFICATIONS' }),
    resetUI: () =>
      dispatch({ type: 'RESET_UI' }),
  };

  return (
    <UIContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};
