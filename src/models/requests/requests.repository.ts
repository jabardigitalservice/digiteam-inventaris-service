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

  async createNewRequest(newRequest: Request) {
    const request = this.create({
      ...newRequest,
    });

    return this.save(request);
  }
  async getAllRequests() {
    return this.find();
  }
}
