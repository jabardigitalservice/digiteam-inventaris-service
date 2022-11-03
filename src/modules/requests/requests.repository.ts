import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { FindAll, Update } from './requests.interface';
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
    const criteria: Record<string, any> = {};

    if (findAll.request_type)
      criteria.request_type = Number(findAll.request_type);

    if (findAll.division) criteria.division = findAll.division;

    if (findAll.status) criteria.status = Number(findAll.status);

    if (isAdmin) criteria.email = email;

    const order: Record<string, any> = {};

    if (!findAll.sort) findAll.sort = 'asc';

    if (findAll.sort_by) {
      order[findAll.sort_by] = findAll.sort;
    }

    order['created_at'] = 'desc';

    const options = {
      where: criteria,
      take: pagination.limit,
      skip: pagination.offset,
      order: order,
    };

    const result = await this.request.find(options);

    const total = await this.request.count({ where: criteria });

    return {
      result,
      total,
    };
  }

  async findById(id: string) {
    const result = await this.request.findOneBy({ id });
    return result;
  }

  update(id: string, update: Update) {
    return this.request.update(id, update);
  }
}
