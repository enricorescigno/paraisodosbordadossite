
export class ProductVariant {
  private readonly _colors: string[];
  private readonly _sizes: string[];

  constructor(colors: string[] = [], sizes: string[] = []) {
    this._colors = this.validateAndClean(colors);
    this._sizes = this.validateAndClean(sizes);
  }

  get colors(): string[] { return [...this._colors]; }
  get sizes(): string[] { return [...this._sizes]; }

  hasColors(): boolean { return this._colors.length > 0; }
  hasSizes(): boolean { return this._sizes.length > 0; }

  getFirstColor(): string | null {
    return this._colors[0] || null;
  }

  getFirstSize(): string | null {
    return this._sizes[0] || null;
  }

  isValidColor(color: string): boolean {
    return this._colors.includes(color);
  }

  isValidSize(size: string): boolean {
    return this._sizes.includes(size);
  }

  private validateAndClean(items: string[]): string[] {
    if (!Array.isArray(items)) return [];
    return items.filter(item => item && typeof item === 'string' && item.trim() !== '');
  }
}
