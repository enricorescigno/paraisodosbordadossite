
import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Algo deu errado
          </h2>
          <p className="text-gray-600 mb-4">
            Ocorreu um erro inesperado. Tente recarregar a página.
          </p>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Recarregar Página
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ImageErrorFallback = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-4">
    <AlertTriangle className="h-8 w-8 text-gray-400 mb-2" />
    <p className="text-sm text-gray-600 text-center mb-3">
      Erro ao carregar imagem
    </p>
    {onRetry && (
      <Button size="sm" variant="outline" onClick={onRetry}>
        Tentar novamente
      </Button>
    )}
  </div>
);
