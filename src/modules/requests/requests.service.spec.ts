import { FindAll, Update } from './requests.interface';
import { RequestsRepository } from './requests.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request } from 'src/entities/request.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserAccess } from 'src/common/interfaces/keycloak-user.interface';
import { NotFoundException } from '@nestjs/common';

const mockRequest: Request = {
  id: 'test',
  email: 'test',
  username: 'test',
  division: 'test',
  phone_number: 'test',
  request_type: 1,
  replacement_evidence: 'test',
  requested_item: 'test',
  purpose: 'test',
  priority: 1,
  status: 1,
};

const mockUserAccess: UserAccess = {
  name: 'test',
  email: 'test',
  role: ['test'],
  isAdmin: false,
};

const mockRequests = {
  result: [mockRequest],
  total: 1,
};

const mockFindAll: FindAll = {
  page: 1,
  limit: 1,
  offset: 0,
};

const mockFindByIdResult = {
  data: mockRequest,
  meta: {},
};

const mockFindAllResult = {
  data: [mockRequest],
  meta: {
    from: 1,
    last_page: 1,
    limit: 1,
    page: 1,
    to: 1,
    total: 1,
  },
};

const mockCreate: Request = {
  username: mockUserAccess.name,
  email: mockUserAccess.email,
  division: 'test',
  phone_number: 'test',
  request_type: 1,
  requested_item: 'test',
  purpose: 'test',
  priority: 1,
  replacement_evidence: 'test',
};

const mockUpdateResult = (affected: number): UpdateResult => {
  return {
    raw: 'test',
    affected,
    generatedMaps: [],
  };
};

const mockUpdate: Update = {
  status: 2,
  notes: 'test',
};

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
    it('should return a request', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(mockRequest);

      expect(service.findById('test')).resolves.toEqual(mockFindByIdResult);
      expect(repository.findById).toHaveBeenCalled();
      expect(repository.findById).toHaveBeenCalledWith('test');
    });

    it('should throw not found exception if result is empty', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      expect(service.findById('test')).rejects.toEqual(new NotFoundException());

      expect(repository.findById).toHaveBeenCalled();

      expect(repository.findById).toHaveBeenCalledWith('test');
    });
  });

  describe('findAll', () => {
    it('should return an array of requests', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValueOnce(mockRequests);

      expect(service.findAll(mockFindAll, mockUserAccess)).resolves.toEqual(
        mockFindAllResult,
      );

      expect(repository.findAll).toHaveBeenCalled();

      expect(repository.findAll).toHaveBeenCalledWith(
        mockFindAll,
        mockUserAccess,
      );
    });
  });

  describe('store', () => {
    it('should store a new request', async () => {
      jest.spyOn(repository, 'store').mockResolvedValueOnce(mockRequest);

      expect(service.store(mockCreate, mockUserAccess)).resolves.toEqual(
        mockRequest,
      );

      expect(repository.store).toHaveBeenCalled();

      expect(repository.store).toHaveBeenCalledWith(mockCreate);
    });
  });

  describe('update', () => {
    it('should update a request', async () => {
      jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce(mockUpdateResult(1));

      expect(service.update('test', mockUpdate)).resolves.toEqual(
        mockUpdateResult(1),
      );

      expect(repository.update).toHaveBeenCalled();

      expect(repository.update).toHaveBeenCalledWith('test', mockUpdate);
    });

    it('should throw not found exception if affected less than 1', async () => {
      jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce(mockUpdateResult(0));

      expect(service.update('test', mockUpdate)).rejects.toEqual(
        new NotFoundException(),
      );

      expect(repository.update).toHaveBeenCalled();

      expect(repository.update).toHaveBeenCalledWith('test', mockUpdate);
    });
  });
});
