
import { motion } from "framer-motion";
import HeroOptimized from "../components/HeroOptimized";
import ProductShowcase from "../components/ProductShowcase";
import Features from "../components/Features";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import WhatsAppSupport from "../components/WhatsAppSupport";

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
    </motion.div>
  );
};

export default IndexOptimized;
