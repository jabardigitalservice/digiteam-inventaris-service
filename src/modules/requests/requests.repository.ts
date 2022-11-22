import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { FindAll, Update } from './requests.interface';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';

export class RequestsRepository {
  constructor(
    @InjectRepository(Request)
    private request: Repository<Request>,
  ) {}

  store(newRequest: Request) {
    const request = this.request.create(newRequest);
    this.request.save(request);
  }

  private setFilter(findAll: FindAll, userAccess: UserAccess) {
    const where: Record<string, any> = {};
    const { email, isAdmin } = userAccess;

    if (!isAdmin) where.email = email;
    if (findAll.request_type) where.request_type = Number(findAll.request_type);
    if (findAll.division) where.division = findAll.division;
    if (findAll.status) where.status = Number(findAll.status);

    return where;
  }

  private setOrder(findAll: FindAll) {
    if (!findAll.sort_by) findAll.sort_by = 'created_at';

    if (!findAll.sort) findAll.sort = 'desc';

    return {
      [findAll.sort_by]: findAll.sort,
    };
  }

  private setSearch(findAll: FindAll, filter: Object) {
    const search: Array<Record<string, any>> = [];
    const keyword = findAll.q;

    search.push({ ...filter, username: Like(`%${keyword}%`) });
    search.push({ ...filter, phone_number: Like(`%${keyword}%`) });

    return search;
  }

  async findAll(findAll: FindAll, userAccess: UserAccess) {
    const filter = this.setFilter(findAll, userAccess);
    const order = this.setOrder(findAll);
    const withSearch = this.setSearch(findAll, filter);

    const where = findAll.q ? withSearch : filter;

    const options = {
      where: where,
      take: findAll.limit,
      skip: findAll.offset,
      order: order,
    };

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

  async update(id: string, update: Update) {
    return this.request.update(id, update);
  }
}
