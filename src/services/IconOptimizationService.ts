import { lazy, ComponentType } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconCacheEntry {
  component: ComponentType<LucideProps>;
  lastUsed: number;
  usage: number;
}

export class IconOptimizationService {
  private static instance: IconOptimizationService;
  private iconCache = new Map<string, IconCacheEntry>();
  private preloadedIcons = new Set<string>();
  private maxCacheSize = 50;
  private cacheCleanupInterval = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.startCacheCleanup();
  }

  public static getInstance(): IconOptimizationService {
    if (!IconOptimizationService.instance) {
      IconOptimizationService.instance = new IconOptimizationService();
    }
    return IconOptimizationService.instance;
  }

  public async preloadCriticalIcons(iconNames: string[]): Promise<void> {
    const preloadPromises = iconNames.map(async (iconName) => {
      if (!this.preloadedIcons.has(iconName)) {
        await this.loadIcon(iconName);
        this.preloadedIcons.add(iconName);
      }
    });

    await Promise.all(preloadPromises);
  }

  public async loadIcon(iconName: string): Promise<ComponentType<LucideProps>> {
    // Check cache first
    const cached = this.iconCache.get(iconName);
    if (cached) {
      cached.lastUsed = Date.now();
      cached.usage++;
      return cached.component;
    }

    // Check if icon exists in dynamic imports
    const kebabCase = this.camelToKebab(iconName);
    if (!(kebabCase in dynamicIconImports)) {
      throw new Error(`Icon "${iconName}" not found`);
    }

    // Load icon dynamically
    const iconImport = dynamicIconImports[kebabCase as keyof typeof dynamicIconImports];
    const IconComponent = lazy(iconImport);

    // Cache the component
    this.cacheIcon(iconName, IconComponent);

    return IconComponent;
  }

  private cacheIcon(iconName: string, component: ComponentType<LucideProps>): void {
    // Clean cache if it's full
    if (this.iconCache.size >= this.maxCacheSize) {
      this.cleanLeastUsedIcons();
    }

    this.iconCache.set(iconName, {
      component,
      lastUsed: Date.now(),
      usage: 1
    });
  }

  private cleanLeastUsedIcons(): void {
    const entries = Array.from(this.iconCache.entries());
    
    // Sort by usage and last used time
    entries.sort((a, b) => {
      const scoreA = a[1].usage * (Date.now() - a[1].lastUsed);
      const scoreB = b[1].usage * (Date.now() - b[1].lastUsed);
      return scoreB - scoreA;
    });

    // Remove least used icons (keep top 80%)
    const toRemove = Math.floor(this.maxCacheSize * 0.2);
    const entriesToRemove = entries.slice(-toRemove);

    entriesToRemove.forEach(([iconName]) => {
      this.iconCache.delete(iconName);
      this.preloadedIcons.delete(iconName);
    });
  }

  private startCacheCleanup(): void {
    setInterval(() => {
      this.cleanLeastUsedIcons();
    }, this.cacheCleanupInterval);
  }

  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  public getIconStats(): {
    cacheSize: number;
    preloadedCount: number;
    totalUsage: number;
  } {
    const totalUsage = Array.from(this.iconCache.values()).reduce(
      (sum, entry) => sum + entry.usage,
      0
    );

    return {
      cacheSize: this.iconCache.size,
      preloadedCount: this.preloadedIcons.size,
      totalUsage
    };
  }

  public clearCache(): void {
    this.iconCache.clear();
    this.preloadedIcons.clear();
  }
}
