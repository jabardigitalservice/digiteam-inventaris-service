import { QueryPaginateDto } from './dtos/query-pagination.dto';

export interface Pagination {
  page: number;
  limit: number;
  offset: number;
}
export interface MetaPagination {
  page: number;
  limit: number;
  from: number;
  to: number;
  last_page: number;
  total: number;
}

export const queryPagination = (request: QueryPaginateDto): Pagination => {
  const limit = Number(request.limit) || 10;
  const page = Number(request.page) || 1;
  const offset = (page - 1) * limit;
  return {
    page,
    limit,
    offset,
  };
};

export const metaPagination = (
  count: number,
  result: Array<object>,
  pagination: Pagination,
): MetaPagination => {
  return {
    page: pagination.page, //current_page
    from: pagination.offset + 1,
    to: pagination.offset + result.length,
    last_page: Math.ceil(count / pagination.limit),
    limit: pagination.limit,
    total: count,
  };
};
