
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CacheService } from '../../services/CacheService';

describe('CacheService', () => {
  let cacheService: CacheService;

  beforeEach(() => {
    cacheService = CacheService.getInstance();
    cacheService.clear();
  });

  describe('singleton pattern', () => {
    it('should return the same instance', () => {
      const instance1 = CacheService.getInstance();
      const instance2 = CacheService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('basic operations', () => {
    it('should set and get data', () => {
      const testData = { id: 1, name: 'test' };
      cacheService.set('test-key', testData);
      
      const retrieved = cacheService.get('test-key');
      expect(retrieved).toEqual(testData);
    });

    it('should return null for non-existent keys', () => {
      const result = cacheService.get('non-existent');
      expect(result).toBeNull();
    });

    it('should check if key exists', () => {
      cacheService.set('test-key', 'test-value');
      expect(cacheService.has('test-key')).toBe(true);
      expect(cacheService.has('non-existent')).toBe(false);
    });

    it('should delete items', () => {
      cacheService.set('test-key', 'test-value');
      expect(cacheService.has('test-key')).toBe(true);
      
      const deleted = cacheService.delete('test-key');
      expect(deleted).toBe(true);
      expect(cacheService.has('test-key')).toBe(false);
    });

    it('should clear all items', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');
      
      cacheService.clear();
      expect(cacheService.has('key1')).toBe(false);
      expect(cacheService.has('key2')).toBe(false);
    });
  });

  describe('TTL functionality', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should expire items after TTL', () => {
      const shortTTL = 1000; // 1 second
      cacheService.set('test-key', 'test-value', shortTTL);
      
      expect(cacheService.has('test-key')).toBe(true);
      
      vi.advanceTimersByTime(1001);
      expect(cacheService.has('test-key')).toBe(false);
    });

    it('should cleanup expired items', () => {
      const shortTTL = 1000;
      cacheService.set('key1', 'value1', shortTTL);
      cacheService.set('key2', 'value2', shortTTL);
      cacheService.set('key3', 'value3', 60000); // Long TTL
      
      vi.advanceTimersByTime(1001);
      
      const removed = cacheService.cleanup();
      expect(removed).toBe(2);
      expect(cacheService.has('key3')).toBe(true);
    });
  });

  describe('stats', () => {
    it('should return correct stats', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');
      
      const stats = cacheService.getStats();
      expect(stats.size).toBe(2);
      expect(stats.keys).toContain('key1');
      expect(stats.keys).toContain('key2');
    });
  });
});
