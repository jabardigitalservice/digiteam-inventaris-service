import { Repository } from 'typeorm';
import { Request } from '../entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../../common/helpers/pagination';
import { UserAccess } from '../../../common/interfaces/keycloak/keycloak-user.interface';
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

  async fetchAll(pagination: Pagination, userAccess: UserAccess) {
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
}
