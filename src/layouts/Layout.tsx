
import React from 'react';
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppSupport from '@/components/WhatsAppSupport';

const Layout = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Outlet />
        </main>
        
        <Footer />
        <ScrollToTop />
        <WhatsAppSupport />
        <Toaster />
      </div>
    </TooltipProvider>
  );
};

export default Layout;
