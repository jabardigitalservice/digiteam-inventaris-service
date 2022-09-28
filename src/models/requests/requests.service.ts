import { CreateRequestDto } from './dtos/create-request.dto';
import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import { mapEntitytoInterface } from './interfaces/response.interface';
import { GetRequestsPaginateDto } from './dtos/get-requests-paginate.dto';
import { metaPagination } from 'src/common/helper/pagination.helper';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

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

  async getAllRequests(getRequestsPaginateDto: GetRequestsPaginateDto) {
    const { page = 1, limit = 10 } = getRequestsPaginateDto;
    const result = await this.repo.fetchAll(page, limit);

    const data = result.map((requests) => mapEntitytoInterface(requests));
    const meta = metaPagination(data, page, limit);

    const apiResponse: ApiResponse = {
      data: data,
      meta: meta,
    };

    return apiResponse;
  }
}
