import { Injectable } from '@nestjs/common';
import { RequestsRepository } from '../respositories/requests.repository';
import { mapEntitytoInterface } from '../interfaces/response.interface';
import {
  metaPagination,
  queryPagination,
} from '../../../common/helpers/pagination';
import { ApiResponse } from '../../../common/interfaces/api-response.interface';
import { UserAccess } from '../../../common/interfaces/keycloak-user.interface';
import {
  CreateRequestBody,
  ChangeStatusBody,
} from '../interfaces/request.interface';
import { QueryPagination } from '../../../common/interfaces/pagination.interface';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  async createNewRequest(
    createRequestBody: CreateRequestBody,
    userAccess: UserAccess,
  ) {
    this.repo.store({
      email: userAccess.email,
      username: userAccess.name,
      division: createRequestBody.division,
      phoneNumber: createRequestBody.phone_number,
      requestType: createRequestBody.request_type,
      itemName: createRequestBody.item_name,
      purpose: createRequestBody.purpose,
      priority: createRequestBody.priority,
    });
  }

  async getAllRequests(queryRequest: QueryPagination, userAccess: UserAccess) {
    const pagination = queryPagination(queryRequest);
    const { result, count } = await this.repo.fetchAll(pagination, userAccess);

    const data = result.map((requests) => mapEntitytoInterface(requests));
    const meta = metaPagination(count, result, pagination);

    const apiResponse: ApiResponse = {
      data,
      meta,
    };

    return apiResponse;
  }

  async getRequestById(id: string) {
    const result = await this.repo.fetchById(id);
    const data = mapEntitytoInterface(result);

    const apiResponse: ApiResponse = { data };
    return apiResponse;
  }

  async changeStatus(changeStatus: ChangeStatusBody, id: string) {
    const status = changeStatus.status;
    await this.repo.setStatusById(id, status);
  }
}
