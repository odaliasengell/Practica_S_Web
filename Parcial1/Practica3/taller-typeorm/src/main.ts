import { AppDataSource } from "./data-source";
import { GuiaService } from "./services/GuiaService";
import { TourService } from "./services/TourService";
import { ReservaService } from "./services/ReservaService";

async function main() {
  await AppDataSource.initialize();
  console.log("DataSource initialized");

  const guiaService = new GuiaService();
  const tourService = new TourService();
  const reservaService = new ReservaService();

  // Seed
  const guia = await guiaService.create({ nombre: "Carlos Perez", telefono: "099999999", email: "carlos@example.com" });
  const tour1 = await tourService.create({ titulo: "City Tour", descripcion: "Recorrido por la ciudad", precio: 15.5, fecha: new Date(), guia });
  const tour2 = await tourService.create({ titulo: "Mountain Hike", descripcion: "Caminata en la montaña", precio: 30.0, fecha: new Date(), guia });

  const reserva1 = await reservaService.create({ clienteNombre: "Ana", clienteEmail: "ana@mail.com", cantidadPersonas: 2, fechaReserva: new Date(), tour: tour1 as any });
  const reserva2 = await reservaService.create({ clienteNombre: "Luis", clienteEmail: "luis@mail.com", cantidadPersonas: 4, fechaReserva: new Date(), tour: tour2 as any });

  console.log("Seed completed");

  // Pruebas CRUD
  const guias = await guiaService.findAll();
  console.log("Guias:", guias);

  const tours = await tourService.findAll();
  console.log("Tours:", tours);

  const reservas = await reservaService.findAll();
  console.log("Reservas:", reservas);

  // update
  if (guia && typeof guia.id === 'number') {
    await guiaService.update(guia.id, { telefono: "098888888" });
    console.log("Guia actualizado:", await guiaService.findOne(guia.id));
  }

  // remove
  if (reserva1 && typeof (reserva1 as any).id === 'number') {
    await reservaService.remove((reserva1 as any).id);
  }
  console.log("Reservas después de eliminar una:", await reservaService.findAll());

  await AppDataSource.destroy();
}

main().catch((err) => {
  console.error(err);
});
