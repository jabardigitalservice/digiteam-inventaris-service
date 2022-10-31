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
