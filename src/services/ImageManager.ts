
interface ImageMetadata {
  url: string;
  size: number;
  timestamp: number;
  priority: 'high' | 'medium' | 'low';
  format: 'webp' | 'jpeg' | 'png';
  loaded: boolean;
  error: boolean;
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
}

export class ImageManager {
  private static instance: ImageManager;
  private cache: Map<string, CacheEntry> = new Map();
  private dbName = 'paraiso-image-cache';
  private db: IDBDatabase | null = null;
  private preloadQueue: Set<string> = new Set();
  private loadingPromises: Map<string, Promise<string>> = new Map();
  private readonly maxCacheSize = 50 * 1024 * 1024; // 50MB
  private readonly maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

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

    // Check memory cache first
    const cached = this.cache.get(url);
    if (cached) {
      cached.lastAccessed = Date.now();
      return URL.createObjectURL(cached.blob);
    }

    // Check if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    // Start loading
    const loadPromise = this.loadImageFromNetwork(url, options);
    this.loadingPromises.set(url, loadPromise);

    try {
      const result = await loadPromise;
      this.loadingPromises.delete(url);
      return result;
    } catch (error) {
      this.loadingPromises.delete(url);
      throw error;
    }
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
      const metadata: ImageMetadata = {
        url,
        size: blob.size,
        timestamp: Date.now(),
        priority: options.priority || 'medium',
        format: this.detectFormat(blob.type),
        loaded: true,
        error: false
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
    const promises = urls
      .filter(url => !this.cache.has(url) && !this.preloadQueue.has(url))
      .map(url => {
        this.preloadQueue.add(url);
        return this.loadImage(url, { ...options, eager: false })
          .then(() => this.preloadQueue.delete(url))
          .catch(() => this.preloadQueue.delete(url));
      });

    await Promise.allSettled(promises);
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

  private detectFormat(mimeType: string): 'webp' | 'jpeg' | 'png' {
    if (mimeType.includes('webp')) return 'webp';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'jpeg';
    return 'png';
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
      loadingPromises: this.loadingPromises.size
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
