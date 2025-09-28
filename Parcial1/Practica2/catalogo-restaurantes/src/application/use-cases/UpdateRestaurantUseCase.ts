import { Restaurant } from '../../domain/entities/Restaurant.js';
import { RestaurantService } from '../services/RestaurantService.js';

/**
 * Caso de Uso: Actualizar Restaurante
 * Implementa la lógica para modificar un restaurante usando PROMISES
 */
export class UpdateRestaurantUseCase {
  private service: RestaurantService;

  constructor(service: RestaurantService) {
    this.service = service;
  }

  /**
   * Ejecuta el caso de uso con Promise
   * @param id - Identificador del restaurante
   * @param updates - Datos parciales a actualizar
   * @returns Promise con el restaurante actualizado
   */
  execute(id: string, updates: Partial<Restaurant>): Promise<Restaurant> {
    console.log('\n═══════════════════════════════════════');
    console.log('✏️  CASO DE USO: Actualizar Restaurante');
    console.log('═══════════════════════════════════════');
    console.log(`   ID: ${id}`);
    console.log(`   Campos a actualizar:`, Object.keys(updates));

    return this.service.updateRestaurant(id, updates)
      .then(restaurant => {
        console.log('\n✅ RESULTADO: Restaurante actualizado exitosamente');
        console.log(`   Nombre: ${restaurant.name}`);
        console.log(`   Última actualización: ${restaurant.updatedAt.toLocaleString('es-EC')}`);
        return restaurant;
      })
      .catch(error => {
        console.error('\n❌ ERROR en caso de uso:', error.message);
        throw error;
      });
  }

  /**
   * Ejecuta y muestra comparación antes/después
   */
  async executeWithComparison(
    id: string, 
    updates: Partial<Restaurant>
  ): Promise<void> {
    try {
      // Obtener estado anterior
      console.log('\n📋 Obteniendo estado anterior...');
      const before = await this.service.getRestaurantById(id);
      
      if (!before) {
        console.error('❌ Restaurante no encontrado');
        return;
      }

      console.log('\n📝 ESTADO ANTERIOR:');
      console.log('─────────────────────────────────────────');
      this.printRestaurantSummary(before);

      // Actualizar
      const after = await this.execute(id, updates);

      console.log('\n📝 ESTADO ACTUALIZADO:');
      console.log('─────────────────────────────────────────');
      this.printRestaurantSummary(after);

      // Mostrar cambios específicos
      console.log('\n🔄 CAMBIOS REALIZADOS:');
      console.log('─────────────────────────────────────────');
      this.printChanges(before, after);
      
    } catch (error) {
      console.error('Error al actualizar y comparar:', error);
      throw error;
    }
  }

  /**
   * Imprime resumen del restaurante
   */
  private printRestaurantSummary(restaurant: Restaurant): void {
    console.log(`   Nombre: ${restaurant.name}`);
    console.log(`   Descripción: ${restaurant.description.substring(0, 60)}...`);
    console.log(`   Cocina: ${restaurant.cuisine.join(', ')}`);
    console.log(`   Ubicación: ${restaurant.location.sector}`);
    console.log(`   Precio: ${restaurant.price.range} ($${restaurant.price.averagePrice})`);
    console.log(`   Rating: ${restaurant.rating.score}/5`);
    console.log(`   Teléfono: ${restaurant.phone}`);
    console.log(`   Email: ${restaurant.email}`);
    console.log(`   Horario: ${restaurant.openingHours}`);
    console.log(`   Capacidad: ${restaurant.capacity} personas`);
  }

  /**
   * Imprime los cambios entre dos estados
   */
  private printChanges(before: Restaurant, after: Restaurant): void {
    if (before.name !== after.name) {
      console.log(`   📝 Nombre: "${before.name}" → "${after.name}"`);
    }
    if (before.description !== after.description) {
      console.log(`   📖 Descripción: Actualizada`);
    }
    if (JSON.stringify(before.cuisine) !== JSON.stringify(after.cuisine)) {
      console.log(`   🍽️  Cocina: ${before.cuisine.join(', ')} → ${after.cuisine.join(', ')}`);
    }
    if (before.phone !== after.phone) {
      console.log(`   📞 Teléfono: ${before.phone} → ${after.phone}`);
    }
    if (before.email !== after.email) {
      console.log(`   📧 Email: ${before.email} → ${after.email}`);
    }
    if (before.price.averagePrice !== after.price.averagePrice) {
      console.log(`   💵 Precio: $${before.price.averagePrice} → $${after.price.averagePrice}`);
    }
    if (before.rating.score !== after.rating.score) {
      console.log(`   ⭐ Rating: ${before.rating.score} → ${after.rating.score}`);
    }
    if (before.capacity !== after.capacity) {
      console.log(`   👥 Capacidad: ${before.capacity} → ${after.capacity} personas`);
    }
    if (before.openingHours !== after.openingHours) {
      console.log(`   🕐 Horario: Actualizado`);
    }
  }
}