import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import {
  metaPagination,
  queryPagination,
} from '../../common/helpers/pagination';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import { Create, Update, FindAll } from './requests.interface';
import { Request } from 'src/entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  async store(create: Create, userAccess: UserAccess) {
    const request: Request = await this.repo.store({
      email: userAccess.email,
      username: userAccess.name,
      division: create.division,
      phone_number: create.phone_number,
      request_type: create.request_type,
      requested_item: create.requested_item,
      purpose: create.purpose,
      priority: create.priority,
      replacement_evidence: create.replacement_evidence,
    });

    return request;
  }

  async findAll(queryParams: FindAll, userAccess: UserAccess) {
    const pagination = queryPagination({
      page: queryParams.page,
      limit: queryParams.limit,
    });

    const findAll: FindAll = {
      ...queryParams,
      ...pagination,
    };

    const { result, total } = await this.repo.findAll(findAll, userAccess);

    const meta = metaPagination(total, result, pagination);

    return {
      data: result,
      meta,
    };
  }

  async findById(id: string) {
    const data = await this.repo.findById(id);

    if (!data) {
      throw new NotFoundException();
    }

    return { data, meta: {} };
  }

  async update(id: string, update: Update) {
    const updated = await this.repo.update(id, update);

    if (updated.affected < 1) {
      throw new NotFoundException();
    }

    return updated;
  }
}
