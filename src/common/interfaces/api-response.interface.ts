import { MetaPagination } from '../helpers/pagination.helper';

export interface ApiResponse {
  data: any;
  meta: MetaPagination;
}
