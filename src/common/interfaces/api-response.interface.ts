import { MetaPagination } from '../helpers/pagination';

export interface ApiResponse {
  data: Object[] | Object;
  meta: MetaPagination;
}
