import { AppDataSource } from "../data-source";
import { Reserva } from "../entities/Reserva";

export class ReservaService {
  private repo = AppDataSource.getRepository(Reserva);

  async create(data: Partial<Reserva>): Promise<Reserva> {
    const e = this.repo.create(data);
    return this.repo.save(e) as Promise<Reserva>;
  }

  async findAll(): Promise<Reserva[]> {
    return this.repo.find({ relations: ["tour"] });
  }

  async findOne(id: number): Promise<Reserva | null> {
    return this.repo.findOne({ where: { id }, relations: ["tour"] });
  }

  async update(id: number, data: Partial<Reserva>): Promise<Reserva | null> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
