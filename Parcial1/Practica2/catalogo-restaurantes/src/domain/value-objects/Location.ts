/**
 * Objeto de Valor: Location
 * Representa la ubicación geográfica de un restaurante en Manta
 */
export class Location {
  private readonly _address: string;
  private readonly _sector: string;
  private readonly _city: string;
  private readonly _latitude?: number;
  private readonly _longitude?: number;

  constructor(
    address: string,
    sector: string,
    city: string = 'Manta',
    latitude?: number,
    longitude?: number
  ) {
    this.validateAddress(address);
    this.validateSector(sector);
    
    this._address = address;
    this._sector = sector;
    this._city = city;
    this._latitude = latitude;
    this._longitude = longitude;
  }

  private validateAddress(address: string): void {
    if (!address || address.trim().length === 0) {
      throw new Error('La dirección no puede estar vacía');
    }
    if (address.length < 5) {
      throw new Error('La dirección debe tener al menos 5 caracteres');
    }
  }

  private validateSector(sector: string): void {
    if (!sector || sector.trim().length === 0) {
      throw new Error('El sector no puede estar vacío');
    }
  }

  get address(): string { return this._address; }
  get sector(): string { return this._sector; }
  get city(): string { return this._city; }
  get latitude(): number | undefined { return this._latitude; }
  get longitude(): number | undefined { return this._longitude; }
  get fullAddress(): string {
    return `${this._address}, ${this._sector}, ${this._city}`;
  }

  public equals(other: Location): boolean {
    return (
      this._address === other._address &&
      this._sector === other._sector &&
      this._city === other._city
    );
  }

  public toString(): string {
    return this.fullAddress;
  }

  public toJSON(): object {
    return {
      address: this._address,
      sector: this._sector,
      city: this._city,
      latitude: this._latitude,
      longitude: this._longitude
    };
  }
}