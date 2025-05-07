
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import './index.css'

// Global fallback UI for any uncaught errors
const FallbackComponent = ({ error }: { error: Error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">Erro ao carregar a aplicação</h2>
        <p className="mb-4 text-gray-600">Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
        <p className="text-sm text-gray-500 mb-4">{error.message || 'Erro desconhecido'}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Recarregar página
        </button>
      </div>
    </div>
  )
}

// Create a client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
      meta: {
        onError: (error: any) => {
          console.error('Query error:', error);
        },
      },
    },
  },
});

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a div with id 'root' in your HTML.");
}

// Add error handling for UI rendering
try {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
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
