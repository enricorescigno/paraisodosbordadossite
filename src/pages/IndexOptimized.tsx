
import { motion } from "framer-motion";
import HeroOptimized from "../components/HeroOptimized";
import ProductShowcase from "../components/ProductShowcase";
import Features from "../components/Features";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import WhatsAppSupport from "../components/WhatsAppSupport";
import { PerformanceDashboard } from "@/components/ui/PerformanceDashboard";

const IndexOptimized = () => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroOptimized />
      <ProductShowcase />
      <Features />
      <Partners />
      <Testimonials />
      <Newsletter />
      <Footer />
      <WhatsAppSupport />
      
      {/* Performance Dashboard - Compact mode for production */}
      <PerformanceDashboard 
        enabled={process.env.NODE_ENV === 'development'} 
        compact={true} 
      />
    </motion.div>
  );
};

export default IndexOptimized;
