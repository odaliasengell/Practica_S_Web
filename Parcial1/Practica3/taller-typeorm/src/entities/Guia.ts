import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tour } from "./Tour";

@Entity()
export class Guia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  telefono!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: true })
  activo!: boolean;

  @OneToMany(() => Tour, (tour) => tour.guia)
  tours?: Tour[];
}
