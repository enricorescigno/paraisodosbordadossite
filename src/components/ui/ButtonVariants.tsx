
import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton = ({ 
  children, 
  loading = false, 
  size = 'md', 
  className,
  disabled,
  ...props 
}: PrimaryButtonProps) => {
  return (
    <Button
      className={cn(
        "bg-[#C00] hover:bg-[#B00] text-white font-medium transition-colors",
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          'opacity-50 cursor-not-allowed': loading || disabled
        },
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
          Carregando...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export const SecondaryButton = ({ 
  children, 
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export const WhatsAppButton = ({ 
  children, 
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => {
  return (
    <Button
      className={cn(
        "bg-green-500 hover:bg-green-600 text-white font-medium transition-colors rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
