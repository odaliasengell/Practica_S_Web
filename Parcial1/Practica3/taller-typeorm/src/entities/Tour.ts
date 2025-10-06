import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Guia } from "./Guia";
import { Reserva } from "./Reserva";

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column("text")
  descripcion!: string;

  @Column("decimal", { precision: 7, scale: 2 })
  precio!: number;

  @Column({ type: "datetime", nullable: true })
  fecha?: Date;

  @ManyToOne(() => Guia, (guia) => guia.tours, { nullable: false })
  guia!: Guia;

  @OneToMany(() => Reserva, (reserva) => reserva.tour)
  reservas?: Reserva[];
}
