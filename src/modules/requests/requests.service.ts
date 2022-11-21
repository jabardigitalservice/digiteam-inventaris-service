import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import {
  metaPagination,
  queryPagination,
} from '../../common/helpers/pagination';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import { Create, Update, FindAll } from './requests.interface';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  store(create: Create, userAccess: UserAccess) {
    this.repo.store({
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

  update(id: string, update: Update) {
    this.repo.update(id, update);
  }
}
