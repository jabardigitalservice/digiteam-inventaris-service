import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { FindAll, Update } from './requests.interface';

export class RequestsRepository {
  constructor(
    @InjectRepository(Request)
    private request: Repository<Request>,
  ) {}

  store(newRequest: Request) {
    const request = this.request.create(newRequest);
    this.request.save(request);
  }

  private setFilter(findAll: FindAll) {
    const where: Record<string, any> = {};

    if (!findAll.isAdmin) where.email = findAll.email;
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

  private setSearch(findAll: FindAll) {
    const search: Array<Record<string, any>> = [];
    const keyword = findAll.q;

    if (findAll.q) {
      search.push({ username: Like(`%${keyword}%`) });
      search.push({ phone_number: Like(`%${keyword}%`) });
    }

    return search;
  }

  async findAll(findAll: FindAll) {
    const filter = this.setFilter(findAll);
    const order = this.setOrder(findAll);
    const search = this.setSearch(findAll);

    const where = findAll.q ? [filter, ...search] : filter;

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

  update(id: string, update: Update) {
    return this.request.update(id, update);
  }
}
