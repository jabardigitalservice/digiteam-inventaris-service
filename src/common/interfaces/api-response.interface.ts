import { MetaPagination } from '../helpers/pagination.helper';

export interface ApiResponse {
  data: Object[] | Object;
  meta: MetaPagination;
}
