import { Restaurant } from '../../domain/entities/Restaurant.js';
import { IRestaurantRepository, RestaurantCallback } from '../../domain/interfaces/IRestaurantRepository.js';

/**
 * Servicio de Aplicación para Restaurantes
 * Orquesta las operaciones del dominio y coordina casos de uso
 */
export class RestaurantService {
  private repository: IRestaurantRepository;

  constructor(repository: IRestaurantRepository) {
    this.repository = repository;
  }

  /**
   * CREATE - Usa callback del repositorio
   */
  createRestaurant(restaurant: Restaurant, callback: RestaurantCallback): void {
    console.log(`\n🏗️  Intentando crear restaurante: ${restaurant.name}`);
    this.repository.create(restaurant, (error, result) => {
      if (error) {
        console.error(`❌ Error en servicio al crear: ${error.message}`);
        callback(error);
      } else if (result) {
        console.log(`✅ Servicio: Restaurante creado exitosamente`);
        callback(null, result);
      }
    });
  }

  /**
   * READ - Obtener todos los restaurantes
   */
  async getAllRestaurants(): Promise<Restaurant[]> {
    console.log('\n📋 Servicio: Obteniendo todos los restaurantes...');
    try {
      const restaurants = await this.repository.findAll();
      console.log(`✅ Servicio: ${restaurants.length} restaurantes obtenidos`);
      return restaurants;
    } catch (error) {
      console.error('❌ Error en servicio al obtener restaurantes:', error);
      throw error;
    }
  }

  /**
   * READ - Buscar por ID
   */
  async getRestaurantById(id: string): Promise<Restaurant | undefined> {
    console.log(`\n🔍 Servicio: Buscando restaurante con ID: ${id}`);
    try {
      const restaurant = await this.repository.findById(id);
      if (restaurant) {
        console.log(`✅ Servicio: Restaurante encontrado`);
      } else {
        console.log(`⚠️  Servicio: Restaurante no encontrado`);
      }
      return restaurant;
    } catch (error) {
      console.error('❌ Error en servicio al buscar por ID:', error);
      throw error;
    }
  }

  /**
   * READ - Buscar por tipo de cocina
   */
  async getRestaurantsByCuisine(cuisine: string): Promise<Restaurant[]> {
    console.log(`\n🍽️  Servicio: Buscando restaurantes de cocina: ${cuisine}`);
    try {
      const restaurants = await this.repository.findByCuisine(cuisine);
      console.log(`✅ Servicio: ${restaurants.length} restaurantes encontrados`);
      return restaurants;
    } catch (error) {
      console.error('❌ Error en servicio al buscar por cocina:', error);
      throw error;
    }
  }

  /**
   * READ - Buscar por sector
   */
  async getRestaurantsBySector(sector: string): Promise<Restaurant[]> {
    console.log(`\n📍 Servicio: Buscando restaurantes en sector: ${sector}`);
    try {
      const restaurants = await this.repository.findBySector(sector);
      console.log(`✅ Servicio: ${restaurants.length} restaurantes encontrados`);
      return restaurants;
    } catch (error) {
      console.error('❌ Error en servicio al buscar por sector:', error);
      throw error;
    }
  }

  /**
   * UPDATE - Actualizar restaurante
   */
  async updateRestaurant(id: string, updates: Partial<Restaurant>): Promise<Restaurant> {
    console.log(`\n✏️  Servicio: Actualizando restaurante con ID: ${id}`);
    try {
      const restaurant = await this.repository.update(id, updates);
      console.log(`✅ Servicio: Restaurante actualizado exitosamente`);
      return restaurant;
    } catch (error) {
      console.error('❌ Error en servicio al actualizar:', error);
      throw error;
    }
  }

  /**
   * DELETE - Eliminar restaurante
   */
  async deleteRestaurant(id: string): Promise<boolean> {
    console.log(`\n🗑️  Servicio: Eliminando restaurante con ID: ${id}`);
    try {
      const deleted = await this.repository.delete(id);
      if (deleted) {
        console.log(`✅ Servicio: Restaurante eliminado exitosamente`);
      } else {
        console.log(`⚠️  Servicio: No se pudo eliminar (no existe)`);
      }
      return deleted;
    } catch (error) {
      console.error('❌ Error en servicio al eliminar:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas generales
   */
  async getStatistics(): Promise<{
    total: number;
    byCuisine: Record<string, number>;
    bySector: Record<string, number>;
    averageRating: number;
  }> {
    console.log('\n📊 Servicio: Calculando estadísticas...');
    try {
      const restaurants = await this.repository.findAll();
      
      const byCuisine: Record<string, number> = {};
      const bySector: Record<string, number> = {};
      let totalRating = 0;

      restaurants.forEach(restaurant => {
        // Contar por cocina
        restaurant.cuisine.forEach((c: string) => {
          byCuisine[c] = (byCuisine[c] || 0) + 1;
        });

        // Contar por sector
        const sector = restaurant.location.sector;
        bySector[sector] = (bySector[sector] || 0) + 1;

        // Sumar ratings
        totalRating += restaurant.rating.score;
      });

      const averageRating = restaurants.length > 0 
        ? parseFloat((totalRating / restaurants.length).toFixed(2))
        : 0;

      const stats = {
        total: restaurants.length,
        byCuisine,
        bySector,
        averageRating
      };

      console.log('✅ Servicio: Estadísticas calculadas');
      return stats;
    } catch (error) {
      console.error('❌ Error en servicio al calcular estadísticas:', error);
      throw error;
    }
  }

  /**
   * Buscar restaurantes por rango de precio
   */
  async getRestaurantsByPriceRange(minPrice: number, maxPrice: number): Promise<Restaurant[]> {
    console.log(`\n💰 Servicio: Buscando restaurantes entre $${minPrice} y $${maxPrice}`);
    try {
      const allRestaurants = await this.repository.findAll();
      const filtered = allRestaurants.filter(r => 
        r.price.averagePrice >= minPrice && r.price.averagePrice <= maxPrice
      );
      console.log(`✅ Servicio: ${filtered.length} restaurantes en rango de precio`);
      return filtered;
    } catch (error) {
      console.error('❌ Error en servicio al buscar por precio:', error);
      throw error;
    }
  }

  /**
   * Buscar restaurantes mejor calificados
   */
  async getTopRatedRestaurants(limit: number = 5): Promise<Restaurant[]> {
    console.log(`\n⭐ Servicio: Obteniendo top ${limit} restaurantes mejor calificados`);
    try {
      const allRestaurants = await this.repository.findAll();
      const sorted = allRestaurants
        .sort((a, b) => b.rating.score - a.rating.score)
        .slice(0, limit);
      console.log(`✅ Servicio: Top ${sorted.length} restaurantes obtenidos`);
      return sorted;
    } catch (error) {
      console.error('❌ Error en servicio al obtener top rated:', error);
      throw error;
    }
  }
}
