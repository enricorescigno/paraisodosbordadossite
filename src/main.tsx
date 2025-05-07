
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import './index.css'
import FallbackErrorComponent from './components/common/FallbackErrorComponent.tsx'

// Create a client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
      meta: {
        onSettled: (data: any, error: any) => {
          if (error) {
            console.error('Query error:', error);
          }
        },
      },
    },
  },
});

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  // Safely handle missing root element
  console.error("Root element not found. Make sure there is a div with id 'root' in your HTML.");
  
  // Create fallback element
  const fallbackElement = document.createElement('div');
  fallbackElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
      <h2>Erro ao carregar a aplicação</h2>
      <p>Não foi possível encontrar o elemento raiz para renderizar a aplicação.</p>
      <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0066ff; color: white; border: none; border-radius: 4px; margin-top: 20px;">
        Recarregar página
      </button>
    </div>
  `;
  document.body.appendChild(fallbackElement);
} else {
  // Add error handling for UI rendering
  try {
    const root = createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <ErrorBoundary 
          FallbackComponent={FallbackErrorComponent}
          onError={(error, info) => {
            console.error("React Error Boundary caught an error:", error);
            console.error("Component Stack:", info.componentStack);
          }}
        >
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to render application:", error);
    
    // Fallback rendering if main app fails
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
          <h2>Algo deu errado</h2>
          <p>Estamos tendo problemas para carregar a aplicação. Por favor, tente novamente mais tarde.</p>
          <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0066ff; color: white; border: none; border-radius: 4px; margin-top: 20px;">
            Recarregar página
          </button>
        </div>
      `;
    }
  }
}
