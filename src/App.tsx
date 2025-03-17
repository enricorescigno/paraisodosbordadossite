
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import OurPartners from './pages/OurPartners';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProductDetailPage from './components/ProductDetailPage';
import ProductPage from './components/ProductPage';
import AllProductsPage from './components/AllProductsPage';
import PortfolioPage from './components/PortfolioPage';
import AllPortfolioPage from './components/AllPortfolioPage';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BackToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/produto/:id" element={<ProductDetailPage />} />
        <Route path="/categoria/:categoryPath" element={<ProductPage />} />
        <Route path="/produtos" element={<AllProductsPage />} />
        <Route path="/portfolio" element={<AllPortfolioPage />} />
        <Route path="/portfolio/:categoryPath" element={<PortfolioPage />} />
        <Route path="/sobre" element={<AboutUs />} />
        <Route path="/nossos-parceiros" element={<OurPartners />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
