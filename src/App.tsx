import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ProductPage from "./components/ProductPage";
import PortfolioPage from "./components/PortfolioPage";
import ProductDetailPage from "./components/ProductDetailPage";
import OurPartners from "./pages/OurPartners";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AllProductsPage from "./components/AllProductsPage";
import AllPortfolioPage from "./components/AllPortfolioPage";
import ScrollToTop from "./components/ScrollToTop";
import EstoquePage from "./pages/EstoquePage";
import TributacoesPage from "./pages/TributacoesPage";
import VendasPage from "./pages/VendasPage";

import "./styles/typography.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/produtos" element={<AllProductsPage />} />

              {/* Main Categories */}
              <Route path="/categoria/cama-mesa-banho" element={<ProductPage />} />
              <Route path="/categoria/infantil" element={<ProductPage />} />
              <Route path="/categoria/vestuario" element={<ProductPage />} />

              {/* Cama, Mesa e Banho Subcategories */}
              <Route path="/categoria/cama" element={<ProductPage />} />
              <Route path="/categoria/mesa-cozinha" element={<ProductPage />} />
              <Route path="/categoria/tapete-cortinas" element={<ProductPage />} />
              <Route path="/categoria/banho" element={<ProductPage />} />

              {/* Vestuário Subcategories */}
              <Route path="/categoria/camisa" element={<ProductPage />} />
              <Route path="/categoria/jaleco" element={<ProductPage />} />
              <Route path="/categoria/pantufa" element={<ProductPage />} />

              {/* Portfolio Pages */}
              <Route path="/portfolio" element={<AllPortfolioPage />} />
              <Route path="/portfolio/bordado-bone" element={<PortfolioPage />} />
              <Route path="/portfolio/bordado-necessaire" element={<PortfolioPage />} />
              <Route path="/portfolio/bordado-bolsa" element={<PortfolioPage />} />
              <Route path="/portfolio/bordado-jaleco" element={<PortfolioPage />} />
              <Route path="/portfolio/bordado-infantis" element={<PortfolioPage />} />
              <Route path="/portfolio/bordado-toalha-banho" element={<PortfolioPage />} />

              {/* Product Detail Page */}
              <Route path="/produto/:productId" element={<ProductDetailPage />} />

              {/* Institutional Pages */}
              <Route path="/sobre" element={<AboutUs />} />
              <Route path="/nossos-parceiros" element={<OurPartners />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />

              {/* ERP Integration Routes */}
              <Route path="/estoque" element={<EstoquePage />} />
              <Route path="/tributacoes" element={<TributacoesPage />} />
              <Route path="/vendas" element={<VendasPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
