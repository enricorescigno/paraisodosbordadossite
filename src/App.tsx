
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from '@/layouts/Layout';
import Index from '@/pages/Index';
import ProductPage from '@/components/ProductPage';
import ProductDetailPage from '@/components/ProductDetailPage';
import AboutUs from '@/pages/AboutUs';
import OurPartners from '@/pages/OurPartners';
import NotFound from '@/pages/NotFound';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import AllProductsPage from '@/components/AllProductsPage';
import AllPortfolioPage from '@/components/AllPortfolioPage';
import PortfolioPage from '@/components/PortfolioPage';
import EstoquePage from '@/pages/EstoquePage';
import VendasPage from '@/pages/VendasPage';
import PedidosCompraStatusPage from '@/pages/PedidosCompraStatusPage';
import PedidosCompraProdutosPage from '@/pages/PedidosCompraProdutosPage';
import PedidosCompraDistribuicaoPage from '@/pages/PedidosCompraDistribuicaoPage';
import TributacoesPage from '@/pages/TributacoesPage';
import PrazosPagamentoPage from '@/pages/PrazosPagamentoPage';

import './App.css';

// Fallback component for error boundaries
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">Erro ao carregar a aplicação</h2>
        <p className="mb-4 text-gray-600">Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
        <p className="text-sm text-gray-500 mb-4">{error?.message || 'Erro desconhecido'}</p>
        <button
          onClick={() => {
            if (typeof resetErrorBoundary === 'function') {
              resetErrorBoundary();
            } else {
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Recarregar página
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="produtos" element={<AllProductsPage />} />
              <Route path="produto/:productId" element={<ProductDetailPage />} />
              <Route path="categoria/:category" element={<ProductPage />} />
              <Route path="portfolio" element={<AllPortfolioPage />} />
              <Route path="portfolio/:category" element={<PortfolioPage />} />
              <Route path="sobre-nos" element={<AboutUs />} />
              <Route path="nossos-parceiros" element={<OurPartners />} />
              <Route path="politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="estoque" element={<EstoquePage />} />
              <Route path="vendas" element={<VendasPage />} />
              <Route path="pedidos-compra-status" element={<PedidosCompraStatusPage />} />
              <Route path="pedidos-compra-produtos" element={<PedidosCompraProdutosPage />} />
              <Route path="pedidos-compra-distribuicao" element={<PedidosCompraDistribuicaoPage />} />
              <Route path="tributacoes" element={<TributacoesPage />} />
              <Route path="prazos-pagamento" element={<PrazosPagamentoPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
        </TooltipProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
