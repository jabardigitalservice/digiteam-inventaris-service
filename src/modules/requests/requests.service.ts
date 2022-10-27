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
  UpdateFilePathBody,
} from './requests.interface';
import { QueryPagination } from '../../common/interfaces/pagination.interface';
import { status } from '../../common/helpers/status';

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
      requested_item: createRequestBody.item_name,
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

  async updateStatus(id: string, changeStatus: ChangeStatusBody) {
    const status = changeStatus.status;
    await this.repo.updateStatus(id, status);
  }

  async updateFilePath(id: string, filename: string) {
    const updated: UpdateFilePathBody = {
      filename,
      status: status.APPROVED,
    };

    await this.repo.updateFilePath(id, updated);
  }

  async updateItem(id: string, updateRequestItemBody: UpdateRequestItemBody) {
    const updated = {
      ...updateRequestItemBody,
      status: status.REQUESTED,
    };

    await this.repo.updateItem(id, updated);
  }
}
