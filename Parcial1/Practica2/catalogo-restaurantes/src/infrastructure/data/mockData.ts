import { Restaurant } from '../../domain/entities/Restaurant.js';
import { Location } from '../../domain/value-objects/Location.js';
import { Price, PriceRange } from '../../domain/value-objects/Price.js';
import { Rating } from '../../domain/value-objects/Rating.js';

/**
 * Datos de prueba: Restaurantes de Manta
 * Incluye mínimo 10 registros realistas de restaurantes manabitas
 */

export const mockRestaurants: Restaurant[] = [
  new Restaurant(
    'El Pescador Manabita',
    'Restaurante especializado en mariscos frescos y comida típica manabita. Famoso por su ceviche de concha y corvina al ajillo. Ambiente familiar con vista al mar.',
    ['Mariscos', 'Ecuatoriana', 'Manabita'],
    new Location('Av. Malecón Escénico, junto al Puerto', 'Tarqui', 'Manta', -0.9587, -80.7089),
    new Price(PriceRange.MODERADO, 15, 'USD'),
    new Rating(4.7, 326),
    '0995431287',
    'elpescador@gmail.com',
    'Lunes a Domingo: 11:00 AM - 10:00 PM',
    80,
    'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'
  ),

  new Restaurant(
    'Pizzería Sole Mio',
    'Auténtica pizzería italiana con recetas tradicionales. Masa artesanal y horno de leña. Especialidad en pizzas napolitanas y pastas frescas hechas en casa.',
    ['Italiana', 'Pizzería', 'Pastas'],
    new Location('Calle 15 y Av. 24, Local 3', 'Los Esteros', 'Manta', -0.9653, -80.7125),
    new Price(PriceRange.MODERADO, 18, 'USD'),
    new Rating(4.5, 198),
    '0987654321',
    'solemio.manta@hotmail.com',
    'Martes a Domingo: 12:00 PM - 11:00 PM, Lunes cerrado',
    60,
    'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e'
  ),

  new Restaurant(
    'Asadero La Brasa del Sur',
    'Especialistas en carnes a la parrilla y asados argentinos. Cortes premium importados y locales. Parrilladas para compartir y churrasco especial de la casa.',
    ['Parrilla', 'Argentina', 'Carnes'],
    new Location('Av. 4 de Noviembre y Calle 103', 'Miraflores', 'Manta', -0.9621, -80.7201),
    new Price(PriceRange.COSTOSO, 28, 'USD'),
    new Rating(4.8, 412),
    '0991234567',
    'labrasa.manta@gmail.com',
    'Lunes a Domingo: 12:00 PM - 11:30 PM',
    100,
    'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f'
  ),

  new Restaurant(
    'Sushi Zen',
    'Restaurante japonés contemporáneo con sushi bar. Pescado fresco del día y técnicas tradicionales niponas. Rolls especiales y teppanyaki en vivo.',
    ['Japonesa', 'Sushi', 'Asiática'],
    new Location('Mall del Pacífico, Planta Alta, Local 205', 'La Delicia', 'Manta', -0.9589, -80.7321),
    new Price(PriceRange.COSTOSO, 32, 'USD'),
    new Rating(4.6, 267),
    '0998765432',
    'info@sushizen.ec',
    'Lunes a Domingo: 12:30 PM - 10:30 PM',
    55,
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a'
  ),

  new Restaurant(
    'Cafetería Dulce Aroma',
    'Cafetería boutique con café de altura ecuatoriano. Repostería artesanal, desayunos completos y almuerzos ejecutivos. Ambiente acogedor ideal para trabajar.',
    ['Cafetería', 'Repostería', 'Desayunos'],
    new Location('Av. Flavio Reyes entre Calle 12 y 13', 'Jocay', 'Manta', -0.9534, -80.7187),
    new Price(PriceRange.ECONOMICO, 8, 'USD'),
    new Rating(4.4, 523),
    '0993456789',
    'dulcearoma.manta@outlook.com',
    'Lunes a Sábado: 7:00 AM - 8:00 PM, Domingo: 8:00 AM - 6:00 PM',
    40,
    'e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b'
  ),

  new Restaurant(
    'Sabor Criollo',
    'Comida criolla ecuatoriana auténtica. Seco de chivo, guatita, fritada y hornado los fines de semana. Porciones generosas y sazón de abuela.',
    ['Ecuatoriana', 'Criolla', 'Tradicional'],
    new Location('Av. 105 entre Calle 101 y 102', 'El Palmar', 'Manta', -0.9701, -80.7098),
    new Price(PriceRange.ECONOMICO, 7, 'USD'),
    new Rating(4.3, 645),
    '0996543210',
    'saborcriollo@yahoo.com',
    'Lunes a Domingo: 10:00 AM - 9:00 PM',
    70,
    'f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c'
  ),

  new Restaurant(
    'Tacos y Más',
    'Comida mexicana auténtica con chef oriundo de Guadalajara. Tacos al pastor, burritos, quesadillas y nachos especiales. Margaritas y cervezas importadas.',
    ['Mexicana', 'Tacos', 'Tex-Mex'],
    new Location('Centro Comercial El Paseo, Local 18', 'Barbasquillo', 'Manta', -0.9445, -80.7234),
    new Price(PriceRange.MODERADO, 14, 'USD'),
    new Rating(4.5, 389),
    '0994567890',
    'tacosymas.manta@gmail.com',
    'Martes a Domingo: 1:00 PM - 11:00 PM, Lunes cerrado',
    65,
    'a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d'
  ),

  new Restaurant(
    'La Parrilla del Mar',
    'Combinación única de mariscos a la parrilla y carnes selectas. Vista panorámica al océano. Especialidad en langostinos gigantes y pulpo al carbón.',
    ['Mariscos', 'Parrilla', 'Fusión'],
    new Location('Malecón de Murciélago, sector norte', 'Murciélago', 'Manta', -0.9512, -80.7345),
    new Price(PriceRange.COSTOSO, 35, 'USD'),
    new Rating(4.9, 178),
    '0997654321',
    'parrillamar@hotmail.com',
    'Miércoles a Domingo: 12:00 PM - 10:00 PM, Lunes y Martes cerrado',
    90,
    'b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e'
  ),

  new Restaurant(
    'Vegetariano Vida Sana',
    'Restaurante 100% vegetariano y vegano. Bowls nutritivos, smoothies naturales, hamburguesas vegetales y postres sin azúcar refinada. Ingredientes orgánicos locales.',
    ['Vegetariana', 'Vegana', 'Saludable'],
    new Location('Av. 24 entre Calle 20 y 21', 'Los Esteros', 'Manta', -0.9678, -80.7156),
    new Price(PriceRange.MODERADO, 12, 'USD'),
    new Rating(4.2, 234),
    '0995678901',
    'vidasana.manta@gmail.com',
    'Lunes a Sábado: 9:00 AM - 7:00 PM, Domingo cerrado',
    45,
    'c9d0e1f2-a3b4-2c3d-6e7f-8a9b0c1d2e3f'
  ),

  new Restaurant(
    'Chifa Dragón Dorado',
    'Comida china-ecuatoriana con más de 20 años de tradición. Chaulafán especial, chop suey, pollo agridulce y wantanes crujientes. Menú ejecutivo al mediodía.',
    ['China', 'Chifa', 'Asiática'],
    new Location('Av. 113 y Calle 109', 'La Pradera', 'Manta', -0.9734, -80.7023),
    new Price(PriceRange.ECONOMICO, 9, 'USD'),
    new Rating(4.4, 567),
    '0992345678',
    'dragondorado@yahoo.com',
    'Lunes a Domingo: 11:00 AM - 10:00 PM',
    75,
    'd0e1f2a3-b4c5-3d4e-7f8a-9b0c1d2e3f4a'
  ),

  new Restaurant(
    'Mar y Tierra Gourmet',
    'Alta cocina ecuatoriana contemporánea. Menú degustación de autor que fusiona productos locales con técnicas modernas. Reservación recomendada.',
    ['Gourmet', 'Fusión', 'Alta Cocina'],
    new Location('Urbanización Isla Bonita, Calle Principal', 'Santa Marianita', 'Manta', -0.9234, -80.7412),
    new Price(PriceRange.MUY_COSTOSO, 65, 'USD'),
    new Rating(4.8, 142),
    '0999876543',
    'marytierra.reservas@gmail.com',
    'Jueves a Sábado: 7:00 PM - 11:00 PM, Resto de semana cerrado',
    35,
    'e1f2a3b4-c5d6-4e5f-8a9b-0c1d2e3f4a5b'
  ),

  new Restaurant(
    'Alitas Picantes Express',
    'Especialistas en alitas de pollo con 15 salsas diferentes. Buffalo wings, boneless, papas fritas y aros de cebolla. Ideal para ver deportes y compartir.',
    ['Comida Rápida', 'Alitas', 'Americana'],
    new Location('Av. 4 de Noviembre, frente al Parque Central', 'Miraflores', 'Manta', -0.9598, -80.7189),
    new Price(PriceRange.ECONOMICO, 10, 'USD'),
    new Rating(4.1, 789),
    '0990123456',
    'alitaspicantes@hotmail.com',
    'Lunes a Domingo: 2:00 PM - 12:00 AM',
    50,
    'f2a3b4c5-d6e7-5f6a-9b0c-1d2e3f4a5b6c'
  )
];

/**
 * Función auxiliar para obtener los datos mock
 */
export function getMockRestaurants(): Restaurant[] {
  return [...mockRestaurants];
}

/**
 * Función para buscar un restaurante por ID en los datos mock
 */
export function findMockRestaurantById(id: string): Restaurant | undefined {
  return mockRestaurants.find(restaurant => restaurant.id === id);
}