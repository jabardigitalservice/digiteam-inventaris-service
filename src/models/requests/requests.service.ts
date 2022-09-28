import { CreateRequestDto } from './dtos/create-request.dto';
import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import { mapEntitytoInterface } from './interfaces/response.interface';
import {
  metaPagination,
  queryPagination,
} from 'src/common/helper/pagination.helper';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { QueryRequestDto } from './dtos/query-request.dto';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  async createNewRequest(reqBody: CreateRequestDto) {
    const newRequest = this.repo.store({
      username: reqBody.username,
      division: reqBody.division,
      phoneNumber: reqBody.phone_number,
      requestType: reqBody.request_type,
      itemName: reqBody.item_name,
      purpose: reqBody.purpose,
      priority: reqBody.priority,
    });

    return newRequest;
  }

  async getAllRequests(queryRequest: QueryRequestDto) {
    const { offset, page, limit } = queryPagination(queryRequest);
    const { result, count } = await this.repo.fetchAll(offset, limit);

    const data = result.map((requests) => mapEntitytoInterface(requests));
    const meta = metaPagination(count, page, limit, offset, result);

    const apiResponse: ApiResponse = {
      data: data,
      meta: meta,
    };

    return apiResponse;
  }
}
