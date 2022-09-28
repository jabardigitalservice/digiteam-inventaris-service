import { QueryPaginateDto } from './dtos/query-pagination.dto';
export interface MetaPagination {
  page: number;
  limit: number;
  from: number;
  to: number;
  last_page: number;
  total: number;
}

export const queryPagination = (request: QueryPaginateDto) => {
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
  page: number,
  limit: number,
  offset: number,
  result: Array<object>,
): MetaPagination => {
  return {
    page: Number(page), //current_page
    from: offset + 1,
    to: offset + result.length,
    last_page: Math.ceil(count / limit),
    limit: Number(limit),
    total: count,
  };
};
