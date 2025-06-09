
export class FormatDetector {
  private static instance: FormatDetector;
  private supportedFormats: Map<string, boolean> = new Map();
  private detectionPromises: Map<string, Promise<boolean>> = new Map();

  private constructor() {
    this.detectFormats();
  }

  public static getInstance(): FormatDetector {
    if (!FormatDetector.instance) {
      FormatDetector.instance = new FormatDetector();
    }
    return FormatDetector.instance;
  }

  private async detectFormats(): Promise<void> {
    // Detect WebP support
    this.detectionPromises.set('webp', this.canUseFormat('webp'));
    
    // Detect AVIF support
    this.detectionPromises.set('avif', this.canUseFormat('avif'));

    // Wait for all detections to complete
    const webpSupport = await this.detectionPromises.get('webp')!;
    const avifSupport = await this.detectionPromises.get('avif')!;

    this.supportedFormats.set('webp', webpSupport);
    this.supportedFormats.set('avif', avifSupport);
  }

  private canUseFormat(format: 'webp' | 'avif'): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      
      if (format === 'webp') {
        img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      } else if (format === 'avif') {
        img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      }
    });
  }

  public async supportsFormat(format: 'webp' | 'avif'): Promise<boolean> {
    // Wait for detection if not completed
    if (this.detectionPromises.has(format)) {
      await this.detectionPromises.get(format);
    }
    
    return this.supportedFormats.get(format) || false;
  }

  public async getBestFormat(): Promise<'avif' | 'webp' | 'jpeg'> {
    const avifSupported = await this.supportsFormat('avif');
    const webpSupported = await this.supportsFormat('webp');

    if (avifSupported) return 'avif';
    if (webpSupported) return 'webp';
    return 'jpeg';
  }

  public getSupportedFormats(): string[] {
    const formats = ['jpeg']; // Always supported
    if (this.supportedFormats.get('webp')) formats.unshift('webp');
    if (this.supportedFormats.get('avif')) formats.unshift('avif');
    return formats;
  }
}

export const formatDetector = FormatDetector.getInstance();
