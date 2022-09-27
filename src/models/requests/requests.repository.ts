import { Repository } from 'typeorm';
import { Requests } from './entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class RequestsRepository extends Repository<Requests> {
  constructor(
    @InjectRepository(Requests)
    repository: Repository<Requests>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createNewRequest(newRequest: Requests) {
    const request = this.create({
      ...newRequest,
    });

    return this.save(request);
  }
  async getAllRequests() {
    return this.find();
  }
}
