import { RequestsRepository } from './requests.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request } from 'src/entities/request.entity';
import { Repository } from 'typeorm';

describe('RequestsService', () => {
  let repository: RequestsRepository;
  let service: RequestsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        RequestsRepository,
        {
          provide: getRepositoryToken(Request),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<RequestsRepository>(RequestsRepository);
    service = module.get<RequestsService>(RequestsService);
  });

  describe('findById', () => {
    it('test return a request', async () => {
      const request: Request = {
        id: 'test',
        email: 'test',
        username: 'test',
        division: 'test',
        phone_number: 'test',
        request_type: 1,
        requested_item: 'test',
        purpose: 'test',
        priority: 1,
        status: 1,
      };

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(request);

      expect(service.findById('test')).resolves.toEqual(request);
      expect(repository.findById).toHaveBeenCalled();
      expect(repository.findById).toHaveBeenCalledWith('test');
    });
  });
});
