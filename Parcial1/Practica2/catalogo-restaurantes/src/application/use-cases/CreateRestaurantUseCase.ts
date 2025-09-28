import { Restaurant } from '../../domain/entities/Restaurant.js';
import { RestaurantService } from '../services/RestaurantService.js';

/**
 * Caso de Uso: Crear Restaurante
 * Implementa la lógica para crear un nuevo restaurante usando CALLBACKS
 */
export class CreateRestaurantUseCase {
  private service: RestaurantService;

  constructor(service: RestaurantService) {
    this.service = service;
  }

  /**
   * Ejecuta el caso de uso con callback
   * @param restaurant - Restaurante a crear
   * @param callback - Función callback para manejar resultado
   */
  execute(
    restaurant: Restaurant,
    callback: (error: Error | null, result?: Restaurant) => void
  ): void {
    console.log('\n═══════════════════════════════════════');
    console.log('🏗️  CASO DE USO: Crear Nuevo Restaurante');
    console.log('═══════════════════════════════════════');
    console.log(`   Nombre: ${restaurant.name}`);
    console.log(`   Cocina: ${restaurant.cuisine.join(', ')}`);
    console.log(`   Sector: ${restaurant.location.sector}`);

    this.service.createRestaurant(restaurant, (error, result) => {
      if (error) {
        console.error('\n❌ ERROR en caso de uso:', error.message);
        callback(error);
      } else if (result) {
        console.log('\n✅ RESULTADO: Restaurante creado exitosamente');
        console.log(`   ID generado: ${result.id}`);
        callback(null, result);
      }
    });
  }

  /**
   * Versión Promise del caso de uso para mejor manejo
   */
  executeAsync(restaurant: Restaurant): Promise<Restaurant> {
    return new Promise((resolve, reject) => {
      this.execute(restaurant, (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        }
      });
    });
  }

  /**
   * Ejecuta y muestra resultados detallados
   */
  async executeWithDetails(restaurant: Restaurant): Promise<void> {
    try {
      const created = await this.executeAsync(restaurant);
      
      console.log('\n📝 DETALLES DEL RESTAURANTE CREADO:');
      console.log('─────────────────────────────────────────');
      console.log(`   ID: ${created.id}`);
      console.log(`   Nombre: ${created.name}`);
      console.log(`   Ubicación: ${created.location.fullAddress}`);
      console.log(`   Teléfono: ${created.phone}`);
      console.log(`   Email: ${created.email}`);
      console.log(`   Precio Promedio: $${created.price.averagePrice}`);
      console.log(`   Rating: ${created.rating.score}/5`);
      console.log(`   Creado: ${created.createdAt.toLocaleString('es-EC')}`);
      console.log('─────────────────────────────────────────\n');
      
    } catch (error) {
      console.error('Error al crear y mostrar detalles:', error);
      throw error;
    }
  }
}
