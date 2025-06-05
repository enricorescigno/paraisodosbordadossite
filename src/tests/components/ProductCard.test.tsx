
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/product/ProductCard';
import { Product } from '../../types/product';

// Mock do React Router
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  type: 'product',
  category: 'Vestuário',
  description: 'Test description',
  price: 'R$ 100,00',
  imageUrl: '/test-image.jpg',
  images: ['/test-image.jpg'],
  videos: [],
  isCustomizable: false,
  slug: 'test-product',
  keywords: ['test'],
  tags: ['test'],
  rating: 4.5,
  isNew: false,
  isFeatured: false,
  dimensions: {},
  features: [],
  variants: {
    colors: ['azul', 'vermelho'],
    sizes: ['P', 'M', 'G']
  },
  stock: {
    quantity: 10,
    minPurchaseQuantity: 1,
    isAvailable: true
  }
};

describe('ProductCard', () => {
  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
  });

  it('should render "Novo" badge for new products', () => {
    const newProduct = { ...mockProduct, isNew: true };
    render(<ProductCard product={newProduct} />);
    
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  it('should render "Personalizado" badge for customizable products', () => {
    const customProduct = { ...mockProduct, isCustomizable: true };
    render(<ProductCard product={customProduct} />);
    
    expect(screen.getByText('Personalizado')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const mockNavigate = vi.fn();
    vi.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate);
    
    render(<ProductCard product={mockProduct} />);
    
    const card = screen.getByRole('article');
    fireEvent.click(card);
    
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should render color variants when available', () => {
    render(<ProductCard product={mockProduct} showVariants />);
    
    expect(screen.getByText('azul')).toBeInTheDocument();
  });
});
