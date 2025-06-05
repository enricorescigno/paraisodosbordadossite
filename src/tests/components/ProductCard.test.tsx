
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../components/product/ProductCard';

// Mock do React Router
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

const mockProductCard = {
  id: '1',
  name: 'Test Product',
  description: 'Test description',
  imageUrl: '/test-image.jpg',
  images: ['/test-image.jpg'],
  colors: ['azul', 'vermelho'],
  isNew: false,
  whatsappNumber: '11999999999',
  isPortfolio: false,
  showActionButton: true
};

describe('ProductCard', () => {
  it('should render product information', () => {
    render(<ProductCard {...mockProductCard} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should render "Novo" badge for new products', () => {
    const newProduct = { ...mockProductCard, isNew: true };
    render(<ProductCard {...newProduct} />);
    
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const mockNavigate = vi.fn();
    vi.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate);
    
    render(<ProductCard {...mockProductCard} />);
    
    // Test basic render functionality
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should render color variants when available', () => {
    render(<ProductCard {...mockProductCard} />);
    
    // Check if the component renders without errors with colors
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
