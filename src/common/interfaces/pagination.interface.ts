export interface QueryPagination {
  page: number;
  limit: number;
}

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
