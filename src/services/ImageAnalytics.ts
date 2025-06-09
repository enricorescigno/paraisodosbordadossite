
interface ImageMetrics {
  url: string;
  loadTime: number;
  fileSize: number;
  format: string;
  cacheHit: boolean;
  viewport: boolean;
  priority: 'high' | 'medium' | 'low';
  timestamp: number;
  errorCount: number;
  retryCount: number;
  compressionRatio?: number;
  renderTime?: number;
}

interface PerformanceReport {
  averageLoadTime: number;
  cacheHitRate: number;
  errorRate: number;
  totalImagesLoaded: number;
  bandwidthSaved: number;
  formatDistribution: Record<string, number>;
  priorityDistribution: Record<string, number>;
}

export class ImageAnalytics {
  private static instance: ImageAnalytics;
  private metrics: Map<string, ImageMetrics> = new Map();
  private performanceObserver: PerformanceObserver | null = null;
  private reportingInterval: number = 30000; // 30 seconds

  private constructor() {
    this.initPerformanceObserver();
    this.startReporting();
  }

  public static getInstance(): ImageAnalytics {
    if (!ImageAnalytics.instance) {
      ImageAnalytics.instance = new ImageAnalytics();
    }
    return ImageAnalytics.instance;
  }

  private initPerformanceObserver(): void {
    if (typeof PerformanceObserver !== 'undefined') {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'resource' && this.isImageResource(entry.name)) {
            this.recordResourceTiming(entry as PerformanceResourceTiming);
          }
        });
      });

      this.performanceObserver.observe({ 
        entryTypes: ['resource', 'measure', 'navigation'] 
      });
    }
  }

  private isImageResource(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp|avif|svg)(\?.*)?$/i.test(url);
  }

  private recordResourceTiming(entry: PerformanceResourceTiming): void {
    const existing = this.metrics.get(entry.name);
    if (existing) {
      existing.loadTime = entry.duration;
      // Use responseEnd - responseStart as a proxy for render time
      existing.renderTime = entry.responseEnd - entry.responseStart;
    }
  }

  public trackImageLoad(
    url: string,
    options: {
      fileSize: number;
      format: string;
      cacheHit: boolean;
      viewport: boolean;
      priority: 'high' | 'medium' | 'low';
      loadTime: number;
      compressionRatio?: number;
    }
  ): void {
    const metric: ImageMetrics = {
      url,
      loadTime: options.loadTime,
      fileSize: options.fileSize,
      format: options.format,
      cacheHit: options.cacheHit,
      viewport: options.viewport,
      priority: options.priority,
      timestamp: Date.now(),
      errorCount: 0,
      retryCount: 0,
      compressionRatio: options.compressionRatio
    };

    this.metrics.set(url, metric);
    console.log(`Image Analytics: ${url} loaded in ${options.loadTime}ms`, metric);
  }

  public trackImageError(url: string, error: Error): void {
    const existing = this.metrics.get(url);
    if (existing) {
      existing.errorCount += 1;
    } else {
      this.metrics.set(url, {
        url,
        loadTime: 0,
        fileSize: 0,
        format: 'unknown',
        cacheHit: false,
        viewport: false,
        priority: 'low',
        timestamp: Date.now(),
        errorCount: 1,
        retryCount: 0
      });
    }

    console.error(`Image Analytics: Error loading ${url}`, error);
  }

  public trackImageRetry(url: string): void {
    const existing = this.metrics.get(url);
    if (existing) {
      existing.retryCount += 1;
    }
  }

  public generateReport(): PerformanceReport {
    const metrics = Array.from(this.metrics.values());
    const totalImages = metrics.length;
    const successfulLoads = metrics.filter(m => m.errorCount === 0);

    const averageLoadTime = successfulLoads.length > 0
      ? successfulLoads.reduce((sum, m) => sum + m.loadTime, 0) / successfulLoads.length
      : 0;

    const cacheHits = metrics.filter(m => m.cacheHit).length;
    const cacheHitRate = totalImages > 0 ? (cacheHits / totalImages) * 100 : 0;

    const errors = metrics.filter(m => m.errorCount > 0).length;
    const errorRate = totalImages > 0 ? (errors / totalImages) * 100 : 0;

    const bandwidthSaved = metrics
      .filter(m => m.compressionRatio)
      .reduce((sum, m) => sum + (m.fileSize * (m.compressionRatio! - 1)), 0);

    const formatDistribution: Record<string, number> = {};
    const priorityDistribution: Record<string, number> = {};

    metrics.forEach(m => {
      formatDistribution[m.format] = (formatDistribution[m.format] || 0) + 1;
      priorityDistribution[m.priority] = (priorityDistribution[m.priority] || 0) + 1;
    });

    return {
      averageLoadTime,
      cacheHitRate,
      errorRate,
      totalImagesLoaded: totalImages,
      bandwidthSaved,
      formatDistribution,
      priorityDistribution
    };
  }

  private startReporting(): void {
    setInterval(() => {
      const report = this.generateReport();
      console.group('📊 Image Performance Report');
      console.log('Average Load Time:', `${report.averageLoadTime.toFixed(2)}ms`);
      console.log('Cache Hit Rate:', `${report.cacheHitRate.toFixed(1)}%`);
      console.log('Error Rate:', `${report.errorRate.toFixed(1)}%`);
      console.log('Total Images:', report.totalImagesLoaded);
      console.log('Bandwidth Saved:', `${(report.bandwidthSaved / 1024).toFixed(2)}KB`);
      console.log('Format Distribution:', report.formatDistribution);
      console.log('Priority Distribution:', report.priorityDistribution);
      console.groupEnd();
    }, this.reportingInterval);
  }

  public getMetrics(): ImageMetrics[] {
    return Array.from(this.metrics.values());
  }

  public clearMetrics(): void {
    this.metrics.clear();
  }

  public setReportingInterval(ms: number): void {
    this.reportingInterval = ms;
  }
}

export const imageAnalytics = ImageAnalytics.getInstance();
