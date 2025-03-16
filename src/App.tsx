
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import ProductDetailPage from './components/ProductDetailPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AllProductsPage from './components/AllProductsPage';
import PortfolioPage from './components/PortfolioPage';
import AllPortfolioPage from './components/AllPortfolioPage';
import ScrollToTop from './components/ScrollToTop';
import './App.css';
import { initializeDatabase } from './services/localDatabaseService';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize the database on app start
    initializeDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/produtos" element={<AllProductsPage />} />
          <Route path="/categoria/:categorySlug" element={<ProductPage />} />
          <Route path="/produto/:productId" element={<ProductDetailPage />} />
          <Route path="/portfolio" element={<AllPortfolioPage />} />
          <Route path="/portfolio/:categorySlug" element={<PortfolioPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
