
import React, { Suspense, memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface LazyRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Carregando...</p>
    </div>
  </div>
);

const DefaultErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200 max-w-md">
      <h2 className="text-lg font-semibold text-red-700 mb-2">Erro ao carregar</h2>
      <p className="text-red-600 mb-4 text-sm">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  </div>
);

const LazyRoute = memo<LazyRouteProps>(({
  children,
  fallback = <DefaultFallback />,
  errorFallback = DefaultErrorFallback,
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={errorFallback}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
});

LazyRoute.displayName = 'LazyRoute';

export default LazyRoute;
