import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { UpdateFilename, UpdateItem, UpdateNotes } from './requests.interface';
export class RequestsRepository {
  constructor(
    @InjectRepository(Request)
    private request: Repository<Request>,
  ) {}

  store(newRequest: Request) {
    const request = this.request.create(newRequest);
    this.request.save(request);
  }

  async findAll(options: any) {
    const result = await this.request.find(options);

    const total = await this.request.count({ where: options.where });

    return {
      result,
      total,
    };
  }

  async findById(id: string) {
    const result = await this.request.findOneBy({ id });
    return result;
  }

  updateStatus(id: string, status: number) {
    return this.request.update(id, { status });
  }

  updateItem(id: string, updated: UpdateItem) {
    return this.request.update(id, updated);
  }

  updateFilePath(id: string, updated: UpdateFilename) {
    return this.request.update(id, updated);
  }

  updateNotes(id: string, updated: UpdateNotes) {
    return this.request.update(id, updated);
  }
}
