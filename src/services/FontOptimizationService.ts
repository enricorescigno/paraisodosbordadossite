
export interface FontConfig {
  family: string;
  weights: number[];
  display: 'swap' | 'fallback' | 'optional';
  subset: 'latin' | 'latin-ext' | 'cyrillic';
  preload?: boolean;
}

export class FontOptimizationService {
  private static instance: FontOptimizationService;
  private loadedFonts = new Set<string>();
  private fontCache = new Map<string, string>();

  private constructor() {}

  public static getInstance(): FontOptimizationService {
    if (!FontOptimizationService.instance) {
      FontOptimizationService.instance = new FontOptimizationService();
    }
    return FontOptimizationService.instance;
  }

  public async preloadCriticalFonts(fonts: FontConfig[]): Promise<void> {
    const criticalFonts = fonts.filter(font => font.preload);
    
    const preloadPromises = criticalFonts.map(async (font) => {
      const url = this.generateFontUrl(font);
      return this.preloadFont(url, font.family);
    });

    await Promise.all(preloadPromises);
  }

  private generateFontUrl(config: FontConfig): string {
    const { family, weights, display, subset } = config;
    const weightsParam = weights.join(';');
    const encodedFamily = encodeURIComponent(family);
    
    return `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${weightsParam}&display=${display}&subset=${subset}`;
  }

  private async preloadFont(url: string, family: string): Promise<void> {
    if (this.loadedFonts.has(family)) {
      return;
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'style';
      link.crossOrigin = 'anonymous';
      
      link.onload = () => {
        this.loadedFonts.add(family);
        this.fontCache.set(family, url);
        resolve();
      };
      
      link.onerror = reject;
      
      document.head.appendChild(link);
      
      // Also add the actual stylesheet
      setTimeout(() => {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = url;
        document.head.appendChild(stylesheet);
      }, 0);
    });
  }

  public getFontFaceCSS(fonts: FontConfig[]): string {
    return fonts.map(font => {
      return `
        @font-face {
          font-family: '${font.family}';
          font-display: ${font.display};
          font-weight: ${font.weights.join(' ')};
          src: url('${this.generateFontUrl(font)}');
        }
      `;
    }).join('\n');
  }

  public isFontLoaded(family: string): boolean {
    return this.loadedFonts.has(family);
  }

  public clearCache(): void {
    this.fontCache.clear();
    this.loadedFonts.clear();
  }
}
