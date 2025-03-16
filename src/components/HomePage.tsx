
import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import ProductShowcase from './ProductShowcase';
import Partners from './Partners';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <ProductShowcase />
      <Partners />
      <Testimonials />
      <Newsletter />
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default HomePage;
