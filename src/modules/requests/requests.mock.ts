import { RequestsRepository } from './requests.repository';

export const mockStore = (
  requestsRepository: RequestsRepository,
  result: any,
) => {
  jest.spyOn(requestsRepository, 'store').mockResolvedValue(result);
};

export const mockFindAll = (
  requestsRepository: RequestsRepository,
  result: any,
) => {
  jest.spyOn(requestsRepository, 'findAll').mockResolvedValue(result);
};

export const mockFindById = (
  requestsRepository: RequestsRepository,
  result: any,
) => {
  jest.spyOn(requestsRepository, 'findById').mockResolvedValue(result);
};

export const mockUpdate = (
  requestsRepository: RequestsRepository,
  result: any,
) => {
  jest.spyOn(requestsRepository, 'update').mockResolvedValue(result);
};
