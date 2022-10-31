import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { RequestsRepository } from './requests.repository';
import { MinioClientModule } from '../../storage/minio/minio.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { Repository } from 'typeorm';
import { mockFindAll, mockStore } from './requests.mock';
import { Create } from './requests.interface';
import { UserAccess } from '../../common/interfaces/keycloak-user.interface';

let service: RequestsService;
let repo: RequestsRepository;
const userAccess: UserAccess = {
  name: 'test',
  email: 'test',
  role: ['test'],
  isAdmin: true,
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [MinioClientModule],
    providers: [
      RequestsService,
      RequestsRepository,
      {
        provide: getRepositoryToken(Request),
        useClass: Repository,
      },
    ],
  }).compile();

  service = module.get<RequestsService>(RequestsService);
  repo = module.get<RequestsRepository>(RequestsRepository);
});

describe('service test request', () => {
  it('test store request', async () => {
    mockStore(repo);

    const createStore: Create = {
      division: 'test',
      phone_number: 'test,',
      request_type: 123,
      requested_item: 'test',
      purpose: 'test',
      priority: 123,
    };

    const userAccess: UserAccess = {
      name: 'test',
      email: 'test',
      role: ['test'],
      isAdmin: true,
    };
    expect(service.store(createStore, userAccess)).toEqual(undefined);
  });
});

describe('service test request', () => {
  it('test findAll request', async () => {
    const mockDataRepo = {
      result: [
        {
          id: 1,
        },
      ],
      total: 1,
    };
    mockFindAll(repo, mockDataRepo);

    const queryRequest = {
      page: 1,
      limit: 10,
    };

    expect(await service.findAll(queryRequest, userAccess));
  });
});
