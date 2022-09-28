import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
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

  async fetchAll(offset: number, limit: number) {
    const query = this.createQueryBuilder('request');

    const count: number = await query.getCount();

    query.take(limit);
    query.skip(offset);

    const result = await query.getMany();

    return {
      result,
      count,
    };
  }
}
