import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import {
  FindAll,
  UpdateFilename,
  UpdateItem,
  UpdateNotes,
} from './requests.interface';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { UserAccess } from 'src/common/interfaces/keycloak-user.interface';
export class RequestsRepository {
  constructor(
    @InjectRepository(Request)
    private request: Repository<Request>,
  ) {}

  store(newRequest: Request) {
    const request = this.request.create(newRequest);
    this.request.save(request);
  }

  async findAll(
    findAll: FindAll,
    pagination: Pagination,
    userAccess: UserAccess,
  ) {
    const { email, isAdmin } = userAccess;
    const condition: Record<string, any> = {};
    const order: Record<string, any> = {};

    if (!isAdmin) condition.email = email;

    order['created_at'] = 'desc';

    if (findAll.sort_by) {
      order[findAll.sort_by] = findAll.sort;
    }

    const options = {
      where: condition,
      take: pagination.limit,
      skip: pagination.offset,
      order: order,
    };

    const result = await this.request.find(options);

    const total = await this.request.count({ where: condition });

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
