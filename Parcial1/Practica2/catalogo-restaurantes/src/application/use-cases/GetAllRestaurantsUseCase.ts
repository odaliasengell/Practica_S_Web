import { Restaurant } from '../../domain/entities/Restaurant.js';
import { RestaurantService } from '../services/RestaurantService.js';

/**
 * Caso de Uso: Obtener Todos los Restaurantes
 * Implementa la lógica para listar todos los restaurantes disponibles
 */
export class GetAllRestaurantsUseCase {
  private service: RestaurantService;

  constructor(service: RestaurantService) {
    this.service = service;
  }

  /**
   * Ejecuta el caso de uso
   * @returns Promise con array de restaurantes
   */
  async execute(): Promise<Restaurant[]> {
    console.log('\n═══════════════════════════════════════');
    console.log('📋 CASO DE USO: Obtener Todos los Restaurantes');
    console.log('═══════════════════════════════════════');

    try {
      const restaurants = await this.service.getAllRestaurants();
      
      console.log('\n✅ RESULTADO:');
      console.log(`   Total de restaurantes: ${restaurants.length}`);
      
      return restaurants;
    } catch (error) {
      console.error('\n❌ ERROR en caso de uso:', error);
      throw error;
    }
  }

  /**
   * Ejecuta y muestra resultados detallados
   */
  async executeWithDetails(): Promise<void> {
    try {
      const restaurants = await this.execute();
      
      console.log('\n📝 LISTADO DETALLADO:');
      console.log('─────────────────────────────────────────');
      
      restaurants.forEach((restaurant, index) => {
        console.log(`\n${index + 1}. ${restaurant.name}`);
        console.log(`   📍 ${restaurant.location.fullAddress}`);
        console.log(`   🍽️  ${restaurant.cuisine.join(', ')}`);
        console.log(`   💵 ${restaurant.price.range} - Promedio: $${restaurant.price.averagePrice}`);
        console.log(`   ⭐ ${restaurant.rating.score}/5 (${restaurant.rating.totalReviews} reseñas)`);
        console.log(`   📞 ${restaurant.phone}`);
        console.log(`   🕐 ${restaurant.openingHours}`);
      });
      
    } catch (error) {
      console.error('Error al mostrar detalles:', error);
    }
  }
}