import {
  MetaPagination,
  Pagination,
  QueryPagination,
} from '../interfaces/pagination.interface';

export const queryPagination = (request: QueryPagination): Pagination => {
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
