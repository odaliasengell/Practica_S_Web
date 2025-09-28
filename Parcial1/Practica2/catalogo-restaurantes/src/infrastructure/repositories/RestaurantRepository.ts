import { Restaurant } from '../../domain/entities/Restaurant.js';
import { IRestaurantRepository, RestaurantCallback } from '../../domain/interfaces/IRestaurantRepository.js';
import { getMockRestaurants } from '../data/mockData.js';

/**
 * Implementación del Repositorio de Restaurantes en Memoria
 * Aplica los tres paradigmas asíncronos según operación CRUD
 */
export class RestaurantRepository implements IRestaurantRepository {
  private restaurants: Map<string, Restaurant>;
  private readonly NETWORK_LATENCY = 500; // Simulación de latencia de red en ms

  constructor() {
    this.restaurants = new Map();
    this.loadMockData();
  }

  /**
   * Carga los datos mock iniciales
   */
  private loadMockData(): void {
    const mockData = getMockRestaurants();
    mockData.forEach(restaurant => {
      this.restaurants.set(restaurant.id, restaurant);
    });
  }

  /**
   * Simula latencia de red
   */
  private simulateNetworkLatency(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, this.NETWORK_LATENCY);
    });
  }

  /**
   * CREATE - Implementado con CALLBACKS
   * Patrón (error, resultado) estándar de Node.js
   */
  create(restaurant: Restaurant, callback: RestaurantCallback): void {
    setTimeout(() => {
      try {
        // Validar que no exista un restaurante con el mismo ID
        if (this.restaurants.has(restaurant.id)) {
          const error = new Error(`Ya existe un restaurante con el ID: ${restaurant.id}`);
          return callback(error);
        }

        // Validar que no exista un restaurante con el mismo nombre
        const existingName = Array.from(this.restaurants.values())
          .find(r => r.name.toLowerCase() === restaurant.name.toLowerCase());
        
        if (existingName) {
          const error = new Error(`Ya existe un restaurante con el nombre: ${restaurant.name}`);
          return callback(error);
        }

        // Insertar el restaurante
        this.restaurants.set(restaurant.id, restaurant);
        
        console.log(`✅ Restaurante creado exitosamente: ${restaurant.name}`);
        
        // Callback exitoso: error null, resultado presente
        callback(null, restaurant);
        
      } catch (error) {
        // Callback con error
        callback(error as Error);
      }
    }, this.NETWORK_LATENCY);
  }

  /**
   * READ - Implementado con ASYNC/AWAIT
   * Obtiene todos los restaurantes
   */
  async findAll(): Promise<Restaurant[]> {
    await this.simulateNetworkLatency();
    
    try {
      const allRestaurants = Array.from(this.restaurants.values());
      console.log(`📋 Se encontraron ${allRestaurants.length} restaurantes`);
      return allRestaurants;
    } catch (error) {
      console.error('❌ Error al obtener todos los restaurantes:', error);
      throw new Error('Error al obtener la lista de restaurantes');
    }
  }

  /**
   * READ - Implementado con ASYNC/AWAIT
   * Busca un restaurante por ID
   */
  async findById(id: string): Promise<Restaurant | undefined> {
    await this.simulateNetworkLatency();
    
    try {
      const restaurant = this.restaurants.get(id);
      
      if (restaurant) {
        console.log(`🔍 Restaurante encontrado: ${restaurant.name}`);
      } else {
        console.log(`⚠️  No se encontró restaurante con ID: ${id}`);
      }
      
      return restaurant;
    } catch (error) {
      console.error(`❌ Error al buscar restaurante por ID ${id}:`, error);
      throw new Error(`Error al buscar restaurante con ID: ${id}`);
    }
  }

  /**
   * READ - Implementado con ASYNC/AWAIT
   * Busca restaurantes por tipo de cocina
   */
  async findByCuisine(cuisine: string): Promise<Restaurant[]> {
    await this.simulateNetworkLatency();
    
    try {
      const restaurants = Array.from(this.restaurants.values())
        .filter(r => 
          r.cuisine.some(c => 
            c.toLowerCase().includes(cuisine.toLowerCase())
          )
        );
      
      console.log(`🍽️  Se encontraron ${restaurants.length} restaurantes de cocina: ${cuisine}`);
      return restaurants;
    } catch (error) {
      console.error(`❌ Error al buscar por cocina ${cuisine}:`, error);
      throw new Error(`Error al buscar restaurantes de cocina: ${cuisine}`);
    }
  }

  /**
   * READ - Implementado con ASYNC/AWAIT
   * Busca restaurantes por sector
   */
  async findBySector(sector: string): Promise<Restaurant[]> {
    await this.simulateNetworkLatency();
    
    try {
      const restaurants = Array.from(this.restaurants.values())
        .filter(r => 
          r.location.sector.toLowerCase().includes(sector.toLowerCase())
        );
      
      console.log(`📍 Se encontraron ${restaurants.length} restaurantes en: ${sector}`);
      return restaurants;
    } catch (error) {
      console.error(`❌ Error al buscar por sector ${sector}:`, error);
      throw new Error(`Error al buscar restaurantes en sector: ${sector}`);
    }
  }

  /**
   * UPDATE - Implementado con PROMISES
   * Actualiza un restaurante existente
   */
  update(id: string, updates: Partial<Restaurant>): Promise<Restaurant> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validar existencia del restaurante
          const restaurant = this.restaurants.get(id);
          
          if (!restaurant) {
            reject(new Error(`No existe un restaurante con el ID: ${id}`));
            return;
          }

          // Aplicar actualizaciones parciales usando los métodos de la entidad
          if (updates.name !== undefined && updates.name !== restaurant.name) {
            restaurant.updateName(updates.name);
          }

          if (updates.description !== undefined && updates.description !== restaurant.description) {
            restaurant.updateDescription(updates.description);
          }

          if (updates.cuisine !== undefined) {
            restaurant.updateCuisine(updates.cuisine);
          }

          if (updates.location !== undefined) {
            restaurant.updateLocation(updates.location);
          }

          if (updates.price !== undefined) {
            restaurant.updatePrice(updates.price);
          }

          if (updates.rating !== undefined) {
            restaurant.updateRating(updates.rating);
          }

          if (updates.phone !== undefined && updates.phone !== restaurant.phone) {
            restaurant.updatePhone(updates.phone);
          }

          if (updates.email !== undefined && updates.email !== restaurant.email) {
            restaurant.updateEmail(updates.email);
          }

          if (updates.openingHours !== undefined && updates.openingHours !== restaurant.openingHours) {
            restaurant.updateOpeningHours(updates.openingHours);
          }

          if (updates.capacity !== undefined && updates.capacity !== restaurant.capacity) {
            restaurant.updateCapacity(updates.capacity);
          }

          // Actualizar en el Map
          this.restaurants.set(id, restaurant);
          
          console.log(`✏️  Restaurante actualizado: ${restaurant.name}`);
          
          // Resolver la promesa con el restaurante actualizado
          resolve(restaurant);
          
        } catch (error) {
          // Rechazar la promesa en caso de error
          console.error(`❌ Error al actualizar restaurante ${id}:`, error);
          reject(error);
        }
      }, this.NETWORK_LATENCY);
    });
  }

  /**
   * DELETE - Implementado con ASYNC/AWAIT
   * Elimina un restaurante (eliminación física)
   */
  async delete(id: string): Promise<boolean> {
    await this.simulateNetworkLatency();
    
    try {
      // Validar existencia
      const restaurant = this.restaurants.get(id);
      
      if (!restaurant) {
        console.log(`⚠️  No se puede eliminar. Restaurante con ID ${id} no existe`);
        return false;
      }

      // Eliminar del Map
      const deleted = this.restaurants.delete(id);
      
      if (deleted) {
        console.log(`🗑️  Restaurante eliminado: ${restaurant.name}`);
      }
      
      return deleted;
      
    } catch (error) {
      console.error(`❌ Error al eliminar restaurante ${id}:`, error);
      throw new Error(`Error al eliminar restaurante con ID: ${id}`);
    }
  }

  /**
   * Obtiene el conteo total de restaurantes
   */
  async count(): Promise<number> {
    await this.simulateNetworkLatency();
    return this.restaurants.size;
  }

  /**
   * Verifica si existe un restaurante
   */
  async exists(id: string): Promise<boolean> {
    await this.simulateNetworkLatency();
    return this.restaurants.has(id);
  }
}