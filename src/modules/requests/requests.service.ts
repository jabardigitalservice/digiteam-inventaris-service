import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import {
  metaPagination,
  queryPagination,
} from '../../common/helpers/pagination';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import {
  Create,
  UpdateStatus,
  UpdateItem,
  UpdateFilename,
} from './requests.interface';
import { QueryPagination } from '../../common/interfaces/pagination.interface';
import { status } from '../../common/helpers/status';
import { MinioClientService } from '../../storage/minio/minio.service';

@Injectable()
export class RequestsService {
  constructor(
    private repo: RequestsRepository,
    private minioClientService: MinioClientService,
  ) {}

  store(create: Create, userAccess: UserAccess) {
    this.repo.store({
      email: userAccess.email,
      username: userAccess.name,
      division: create.division,
      phone_number: create.phone_number,
      request_type: create.request_type,
      requested_item: create.requested_item,
      purpose: create.purpose,
      priority: create.priority,
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

    if (data.filename) {
      data.file_url = await this.minioClientService.download(data.filename);
    }

    return { data, meta: {} };
  }

  updateStatus(id: string, updateStatus: UpdateStatus) {
    const status = updateStatus.status;
    return this.repo.updateStatus(id, status);
  }

  updateFilePath(id: string, filename: string) {
    const updated: UpdateFilename = {
      filename,
      status: status.APPROVED,
    };

    return this.repo.updateFilePath(id, updated);
  }

  updateItem(id: string, updateItem: UpdateItem) {
    const updated = {
      ...updateItem,
      status: status.REQUESTED,
    };

    return this.repo.updateItem(id, updated);
  }
}
