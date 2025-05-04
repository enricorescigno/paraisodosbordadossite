import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/useMobile';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isSidebarOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ className, isSidebarOpen, onClose, ...props }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobile, isSidebarOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 z-50 h-full w-80 bg-secondary p-4 shadow-xl transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "left-0" : "-left-full",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-4">
        <Link to="/" className="text-lg font-semibold">
          Menu
        </Link>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)] space-y-1">
        <div className="space-y-4 py-4">
          <Link to="/" className="block rounded-md p-2 hover:bg-accent">
            Home
          </Link>
          <Link
            to="/products"
            className="block rounded-md p-2 hover:bg-accent"
          >
            Products
          </Link>
          <Link
            to="/portfolio"
            className="block rounded-md p-2 hover:bg-accent"
          >
            Portfolio
          </Link>
          <Link to="/about" className="block rounded-md p-2 hover:bg-accent">
            About
          </Link>
          <Link
            to="/contact"
            className="block rounded-md p-2 hover:bg-accent"
          >
            Contact
          </Link>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
