
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./components/QueryProvider";
import { ProductProvider } from "./contexts/ProductContext";
import { ImageProvider } from "./contexts/ImageContext";
import { UIProvider } from "./contexts/UIContext";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";
import { ErrorBoundary } from "./utils/errorBoundary";
import { logger } from "./utils/logger";
import { performanceMonitor } from "./utils/performanceMonitor";
import { createLazyComponent } from "./utils/lazyLoader";

// Enhanced lazy loading with error boundaries and performance tracking
const Index = createLazyComponent(() => import("./pages/Index"), { preload: true });
const AboutUs = createLazyComponent(() => import("./pages/AboutUs"));
const OurPartners = createLazyComponent(() => import("./pages/OurPartners"));
const PrivacyPolicy = createLazyComponent(() => import("./pages/PrivacyPolicy"));
const NotFound = createLazyComponent(() => import("./pages/NotFound"));
const ProductDetailPage = createLazyComponent(() => import("./components/ProductDetailPage"));
const ProductPage = createLazyComponent(() => import("./components/ProductPage"));
const AllProductsPage = createLazyComponent(() => import("./components/AllProductsPage"));
const PortfolioPage = createLazyComponent(() => import("./components/PortfolioPage"));
const AllPortfolioPage = createLazyComponent(() => import("./components/AllPortfolioPage"));

// Business pages with smart preloading
const EstoquePage = createLazyComponent(() => import("./pages/EstoquePage"));
const VendasPage = createLazyComponent(() => import("./pages/VendasPage"));
const PedidosCompraProdutosPage = createLazyComponent(() => import("./pages/PedidosCompraProdutosPage"));
const PedidosCompraDistribuicaoPage = createLazyComponent(() => import("./pages/PedidosCompraDistribuicaoPage"));
const PedidosCompraStatusPage = createLazyComponent(() => import("./pages/PedidosCompraStatusPage"));
const PrazosPagamentoPage = createLazyComponent(() => import("./pages/PrazosPagamentoPage"));
const TributacoesPage = createLazyComponent(() => import("./pages/TributacoesPage"));

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    const stopTiming = performanceMonitor.startTiming('app.initialization');
    
    // Service Worker registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            logger.info('Service Worker registrado com sucesso', { scope: registration.scope });
          })
          .catch((error) => {
            logger.error('Falha ao registrar Service Worker', error);
          });
      });
    }

    // Global error handling
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logger.error('Unhandled promise rejection', new Error(event.reason), {
        type: 'unhandledRejection'
      });
    };

    const handleError = (event: ErrorEvent) => {
      logger.error('Global error', new Error(event.message), {
        type: 'globalError',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    stopTiming();

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryProvider>
        <UIProvider>
          <ImageProvider>
            <ProductProvider>
              <Router>
                <ScrollToTop />
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/sobre" element={<AboutUs />} />
                      <Route path="/parceiros" element={<OurPartners />} />
                      <Route path="/privacidade" element={<PrivacyPolicy />} />
                      <Route path="/produtos" element={<AllProductsPage />} />
                      <Route path="/produto/:productId" element={<ProductDetailPage />} />
                      <Route path="/categoria/:category" element={<ProductPage />} />
                      <Route path="/portfolio" element={<AllPortfolioPage />} />
                      <Route path="/portfolio/:category" element={<PortfolioPage />} />
                      
                      {/* Business management routes */}
                      <Route path="/estoque" element={<EstoquePage />} />
                      <Route path="/vendas" element={<VendasPage />} />
                      <Route path="/pedidos-compra-produtos" element={<PedidosCompraProdutosPage />} />
                      <Route path="/pedidos-compra-distribuicao" element={<PedidosCompraDistribuicaoPage />} />
                      <Route path="/pedidos-compra-status" element={<PedidosCompraStatusPage />} />
                      <Route path="/prazos-pagamento" element={<PrazosPagamentoPage />} />
                      <Route path="/tributacoes" element={<TributacoesPage />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Layout>
                <Toaster />
              </Router>
            </ProductProvider>
          </ImageProvider>
        </UIProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
