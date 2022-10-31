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
  UpdateNotes,
  FindAll,
} from './requests.interface';
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

  async findAll(findAll: FindAll, userAccess: UserAccess) {
    const { email, isAdmin } = userAccess;
    const condition: Record<string, any> = {};
    const order: Record<string, any> = {};

    if (!isAdmin) condition.email = email;

    const pagination = queryPagination(findAll);

    if (findAll.sort_by) {
      order[findAll.sort_by] = findAll.sort;
    }

    const options = {
      where: condition,
      take: pagination.limit,
      skip: pagination.offset,
      order: order,
    };

    const { result, total } = await this.repo.findAll(options);

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

  updateNotes(id: string, updateNotes: UpdateNotes) {
    return this.repo.updateNotes(id, updateNotes);
  }
}
