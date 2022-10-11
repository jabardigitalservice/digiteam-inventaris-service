import { MetaPagination } from './pagination.interface';

export interface ApiResponse {
  data: Object[] | Object;
  meta: MetaPagination;
}
