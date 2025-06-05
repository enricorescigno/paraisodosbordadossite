
export class ProductImage {
  private readonly _url: string;
  private readonly _isPrimary: boolean;
  private readonly _colorVariant?: string;
  private readonly _alt: string;

  constructor(url: string, isPrimary: boolean = false, colorVariant?: string) {
    this.validateUrl(url);
    
    this._url = this.processUrl(url);
    this._isPrimary = isPrimary;
    this._colorVariant = colorVariant;
    this._alt = this.generateAlt(colorVariant);
  }

  get url(): string { return this._url; }
  get isPrimary(): boolean { return this._isPrimary; }
  get colorVariant(): string | undefined { return this._colorVariant; }
  get alt(): string { return this._alt; }

  isForColor(color: string): boolean {
    return !this._colorVariant || this._colorVariant === color;
  }

  private validateUrl(url: string): void {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      throw new Error('Invalid image URL');
    }
  }

  private processUrl(url: string): string {
    const cleanUrl = url.trim();
    
    // Return external URLs as-is
    if (cleanUrl.startsWith('http') || cleanUrl.startsWith('data:')) {
      return cleanUrl;
    }
    
    // Ensure local URLs start with /
    if (!cleanUrl.startsWith('/')) {
      return `/${cleanUrl}`;
    }
    
    return cleanUrl;
  }

  private generateAlt(colorVariant?: string): string {
    return colorVariant ? `Produto - ${colorVariant}` : 'Produto';
  }
}
