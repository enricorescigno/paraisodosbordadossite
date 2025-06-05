
export class ProductPricing {
  private readonly _price: string;
  private readonly _isCustomizable: boolean;

  constructor(price: string, isCustomizable: boolean = false) {
    this._price = this.validateAndFormatPrice(price);
    this._isCustomizable = isCustomizable;
  }

  get price(): string { return this._price; }
  get isCustomizable(): boolean { return this._isCustomizable; }

  hasPrice(): boolean {
    return this._price !== '';
  }

  getDisplayPrice(): string {
    if (!this.hasPrice()) {
      return this._isCustomizable ? 'Preço sob consulta' : 'Preço não informado';
    }
    return this._price;
  }

  private validateAndFormatPrice(price: string): string {
    if (!price || typeof price !== 'string') return '';
    
    const cleanPrice = price.trim();
    if (cleanPrice === '') return '';
    
    // Basic price format validation (R$ X,XX)
    if (cleanPrice.includes('R$') || cleanPrice.includes(',') || cleanPrice.includes('.')) {
      return cleanPrice;
    }
    
    // If it's just a number, format it
    const numericPrice = parseFloat(cleanPrice);
    if (!isNaN(numericPrice)) {
      return `R$ ${numericPrice.toFixed(2).replace('.', ',')}`;
    }
    
    return cleanPrice;
  }
}
