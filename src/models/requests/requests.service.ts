import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Requests } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(@InjectRepository(Requests) private repo: Repository<Requests>) {}

  create(
    requestType: number,
    itemName: string,
    purpose: string,
    priority: number,
  ) {
    const request = this.repo.create({
      requestType,
      itemName,
      purpose,
      priority,
    });

    return this.repo.save(request);
  }
}
