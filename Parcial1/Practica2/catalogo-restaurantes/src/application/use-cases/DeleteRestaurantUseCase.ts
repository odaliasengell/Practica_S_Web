import { RestaurantService } from '../services/RestaurantService.js';

/**
 * Caso de Uso: Eliminar Restaurante
 * Implementa la lógica para eliminar un restaurante usando ASYNC/AWAIT
 */
export class DeleteRestaurantUseCase {
  private service: RestaurantService;

  constructor(service: RestaurantService) {
    this.service = service;
  }

  /**
   * Ejecuta el caso de uso con async/await
   * @param id - Identificador del restaurante a eliminar
   * @returns Promise<boolean> - true si se eliminó, false si no existe
   */
  async execute(id: string): Promise<boolean> {
    console.log('\n═══════════════════════════════════════');
    console.log('🗑️  CASO DE USO: Eliminar Restaurante');
    console.log('═══════════════════════════════════════');
    console.log(`   ID a eliminar: ${id}`);

    try {
      const deleted = await this.service.deleteRestaurant(id);
      
      if (deleted) {
        console.log('\n✅ RESULTADO: Restaurante eliminado exitosamente');
      } else {
        console.log('\n⚠️  RESULTADO: No se pudo eliminar (restaurante no existe)');
      }
      
      return deleted;
      
    } catch (error) {
      console.error('\n❌ ERROR en caso de uso:', error);
      throw error;
    }
  }

  /**
   * Ejecuta con confirmación y muestra detalles del restaurante eliminado
   */
  async executeWithConfirmation(id: string): Promise<boolean> {
    try {
      // Obtener información del restaurante antes de eliminar
      console.log('\n🔍 Buscando información del restaurante...');
      const restaurant = await this.service.getRestaurantById(id);
      
      if (!restaurant) {
        console.log('\n❌ Restaurante no encontrado');
        return false;
      }

      console.log('\n📝 INFORMACIÓN DEL RESTAURANTE A ELIMINAR:');
      console.log('─────────────────────────────────────────');
      console.log(`   Nombre: ${restaurant.name}`);
      console.log(`   Cocina: ${restaurant.cuisine.join(', ')}`);
      console.log(`   Ubicación: ${restaurant.location.fullAddress}`);
      console.log(`   Teléfono: ${restaurant.phone}`);
      console.log(`   Rating: ${restaurant.rating.score}/5 (${restaurant.rating.totalReviews} reseñas)`);
      console.log('─────────────────────────────────────────');

      // Proceder con la eliminación
      console.log('\n⚠️  Procediendo con la eliminación...');
      const deleted = await this.execute(id);

      if (deleted) {
        console.log('\n✅ El restaurante ha sido eliminado permanentemente');
        console.log(`   Restaurante: ${restaurant.name}`);
        console.log(`   Eliminado: ${new Date().toLocaleString('es-EC')}`);
      }

      return deleted;
      
    } catch (error) {
      console.error('Error al eliminar con confirmación:', error);
      throw error;
    }
  }

  /**
   * Elimina múltiples restaurantes
   */
  async executeMultiple(ids: string[]): Promise<{
    deleted: number;
    failed: number;
    results: Array<{ id: string; success: boolean; error?: string }>;
  }> {
    console.log('\n═══════════════════════════════════════');
    console.log('🗑️  CASO DE USO: Eliminar Múltiples Restaurantes');
    console.log('═══════════════════════════════════════');
    console.log(`   Total a eliminar: ${ids.length}`);

    let deleted = 0;
    let failed = 0;
    const results: Array<{ id: string; success: boolean; error?: string }> = [];

    for (const id of ids) {
      try {
        console.log(`\n   Eliminando restaurante ${id}...`);
        const success = await this.service.deleteRestaurant(id);
        
        if (success) {
          deleted++;
          results.push({ id, success: true });
          console.log(`   ✅ Eliminado exitosamente`);
        } else {
          failed++;
          results.push({ id, success: false, error: 'No encontrado' });
          console.log(`   ⚠️  No encontrado`);
        }
        
      } catch (error) {
        failed++;
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        results.push({ id, success: false, error: errorMessage });
        console.log(`   ❌ Error: ${errorMessage}`);
      }
    }

    console.log('\n📊 RESUMEN DE ELIMINACIÓN:');
    console.log('─────────────────────────────────────────');
    console.log(`   ✅ Eliminados: ${deleted}`);
    console.log(`   ❌ Fallidos: ${failed}`);
    console.log(`   📋 Total procesados: ${ids.length}`);
    console.log('─────────────────────────────────────────\n');

    return { deleted, failed, results };
  }

  /**
   * Verifica si un restaurante existe antes de intentar eliminarlo
   */
  async safeDelete(id: string): Promise<boolean> {
    try {
      const restaurant = await this.service.getRestaurantById(id);
      
      if (!restaurant) {
        console.log(`\n⚠️  No se puede eliminar: Restaurante con ID ${id} no existe`);
        return false;
      }

      return await this.execute(id);
      
    } catch (error) {
      console.error('Error en eliminación segura:', error);
      return false;
    }
  }
}