import { MetaPagination } from '../helper/pagination.helper';

export interface ApiResponse {
  data: any;
  meta: MetaPagination;
}
