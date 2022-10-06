import { CreateRequestDto } from '../dtos/create-request.dto';
import { Injectable } from '@nestjs/common';
import { RequestsRepository } from '../respositories/requests.repository';
import { mapEntitytoInterface } from '../interfaces/response.interface';
import {
  metaPagination,
  queryPagination,
} from '../../../common/helpers/pagination';
import { ApiResponse } from '../../../common/interfaces/api-response.interface';
import { QueryRequestDto } from '../dtos/query-request.dto';
import { UserAccess } from '../../../common/interfaces/keycloak-user.interface';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  async createNewRequest(reqBody: CreateRequestDto, userAccess: UserAccess) {
    const newRequest = this.repo.store({
      email: userAccess.email,
      username: userAccess.name,
      division: reqBody.division,
      phoneNumber: reqBody.phone_number,
      requestType: reqBody.request_type,
      itemName: reqBody.item_name,
      purpose: reqBody.purpose,
      priority: reqBody.priority,
    });

    return newRequest;
  }

  async getAllRequests(queryRequest: QueryRequestDto, userAccess: UserAccess) {
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
}
