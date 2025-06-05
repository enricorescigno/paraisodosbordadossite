
import { describe, it, expect, beforeEach } from 'vitest';
import { Product } from '../../types/product';
import { searchProducts, getCategoryFromSearch } from '../../utils/searchUtils';

describe('Product Utils', () => {
  let mockProducts: Product[];

  beforeEach(() => {
    mockProducts = [
      {
        id: '1',
        name: 'Camisa Polo Bordada',
        type: 'product',
        category: 'Vestuário',
        price: 'R$ 45,00',
        description: 'Camisa polo de alta qualidade com bordado personalizado',
        tags: ['polo', 'bordado', 'personalizado'],
        keywords: ['camisa', 'uniforme']
      },
      {
        id: '2',
        name: 'Toalha de Banho Bordada',
        type: 'product',
        category: 'Banho',
        price: 'R$ 35,00',
        description: 'Toalha felpuda com bordado',
        tags: ['toalha', 'bordado'],
        keywords: ['banho', 'personalizado']
      },
      {
        id: '3',
        name: 'Conjunto Infantil',
        type: 'product',
        category: 'Infantil',
        price: 'R$ 28,00',
        description: 'Conjunto para crianças',
        tags: ['infantil', 'conjunto'],
        keywords: ['criança', 'bebê']
      }
    ];
  });

  describe('searchProducts', () => {
    it('should return all products when search query is empty', () => {
      const result = searchProducts(mockProducts, '');
      expect(result).toEqual(mockProducts);
    });

    it('should filter products by name', () => {
      const result = searchProducts(mockProducts, 'camisa');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Camisa Polo Bordada');
    });

    it('should filter products by description', () => {
      const result = searchProducts(mockProducts, 'felpuda');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Toalha de Banho Bordada');
    });

    it('should filter products by category', () => {
      const result = searchProducts(mockProducts, 'infantil');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Infantil');
    });

    it('should filter products by tags', () => {
      const result = searchProducts(mockProducts, 'bordado');
      expect(result).toHaveLength(2);
    });

    it('should be case insensitive', () => {
      const result = searchProducts(mockProducts, 'CAMISA');
      expect(result).toHaveLength(1);
    });
  });

  describe('getCategoryFromSearch', () => {
    it('should return correct category for mapped search terms', () => {
      expect(getCategoryFromSearch('camisa')).toBe('Vestuário');
      expect(getCategoryFromSearch('toalha')).toBe('Banho');
      expect(getCategoryFromSearch('infantil')).toBe('Infantil');
    });

    it('should return null for unmapped search terms', () => {
      expect(getCategoryFromSearch('unmapped')).toBeNull();
    });

    it('should be case insensitive', () => {
      expect(getCategoryFromSearch('CAMISA')).toBe('Vestuário');
    });
  });
});
