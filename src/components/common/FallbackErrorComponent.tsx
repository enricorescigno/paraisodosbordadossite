
import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const FallbackErrorComponent: React.FC<FallbackProps> = ({ 
  error, 
  resetErrorBoundary 
}) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">Erro ao carregar o conteúdo</h2>
        <p className="mb-4 text-gray-600">Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
        <p className="text-sm text-gray-500 mb-4">{error?.message || 'Erro desconhecido'}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
};

export default FallbackErrorComponent;
