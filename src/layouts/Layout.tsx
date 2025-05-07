
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppSupport from '@/components/WhatsAppSupport';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      <ScrollToTop />
      <WhatsAppSupport />
    </div>
  );
};

export default Layout;
