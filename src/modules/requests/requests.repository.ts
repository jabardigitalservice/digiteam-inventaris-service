import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { UpdateRequestItemBody } from './requests.interface';
export class RequestsRepository {
  constructor(
    @InjectRepository(Request)
    private request: Repository<Request>,
  ) {}

  async store(newRequest: Request) {
    const request = this.request.create(newRequest);
    await this.request.save(request);
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

  async updateStatus(id: string, status: number) {
    await this.request.update(id, { status });
  }

  async updateItem(id: string, updateRequestItemBody: UpdateRequestItemBody) {
    await this.request.update(id, updateRequestItemBody);
  }
}
