
import * as React from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import Hero from "../components/Hero";
import ProductShowcase from "../components/ProductShowcase";
import Features from "../components/Features";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import LoadingSpinner from "../components/common/LoadingSpinner";

// Fallback component for error boundaries
const ErrorFallback = () => {
  return (
    <div className="text-center py-10 px-4">
      <h2 className="text-xl font-semibold mb-2">Oops, algo deu errado!</h2>
      <p>Estamos trabalhando para resolver o problema.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Tentar novamente
      </button>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <ProductShowcase />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Features />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Partners />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Testimonials />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Newsletter />
        </React.Suspense>
      </ErrorBoundary>
    </motion.div>
  );
};

export default Index;
