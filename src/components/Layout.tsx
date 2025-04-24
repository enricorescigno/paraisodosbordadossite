
import { ReactNode } from 'react';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Global layout component that ensures consistency across all pages
 * Includes the Navbar that should appear only once across the entire app
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Layout;
