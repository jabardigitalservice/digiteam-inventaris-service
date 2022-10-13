import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../entities/request.entity';
import { UserAccess } from '../../../common/interfaces/keycloak-user.interface';
import { Pagination } from 'src/common/interfaces/pagination.interface';
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

  async fetch(pagination: Pagination, userAccess: UserAccess) {
    const { email, isAdmin } = userAccess;

    const query = this.createQueryBuilder('request');

    if (!isAdmin) {
      query.where('request.email = :email', { email });
    }

    const count: number = await query.getCount();

    query.take(pagination.limit);
    query.skip(pagination.offset);

    const result = await query.getMany();

    return {
      result,
      count,
    };
  }

  async findById(id: string): Promise<Request> {
    const result = await this.findOneBy({ id });
    return result;
  }

  async setStatusById(id: string, status: number) {
    await this.update(id, { status });
  }
}
