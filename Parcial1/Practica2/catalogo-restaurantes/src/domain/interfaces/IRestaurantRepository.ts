import { Restaurant } from '../entities/Restaurant.js';

/**
 * Interfaz del Repositorio de Restaurantes
 * Define el contrato para operaciones CRUD con diferentes paradigmas asíncronos
 */

// Tipo para callbacks con patrón (error, resultado)
export type RestaurantCallback = (error: Error | null, result?: Restaurant) => void;

export interface IRestaurantRepository {
  /**
   * CREATE - Usando CALLBACKS
   * Inserta un nuevo restaurante en el repositorio
   * @param restaurant - Restaurante a insertar
   * @param callback - Función callback (error, resultado)
   */
  create(restaurant: Restaurant, callback: RestaurantCallback): void;

  /**
   * READ - Usando ASYNC/AWAIT
   * Obtiene todos los restaurantes
   * @returns Promise con array de restaurantes
   */
  findAll(): Promise<Restaurant[]>;

  /**
   * READ - Usando ASYNC/AWAIT
   * Busca un restaurante por su ID
   * @param id - Identificador único del restaurante
   * @returns Promise con el restaurante encontrado o undefined
   */
  findById(id: string): Promise<Restaurant | undefined>;

  /**
   * READ - Usando ASYNC/AWAIT
   * Busca restaurantes por tipo de cocina
   * @param cuisine - Tipo de cocina a buscar
   * @returns Promise con array de restaurantes
   */
  findByCuisine(cuisine: string): Promise<Restaurant[]>;

  /**
   * READ - Usando ASYNC/AWAIT
   * Busca restaurantes por sector
   * @param sector - Sector de Manta
   * @returns Promise con array de restaurantes
   */
  findBySector(sector: string): Promise<Restaurant[]>;

  /**
   * UPDATE - Usando PROMISES
   * Actualiza un restaurante existente
   * @param id - Identificador del restaurante
   * @param updates - Datos parciales a actualizar
   * @returns Promise con el restaurante actualizado
   */
  update(id: string, updates: Partial<Restaurant>): Promise<Restaurant>;

  /**
   * DELETE - Usando ASYNC/AWAIT
   * Elimina un restaurante del repositorio
   * @param id - Identificador del restaurante
   * @returns Promise<boolean> - true si se eliminó, false si no existe
   */
  delete(id: string): Promise<boolean>;

  /**
   * Método auxiliar para obtener el conteo de restaurantes
   * @returns Promise con el número total de restaurantes
   */
  count(): Promise<number>;

  /**
   * Método auxiliar para verificar si existe un restaurante
   * @param id - Identificador del restaurante
   * @returns Promise<boolean>
   */
  exists(id: string): Promise<boolean>;
}