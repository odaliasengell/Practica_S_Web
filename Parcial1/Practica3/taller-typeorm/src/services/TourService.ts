import { AppDataSource } from "../data-source";
import { Tour } from "../entities/Tour";

export class TourService {
  private repo = AppDataSource.getRepository(Tour);

  async create(data: Partial<Tour>): Promise<Tour> {
    const e = this.repo.create(data);
    return this.repo.save(e) as Promise<Tour>;
  }

  async findAll(): Promise<Tour[]> {
    return this.repo.find({ relations: ["guia", "reservas"] });
  }

  async findOne(id: number): Promise<Tour | null> {
    return this.repo.findOne({ where: { id }, relations: ["guia", "reservas"] });
  }

  async update(id: number, data: Partial<Tour>): Promise<Tour | null> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
