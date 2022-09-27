import { CreateRequestDto } from './dtos/create-request.dto';
import { Injectable } from '@nestjs/common';
import { Request } from './entities/request.entity';
import { RequestsRepository } from './requests.repository';

@Injectable()
export class RequestsService {
  constructor(private repo: RequestsRepository) {}

  async create(reqBody: CreateRequestDto) {
    const newRequest = this.repo.create({
      userName: reqBody.user_name,
      userDivision: reqBody.user_division,
      userPhoneNumber: reqBody.user_phone_number,
      requestType: reqBody.request_type,
      itemName: reqBody.item_name,
      purpose: reqBody.purpose,
      priority: reqBody.priority,
    });

    return this.repo.createNewRequest(newRequest);
  }

  async findAll(): Promise<Request[]> {
    return this.repo.getAllRequests();
  }
}
