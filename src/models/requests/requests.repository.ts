import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../common/helper/pagination.helper';
export class RequestsRepository extends Repository<Request> {
  constructor(
    @InjectRepository(Request)
    repository: Repository<Request>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async store(newRequest: Request) {
    const request = this.create(newRequest);

    return this.save(request);
  }

  async fetchAll(pagination: Pagination) {
    const query = this.createQueryBuilder('request');

    const count: number = await query.getCount();

    query.take(pagination.limit);
    query.skip(pagination.offset);

    const result = await query.getMany();

    return {
      result,
      count,
    };
  }
}
