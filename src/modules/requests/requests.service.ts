import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import {
  metaPagination,
  queryPagination,
} from '../../common/helpers/pagination';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';
import { Create, Update, FindAll } from './requests.interface';
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
      replacement_evidence: create.replacement_evidence,
    });
  }

  async findAll(findAll: FindAll, userAccess: UserAccess) {
    const pagination = queryPagination(findAll);

    const { result, total } = await this.repo.findAll(
      findAll,
      pagination,
      userAccess,
    );

    const meta = metaPagination(total, result, pagination);

    return {
      data: result,
      meta,
    };
  }

  async findById(id: string) {
    const data = await this.repo.findById(id);

    if (!data) {
      throw new NotFoundException();
    }

    if (data.filename) {
      data.file_url = await this.minioClientService.download(data.filename);
    }

    return { data, meta: {} };
  }

  updateStatus(id: string, updateStatus: Update) {
    return this.repo.update(id, updateStatus);
  }

  updateFilePath(id: string, filename: string) {
    const updated: Update = {
      filename,
      status: status.APPROVED,
    };

    return this.repo.update(id, updated);
  }

  updateItem(id: string, updateItem: Update) {
    const updated = {
      ...updateItem,
      status: status.REQUESTED,
    };

    return this.repo.update(id, updated);
  }

  updateNotes(id: string, updateNotes: Update) {
    return this.repo.update(id, updateNotes);
  }

  updatePickup(id: string, updatedPickup: Update) {
    const updated = {
      ...updatedPickup,
      status: status.COMPLETED,
    };
    return this.repo.update(id, updated);
  }
}
