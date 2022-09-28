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

  async fetchAll(page: number, limit: number): Promise<Request[]> {
    const result = this.createQueryBuilder('request');

    const skip = (page - 1) * limit;
    result.take(limit);
    result.skip(skip);

    const requests = await result.getMany();

    return requests;
  }
}
