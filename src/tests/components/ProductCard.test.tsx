
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'Test description',
  imageUrl: '/test-image.jpg',
  whatsappNumber: '5511999999999'
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProductCard', () => {
  it('should render product information', () => {
    renderWithRouter(
      <ProductCard {...mockProduct} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('should render action button by default', () => {
    renderWithRouter(
      <ProductCard {...mockProduct} />
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should not render action button when showActionButton is false', () => {
    renderWithRouter(
      <ProductCard {...mockProduct} showActionButton={false} />
    );

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('should handle portfolio products differently', () => {
    renderWithRouter(
      <ProductCard {...mockProduct} isPortfolio={true} />
    );

    // Portfolio products should still render but may have different behavior
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
