
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ProductPage from "./components/ProductPage";
import PortfolioPage from "./components/PortfolioPage";
import ProductDetailPage from "./components/ProductDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/produtos" element={<ProductPage />} />
          
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
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/bordado-bone" element={<PortfolioPage />} />
          <Route path="/portfolio/bordado-necessaire" element={<PortfolioPage />} />
          <Route path="/portfolio/bordado-bolsa" element={<PortfolioPage />} />
          <Route path="/portfolio/bordado-jaleco" element={<PortfolioPage />} />
          <Route path="/portfolio/bordado-infantis" element={<PortfolioPage />} />
          <Route path="/portfolio/bordado-toalha-banho" element={<PortfolioPage />} />
          
          {/* Product Detail Page - works for both regular products and portfolio items */}
          <Route path="/produto/:productId" element={<ProductDetailPage />} />
          
          <Route path="/sobre" element={<AboutUs />} />
          <Route path="/login" element={<Index />} />
          <Route path="/carrinho" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
