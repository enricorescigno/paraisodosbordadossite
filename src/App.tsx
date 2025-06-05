
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ProductProvider } from "./contexts/ProductContext";
import { ImageProvider } from "./contexts/ImageContext";
import { UIProvider } from "./contexts/UIContext";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const OurPartners = lazy(() => import("./pages/OurPartners"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductDetailPage = lazy(() => import("./components/ProductDetailPage"));
const ProductPage = lazy(() => import("./components/ProductPage"));
const AllProductsPage = lazy(() => import("./components/AllProductsPage"));
const PortfolioPage = lazy(() => import("./components/PortfolioPage"));
const AllPortfolioPage = lazy(() => import("./components/AllPortfolioPage"));

// Business pages
const EstoquePage = lazy(() => import("./pages/EstoquePage"));
const VendasPage = lazy(() => import("./pages/VendasPage"));
const PedidosCompraProdutosPage = lazy(() => import("./pages/PedidosCompraProdutosPage"));
const PedidosCompraDistribuicaoPage = lazy(() => import("./pages/PedidosCompraDistribuicaoPage"));
const PedidosCompraStatusPage = lazy(() => import("./pages/PedidosCompraStatusPage"));
const PrazosPagamentoPage = lazy(() => import("./pages/PrazosPagamentoPage"));
const TributacoesPage = lazy(() => import("./pages/TributacoesPage"));

function App() {
  useEffect(() => {
    // Service Worker registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.info('Service Worker registrado com sucesso:', registration.scope);
          })
          .catch((error) => {
            console.error('Falha ao registrar Service Worker:', error);
          });
      });
    }
  }, []);

  return (
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
  );
}

export default App;
