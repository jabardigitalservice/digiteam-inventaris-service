import { RequestsRepository } from './requests.repository';

export const mockStore = (requestsRepository: RequestsRepository) => {
  jest
    .spyOn(requestsRepository, 'store')
    .mockImplementationOnce(() => Promise.resolve());
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

export const mockUpdate = (requestsRepository: RequestsRepository) => {
  jest
    .spyOn(requestsRepository, 'update')
    .mockImplementation(() => Promise.resolve());
};
