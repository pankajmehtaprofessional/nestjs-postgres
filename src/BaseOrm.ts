import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseOrm<T> {
  constructor(private readonly model: any) {}

  async create(createDto: any): Promise<any> {
    return this.model.create(createDto);
  }

  async findOne(id: string, options?: Record<string, unknown>): Promise<T> {
    return this.model.findByPk(id, options);
  }

  async findAll(options?: Record<string, unknown>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async update(id: string, updateDto: any): Promise<any> {
    const entity: any = await this.findOne(id);
    if (entity) {
      return entity.update(updateDto);
    }
    return null;
  }

  async remove(id: string): Promise<void> {
    const entity: any = await this.findOne(id);
    if (entity) {
      await entity.destroy();
    }
  }
}
