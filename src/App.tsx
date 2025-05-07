
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
import FallbackErrorComponent from '@/components/common/FallbackErrorComponent';

import './App.css';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
      <Router>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <Index />
                </ErrorBoundary>
              } />
              <Route path="produtos" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <AllProductsPage />
                </ErrorBoundary>
              } />
              <Route path="produto/:productId" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <ProductDetailPage />
                </ErrorBoundary>
              } />
              <Route path="categoria/:category" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <ProductPage />
                </ErrorBoundary>
              } />
              <Route path="portfolio" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <AllPortfolioPage />
                </ErrorBoundary>
              } />
              <Route path="portfolio/:category" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <PortfolioPage />
                </ErrorBoundary>
              } />
              <Route path="sobre-nos" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <AboutUs />
                </ErrorBoundary>
              } />
              <Route path="nossos-parceiros" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <OurPartners />
                </ErrorBoundary>
              } />
              <Route path="politica-de-privacidade" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <PrivacyPolicy />
                </ErrorBoundary>
              } />
              <Route path="estoque" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <EstoquePage />
                </ErrorBoundary>
              } />
              <Route path="vendas" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <VendasPage />
                </ErrorBoundary>
              } />
              <Route path="pedidos-compra-status" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <PedidosCompraStatusPage />
                </ErrorBoundary>
              } />
              <Route path="pedidos-compra-produtos" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <PedidosCompraProdutosPage />
                </ErrorBoundary>
              } />
              <Route path="pedidos-compra-distribuicao" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <PedidosCompraDistribuicaoPage />
                </ErrorBoundary>
              } />
              <Route path="tributacoes" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <TributacoesPage />
                </ErrorBoundary>
              } />
              <Route path="prazos-pagamento" element={
                <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                  <PrazosPagamentoPage />
                </ErrorBoundary>
              } />
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
