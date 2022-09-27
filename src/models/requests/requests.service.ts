import { CreateRequestDto } from './dtos/create-request.dto';
import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  async createNewRequest(reqBody: CreateRequestDto) {
    const newRequest = this.repo.create({
      name: reqBody.name,
      division: reqBody.division,
      phoneNumber: reqBody.phone_number,
      requestType: reqBody.request_type,
      itemName: reqBody.item_name,
      purpose: reqBody.purpose,
      priority: reqBody.priority,
    });

    return this.repo.store(newRequest);
  }
}
