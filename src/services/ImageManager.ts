import { imageOptimizer } from './ImageOptimizer';
import { formatDetector } from './FormatDetector';

interface ImageMetadata {
  url: string;
  size: number;
  timestamp: number;
  priority: 'high' | 'medium' | 'low';
  format: 'avif' | 'webp' | 'jpeg' | 'png';
  loaded: boolean;
  error: boolean;
  quality: 'low' | 'medium' | 'high';
  width?: number;
}

interface CacheEntry {
  blob: Blob;
  metadata: ImageMetadata;
  lastAccessed: number;
}

interface PreloadOptions {
  priority?: 'high' | 'medium' | 'low';
  eager?: boolean;
  placeholder?: boolean;
  quality?: 'low' | 'medium' | 'high';
  width?: number;
}

export class ImageManager {
  private static instance: ImageManager;
  private cache: Map<string, CacheEntry> = new Map();
  private dbName = 'paraiso-image-cache-v2';
  private db: IDBDatabase | null = null;
  private preloadQueue: Set<string> = new Set();
  private loadingPromises: Map<string, Promise<string>> = new Map();
  private readonly maxCacheSize = 100 * 1024 * 1024; // 100MB
  private readonly maxAge = 14 * 24 * 60 * 60 * 1000; // 14 days

  private constructor() {
    this.initDatabase();
    this.startCleanupScheduler();
  }

