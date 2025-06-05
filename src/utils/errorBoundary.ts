
import React, { Component, ReactNode } from 'react';
import { logger } from './logger';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('React Error Boundary caught an error', error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true
    });

    this.props.onError?.(error, errorInfo);

    // Send to error tracking service in production
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      this.reportError(error, errorInfo);
    }
  }

  private reportError(error: Error, errorInfo: React.ErrorInfo) {
    // In a real app, send to error tracking service like Sentry
    console.error('Error reported to tracking service:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return React.createElement('div', {
        className: 'min-h-screen flex items-center justify-center bg-gray-50'
      }, 
        React.createElement('div', {
          className: 'text-center p-8'
        },
          React.createElement('h1', {
            className: 'text-2xl font-bold text-gray-900 mb-4'
          }, 'Algo deu errado'),
          React.createElement('p', {
            className: 'text-gray-600 mb-6'
          }, 'Ocorreu um erro inesperado. Nossa equipe foi notificada.'),
          React.createElement('button', {
            className: 'bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600',
            onClick: () => window.location.reload()
          }, 'Recarregar Página')
        )
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundaries
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => {
    return React.createElement(ErrorBoundary, { fallback, children: React.createElement(Component, props) });
  };

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Hook for error handling in functional components
export const useErrorHandler = () => {
  const handleError = React.useCallback((error: Error, context?: Record<string, any>) => {
    logger.error('Handled error in component', error, context);
    
    // In development, re-throw to trigger error boundary
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      throw error;
    }
  }, []);

  return handleError;
};
