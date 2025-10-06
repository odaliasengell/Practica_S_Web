import "reflect-metadata";
import { DataSource } from "typeorm";
import { Guia } from "./entities/Guia";
import { Tour } from "./entities/Tour";
import { Reserva } from "./entities/Reserva";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Guia, Tour, Reserva],
});
