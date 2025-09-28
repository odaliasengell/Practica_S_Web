import { Restaurant } from '../../domain/entities/Restaurant.js';
import { RestaurantService } from '../services/RestaurantService.js';

/**
 * Caso de Uso: Obtener Restaurante por ID
 * Implementa la lógica para buscar un restaurante específico
 */
export class GetRestaurantByIdUseCase {
  private service: RestaurantService;

  constructor(service: RestaurantService) {
    this.service = service;
  }

  /**
   * Ejecuta el caso de uso
   * @param id - Identificador único del restaurante
   * @returns Promise con el restaurante encontrado o undefined
   */
  async execute(id: string): Promise<Restaurant | undefined> {
    console.log('\n═══════════════════════════════════════');
    console.log('🔍 CASO DE USO: Obtener Restaurante por ID');
    console.log('═══════════════════════════════════════');
    console.log(`   ID buscado: ${id}`);

    try {
      const restaurant = await this.service.getRestaurantById(id);
      
      if (restaurant) {
        console.log('\n✅ RESULTADO: Restaurante encontrado');
      } else {
        console.log('\n⚠️  RESULTADO: Restaurante no encontrado');
      }
      
      return restaurant;
    } catch (error) {
      console.error('\n❌ ERROR en caso de uso:', error);
      throw error;
    }
  }

  /**
   * Ejecuta y muestra resultados detallados
   */
  async executeWithDetails(id: string): Promise<void> {
    try {
      const restaurant = await this.execute(id);
      
      if (!restaurant) {
        console.log('\n❌ No hay detalles para mostrar');
        return;
      }

      console.log('\n📝 DETALLES COMPLETOS:');
      console.log('═════════════════════════════════════════════════');
      console.log(`🏪 NOMBRE: ${restaurant.name}`);
      console.log(`\n📖 DESCRIPCIÓN:\n   ${restaurant.description}`);
      console.log(`\n🍽️  TIPO DE COCINA: ${restaurant.cuisine.join(', ')}`);
      console.log(`\n📍 UBICACIÓN:`);
      console.log(`   Dirección: ${restaurant.location.address}`);
      console.log(`   Sector: ${restaurant.location.sector}`);
      console.log(`   Ciudad: ${restaurant.location.city}`);
      console.log(`\n💵 PRECIO:`);
      console.log(`   Rango: ${restaurant.price.range}`);
      console.log(`   Promedio: $${restaurant.price.averagePrice} ${restaurant.price.currency}`);
      console.log(`\n⭐ CALIFICACIÓN:`);
      console.log(`   Puntuación: ${restaurant.rating.score}/5`);
      console.log(`   Estrellas: ${restaurant.rating.stars}`);
      console.log(`   Total Reseñas: ${restaurant.rating.totalReviews}`);
      console.log(`   Calidad: ${restaurant.rating.quality}`);
      console.log(`\n📞 CONTACTO:`);
      console.log(`   Teléfono: ${restaurant.phone}`);
      console.log(`   Email: ${restaurant.email}`);
      console.log(`\n🕐 HORARIO: ${restaurant.openingHours}`);
      console.log(`\n👥 CAPACIDAD: ${restaurant.capacity} personas`);
      console.log(`\n📊 ESTADO: ${restaurant.isActive ? '✅ Activo' : '❌ Inactivo'}`);
      console.log(`\n📅 FECHAS:`);
      console.log(`   Creado: ${restaurant.createdAt.toLocaleString('es-EC')}`);
      console.log(`   Actualizado: ${restaurant.updatedAt.toLocaleString('es-EC')}`);
      console.log('═════════════════════════════════════════════════\n');
      
    } catch (error) {
      console.error('Error al mostrar detalles:', error);
    }
  }
}