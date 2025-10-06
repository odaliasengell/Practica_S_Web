import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tour } from "./Tour";

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  clienteNombre!: string;

  @Column()
  clienteEmail!: string;

  @Column("int")
  cantidadPersonas!: number;

  @Column({ type: "datetime" })
  fechaReserva!: Date;

  @ManyToOne(() => Tour, (tour) => tour.reservas, { nullable: false })
  tour!: Tour;
}
