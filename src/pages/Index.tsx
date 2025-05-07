
import * as React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ProductShowcase from "../components/ProductShowcase";
import Features from "../components/Features";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Index: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <ProductShowcase />
      <Features />
      <Partners />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
};

export default Index;
