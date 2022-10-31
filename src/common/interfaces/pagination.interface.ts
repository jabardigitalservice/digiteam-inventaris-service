export interface QueryPagination {
  page: number;
  limit: number;
  sort_by?: string;
  sort?: 'asc' | 'desc' | 'ASC' | 'DESC';
}

export interface Pagination {
  page: number;
  limit: number;
  offset: number;
  sort_by?: string;
  sort?: 'asc' | 'desc' | 'ASC' | 'DESC';
}

export interface MetaPagination {
  page: number;
  limit: number;
  from: number;
  to: number;
  last_page: number;
  total: number;
}
