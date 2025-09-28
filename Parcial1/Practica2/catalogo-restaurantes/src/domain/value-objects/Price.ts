/**
 * Objeto de Valor: Price
 * Representa el rango de precios de un restaurante
 */
export enum PriceRange {
  ECONOMICO = '$',
  MODERADO = '$$',
  COSTOSO = '$$$',
  MUY_COSTOSO = '$$$$'
}

export class Price {
  private readonly _range: PriceRange;
  private readonly _averagePrice: number;
  private readonly _currency: string;

  constructor(range: PriceRange, averagePrice: number, currency: string = 'USD') {
    this.validateAveragePrice(averagePrice);
    this.validateRange(range, averagePrice);
    
    this._range = range;
    this._averagePrice = averagePrice;
    this._currency = currency;
  }

  private validateAveragePrice(price: number): void {
    if (price <= 0) {
      throw new Error('El precio promedio debe ser mayor a 0');
    }
    if (price > 200) {
      throw new Error('El precio promedio no puede exceder $200');
    }
  }

  private validateRange(range: PriceRange, averagePrice: number): void {
    const rangeValidations: Record<PriceRange, [number, number]> = {
      [PriceRange.ECONOMICO]: [0, 10],
      [PriceRange.MODERADO]: [10, 25],
      [PriceRange.COSTOSO]: [25, 50],
      [PriceRange.MUY_COSTOSO]: [50, 200]
    };

    const [min, max] = rangeValidations[range];
    if (averagePrice < min || averagePrice > max) {
      throw new Error(
        `El precio promedio $${averagePrice} no coincide con el rango ${range}`
      );
    }
  }

  get range(): PriceRange {
    return this._range;
  }

  get averagePrice(): number {
    return this._averagePrice;
  }

  get currency(): string {
    return this._currency;
  }

  get formattedPrice(): string {
    return `${this._currency} ${this._averagePrice.toFixed(2)}`;
  }

  public equals(other: Price): boolean {
    return (
      this._range === other._range &&
      this._averagePrice === other._averagePrice &&
      this._currency === other._currency
    );
  }

  public toString(): string {
    return `${this._range} (Promedio: ${this.formattedPrice})`;
  }

  public toJSON(): object {
    return {
      range: this._range,
      averagePrice: this._averagePrice,
      currency: this._currency
    };
  }
}