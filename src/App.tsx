
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
