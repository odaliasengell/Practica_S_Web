import { v4 as uuidv4 } from 'uuid';
import { Location } from '../value-objects/Location.js';
import { Price } from '../value-objects/Price.js';
import { Rating } from '../value-objects/Rating.js';

/**
 * Entidad del Dominio: Restaurant
 */

export class Restaurant {
  private readonly _id: string;
  private _name: string;
  private _description: string;
  private _cuisine: string[];
  private _location: Location;
  private _price: Price;
  private _rating: Rating;
  private _phone: string;
  private _email: string;
  private _isActive: boolean;
  private _openingHours: string;
  private _capacity: number;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    name: string,
    description: string,
    cuisine: string[],
    location: Location,
    price: Price,
    rating: Rating,
    phone: string,
    email: string,
    openingHours: string,
    capacity: number,
    id?: string
  ) {
    this._id = id || uuidv4();
    this._name = name;
    this._description = description;
    this._cuisine = cuisine;
    this._location = location;
    this._price = price;
    this._rating = rating;
    this._phone = phone;
    this._email = email;
    this._openingHours = openingHours;
    this._capacity = capacity;
    this._isActive = true;
    this._createdAt = new Date();
    this._updatedAt = new Date();

    this.validate();
  }

  private validate(): void {
    this.validateName(this._name);
    this.validateDescription(this._description);
    this.validateCuisine(this._cuisine);
    this.validatePhone(this._phone);
    this.validateEmail(this._email);
    this.validateCapacity(this._capacity);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('El nombre del restaurante no puede estar vacío');
    }
    if (name.length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }
    if (name.length > 100) {
      throw new Error('El nombre no puede exceder 100 caracteres');
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('La descripción no puede estar vacía');
    }
    if (description.length < 20) {
      throw new Error('La descripción debe tener al menos 20 caracteres');
    }
  }

  private validateCuisine(cuisine: string[]): void {
    if (!cuisine || cuisine.length === 0) {
      throw new Error('Debe especificar al menos un tipo de cocina');
    }
    if (cuisine.length > 5) {
      throw new Error('No puede especificar más de 5 tipos de cocina');
    }
  }

  private validatePhone(phone: string): void {
    const phoneRegex = /^[0-9]{9,10}$/;
    if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
      throw new Error('El teléfono debe tener 9-10 dígitos');
    }
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('El formato del email no es válido');
    }
  }

  private validateCapacity(capacity: number): void {
    if (capacity < 10 || capacity > 500) {
      throw new Error('La capacidad debe estar entre 10 y 500 personas');
    }
  }

  // Getters
  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get description(): string { return this._description; }
  get cuisine(): string[] { return [...this._cuisine]; }
  get location(): Location { return this._location; }
  get price(): Price { return this._price; }
  get rating(): Rating { return this._rating; }
  get phone(): string { return this._phone; }
  get email(): string { return this._email; }
  get isActive(): boolean { return this._isActive; }
  get openingHours(): string { return this._openingHours; }
  get capacity(): number { return this._capacity; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  // Métodos de negocio
  public updateName(name: string): void {
    this.validateName(name);
    this._name = name;
    this._updatedAt = new Date();
  }

  public updateDescription(description: string): void {
    this.validateDescription(description);
    this._description = description;
    this._updatedAt = new Date();
  }

  public updateCuisine(cuisine: string[]): void {
    this.validateCuisine(cuisine);
    this._cuisine = cuisine;
    this._updatedAt = new Date();
  }

  public updateLocation(location: Location): void {
    this._location = location;
    this._updatedAt = new Date();
  }

  public updatePrice(price: Price): void {
    this._price = price;
    this._updatedAt = new Date();
  }

  public updateRating(rating: Rating): void {
    this._rating = rating;
    this._updatedAt = new Date();
  }

  public updatePhone(phone: string): void {
    this.validatePhone(phone);
    this._phone = phone;
    this._updatedAt = new Date();
  }

  public updateEmail(email: string): void {
    this.validateEmail(email);
    this._email = email;
    this._updatedAt = new Date();
  }

  public updateOpeningHours(hours: string): void {
    this._openingHours = hours;
    this._updatedAt = new Date();
  }

  public updateCapacity(capacity: number): void {
    this.validateCapacity(capacity);
    this._capacity = capacity;
    this._updatedAt = new Date();
  }

  public activate(): void {
    this._isActive = true;
    this._updatedAt = new Date();
  }

  public deactivate(): void {
    this._isActive = false;
    this._updatedAt = new Date();
  }

  public addReview(score: number): void {
    this._rating = this._rating.addReview(score);
    this._updatedAt = new Date();
  }

  public toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      cuisine: this._cuisine,
      location: this._location.toJSON(),
      price: this._price.toJSON(),
      rating: this._rating.toJSON(),
      phone: this._phone,
      email: this._email,
      isActive: this._isActive,
      openingHours: this._openingHours,
      capacity: this._capacity,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }

  public toString(): string {
    return `${this._name} - ${this._cuisine.join(', ')} - ${this._location.sector}`;
  }
}