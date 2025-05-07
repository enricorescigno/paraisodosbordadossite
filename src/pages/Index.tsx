
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
import FallbackErrorComponent from "../components/common/FallbackErrorComponent";

const Index: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <ProductShowcase />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Features />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Partners />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Testimonials />
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Newsletter />
        </React.Suspense>
      </ErrorBoundary>
    </motion.div>
  );
};

export default Index;