  public static getInstance(): ImageManager {
    if (!ImageManager.instance) {
      ImageManager.instance = new ImageManager();
    }
    return ImageManager.instance;
  }

  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('images')) {
          const store = db.createObjectStore('images', { keyPath: 'url' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  public async loadImage(url: string, options: PreloadOptions = {}): Promise<string> {
    if (!url) return '';

    // Generate optimized URL based on options
    const optimizedUrl = await this.getOptimizedUrl(url, options);
    
    // Check memory cache first
    const cached = this.cache.get(optimizedUrl);
    if (cached) {
      cached.lastAccessed = Date.now();
      return URL.createObjectURL(cached.blob);
    }

    // Check if already loading
    if (this.loadingPromises.has(optimizedUrl)) {
      return this.loadingPromises.get(optimizedUrl)!;
    }

    // Start loading
    const loadPromise = this.loadImageFromNetwork(optimizedUrl, options);
    this.loadingPromises.set(optimizedUrl, loadPromise);

    try {
      const result = await loadPromise;
      this.loadingPromises.delete(optimizedUrl);
      return result;
    } catch (error) {
      this.loadingPromises.delete(optimizedUrl);
      throw error;
    }
  }

  private async getOptimizedUrl(url: string, options: PreloadOptions): Promise<string> {
    const quality = options.quality || 'high';
    const width = options.width;

    return await imageOptimizer.getOptimalImageUrl(url, width, quality);
  }

  private async loadImageFromNetwork(url: string, options: PreloadOptions): Promise<string> {
    // Try to load from IndexedDB first
    const dbEntry = await this.getFromDatabase(url);
    if (dbEntry && !this.isExpired(dbEntry.metadata)) {
      const cacheEntry: CacheEntry = {
        blob: dbEntry.blob,
        metadata: dbEntry.metadata,
        lastAccessed: Date.now()
      };
      this.cache.set(url, cacheEntry);
      return URL.createObjectURL(dbEntry.blob);
    }

    // Load from network
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const blob = await response.blob();
      const bestFormat = await formatDetector.getBestFormat();
      
      const metadata: ImageMetadata = {
        url,
        size: blob.size,
        timestamp: Date.now(),
        priority: options.priority || 'medium',
        format: this.detectFormat(blob.type) || bestFormat,
        loaded: true,
        error: false,
        quality: options.quality || 'high',
        width: options.width
      };

      const cacheEntry: CacheEntry = {
        blob,
        metadata,
        lastAccessed: Date.now()
      };

      // Store in memory cache
      this.cache.set(url, cacheEntry);
      
      // Store in IndexedDB
      await this.saveToDatabase(url, blob, metadata);
      
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error(`Failed to load image: ${url}`, error);
      throw error;
    }
  }

  public async preloadImages(urls: string[], options: PreloadOptions = {}): Promise<void> {
    const optimizedUrls = await Promise.all(
      urls.map(url => this.getOptimizedUrl(url, options))
    );

    const promises = optimizedUrls
      .filter(url => !this.cache.has(url) && !this.preloadQueue.has(url))
      .map(url => {
        this.preloadQueue.add(url);
        return this.loadImage(url, { ...options, eager: false })
          .then(() => this.preloadQueue.delete(url))
          .catch(() => this.preloadQueue.delete(url));
      });

    await Promise.allSettled(promises);
  }

  public async preloadResponsiveImages(url: string, maxWidth: number = 1200): Promise<void> {
    try {
      const responsiveSet = await imageOptimizer.generateResponsiveSet(url, maxWidth);
      
      // Preload low quality first, then high quality
      const lowQualityUrls = responsiveSet.lowQuality.slice(0, 2).map(variant => variant.url);
      const highQualityUrls = responsiveSet.highQuality.slice(0, 2).map(variant => variant.url);
      
      await this.preloadImages(lowQualityUrls, { priority: 'high', quality: 'low' });
      await this.preloadImages(highQualityUrls, { priority: 'medium', quality: 'high' });
    } catch (error) {
      console.error('Failed to preload responsive images:', error);
    }
  }

  public async preloadNextImages(currentIndex: number, totalImages: number, imageUrls: string[]): Promise<void> {
    const preloadCount = 3;
    const startIndex = Math.max(0, currentIndex - 1);
    const endIndex = Math.min(totalImages, currentIndex + preloadCount + 1);
    
    const urlsToPreload = imageUrls.slice(startIndex, endIndex);
    await this.preloadImages(urlsToPreload, { priority: 'high' });
  }

  private async getFromDatabase(url: string): Promise<{ blob: Blob; metadata: ImageMetadata } | null> {
    if (!this.db) return null;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(['images'], 'readonly');
      const store = transaction.objectStore('images');
      const request = store.get(url);

      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          resolve({
            blob: result.blob,
            metadata: result.metadata
          });
        } else {
          resolve(null);
        }
      };

      request.onerror = () => resolve(null);
    });
  }

  private async saveToDatabase(url: string, blob: Blob, metadata: ImageMetadata): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(['images'], 'readwrite');
    const store = transaction.objectStore('images');
    
    store.put({
      url,
      blob,
      metadata,
      timestamp: Date.now()
    });
  }

  private detectFormat(mimeType: string): 'avif' | 'webp' | 'jpeg' | 'png' | null {
    if (mimeType.includes('avif')) return 'avif';
    if (mimeType.includes('webp')) return 'webp';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'jpeg';
    if (mimeType.includes('png')) return 'png';
    return null;
  }

  private isExpired(metadata: ImageMetadata): boolean {
    return Date.now() - metadata.timestamp > this.maxAge;
  }

  private startCleanupScheduler(): void {
    // Clean up expired entries every hour
    setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000);
  }

  private async cleanup(): Promise<void> {
    // Clean memory cache
    const now = Date.now();
    for (const [url, entry] of this.cache.entries()) {
      if (this.isExpired(entry.metadata) || (now - entry.lastAccessed > 30 * 60 * 1000)) {
        URL.revokeObjectURL(url);
        this.cache.delete(url);
      }
    }

    // Clean IndexedDB
    if (this.db) {
      const transaction = this.db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      const index = store.index('timestamp');
      const cutoff = now - this.maxAge;
      
      index.openCursor(IDBKeyRange.upperBound(cutoff)).onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
    }
  }

  public getStats() {
    const totalSize = Array.from(this.cache.values()).reduce((acc, entry) => acc + entry.metadata.size, 0);
    return {
      cacheSize: this.cache.size,
      totalSize,
      preloadQueue: this.preloadQueue.size,
      loadingPromises: this.loadingPromises.size,
      supportedFormats: formatDetector.getSupportedFormats()
    };
  }

  public clearCache(): void {
    // Clear memory cache and revoke URLs
    for (const [url] of this.cache.entries()) {
      URL.revokeObjectURL(url);
    }
    this.cache.clear();
    this.preloadQueue.clear();
    this.loadingPromises.clear();

    // Clear IndexedDB
    if (this.db) {
      const transaction = this.db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      store.clear();
    }
  }
}

export const imageManager = ImageManager.getInstance();
