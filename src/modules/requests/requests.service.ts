import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import {
  metaPagination,
  queryPagination,
} from '../../common/helpers/pagination';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import {
  CreateRequestBody,
  ChangeStatusBody,
  UpdateRequestItemBody,
} from './requests.interface';
import { QueryPagination } from '../../common/interfaces/pagination.interface';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  async store(createRequestBody: CreateRequestBody, userAccess: UserAccess) {
    await this.repo.store({
      email: userAccess.email,
      username: userAccess.name,
      division: createRequestBody.division,
      phone_number: createRequestBody.phone_number,
      request_type: createRequestBody.request_type,
      item_name: createRequestBody.item_name,
      purpose: createRequestBody.purpose,
      priority: createRequestBody.priority,
    });
  }

  async findAll(queryRequest: QueryPagination, userAccess: UserAccess) {
    const pagination = queryPagination(queryRequest);
    const { result, total } = await this.repo.findAll(pagination, userAccess);

    const meta = metaPagination(total, result, pagination);

    return {
      data: result,
      meta,
    };
  }

  async findById(id: string) {
    const data = await this.repo.findById(id);

    return { data, meta: {} };
  }

  async updateStatus(changeStatus: ChangeStatusBody, id: string) {
    const status = changeStatus.status;
    await this.repo.setStatusById(id, status);
  }

  async updateItem(updateRequestItemBody: UpdateRequestItemBody, id: string) {
    const available_item_name = updateRequestItemBody.available_item_name;
    await this.repo.updateAvailableItem(id, available_item_name);
  }
}
