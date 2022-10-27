import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import { Pagination } from '../../common/interfaces/pagination.interface';
import { UpdateFilename, UpdateItem } from './requests.interface';
export class RequestsRepository {
  constructor(
    @InjectRepository(Request)
    private request: Repository<Request>,
  ) {}

  store(newRequest: Request) {
    const request = this.request.create(newRequest);
    return this.request.save(request);
  }

  async findAll(pagination: Pagination, userAccess: UserAccess) {
    const { email, isAdmin } = userAccess;
    const condition: Record<string, any> = {};
    if (!isAdmin) condition.email = email;

    const result = await this.request.find({
      where: condition,
      take: pagination.limit,
      skip: pagination.offset,
    });

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
}
