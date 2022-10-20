import { Request } from '../../entities/request.entity';
import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import {
  metaPagination,
  queryPagination,
} from '../../common/helpers/pagination';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import {
  CreateRequestBody,
  ChangeStatusBody,
  UpdateRequestItemBody,
  ResponseInterface,
} from './requests.interface';
import { QueryPagination } from '../../common/interfaces/pagination.interface';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  async create(createRequestBody: CreateRequestBody, userAccess: UserAccess) {
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

  async fetch(queryRequest: QueryPagination, userAccess: UserAccess) {
    const pagination = queryPagination(queryRequest);
    const result = await this.repo.fetch(pagination, userAccess);

    const data = result.map((requests) => this.mapEntitytoInterface(requests));
    const meta = metaPagination(result.length, result, pagination);

    const apiResponse: ApiResponse = {
      data,
      meta,
    };

    return apiResponse;
  }

  async findById(id: string) {
    const result = await this.repo.findById(id);
    const data = this.mapEntitytoInterface(result);

    const apiResponse: ApiResponse = { data };
    return apiResponse;
  }

  async changeStatus(changeStatus: ChangeStatusBody, id: string) {
    const status = changeStatus.status;
    await this.repo.setStatusById(id, status);
  }

  async updateAvailableItem(
    updateRequestItemBody: UpdateRequestItemBody,
    id: string,
  ) {
    const availableItemName = updateRequestItemBody.available_item_name;
    this.repo.updateAvailableItem(id, availableItemName);
  }

  mapEntitytoInterface(request: Request) {
    const responseInterface: ResponseInterface = {
      id: request.id,
      email: request.email,
      username: request.username,
      division: request.division,
      phone_number: request.phoneNumber,
      request_type: request.requestType,
      item_name: request.itemName,
      purpose: request.purpose,
      priority: request.priority,
      status: request.status,
      created_at: request.createdAt,
      updated_at: request.updatedAt,
    };

    return responseInterface;
  }
}
