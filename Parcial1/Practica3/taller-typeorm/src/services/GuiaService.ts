import { AppDataSource } from "../data-source";
import { Guia } from "../entities/Guia";

export class GuiaService {
  private repo = AppDataSource.getRepository(Guia);

  async create(data: Partial<Guia>) {
    const e = this.repo.create(data);
    return this.repo.save(e);
  }

  async findAll() {
    return this.repo.find({ relations: ["tours"] });
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["tours"] });
  }

  async update(id: number, data: Partial<Guia>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
