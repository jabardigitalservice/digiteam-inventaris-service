import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import { Pagination } from 'src/common/interfaces/pagination.interface';
export class RequestsRepository {
  constructor(
    @InjectRepository(Request)
    private request: Repository<Request>,
  ) {}

  async store(newRequest: Request) {
    const request = this.request.create(newRequest);

    return this.request.save(request);
  }

  async fetch(pagination: Pagination, userAccess: UserAccess) {
    const { email, isAdmin } = userAccess;
    const condition = !isAdmin ? { email } : undefined;

    const result = this.request.find({
      where: condition,
      take: pagination.limit,
      skip: pagination.offset,
    });

    return result;
  }

  async findById(id: string): Promise<Request> {
    const result = await this.request.findOneBy({ id });
    return result;
  }

  async setStatusById(id: string, status: number) {
    await this.request.update(id, { status });
  }

  async updateAvailableItem(id: string, availableItemName: string) {
    await this.request.update(id, { availableItemName });
  }
}
