import { QueryPagination } from 'src/common/interfaces/pagination.interface';

export interface Create {
  division: string;
  phone_number: string;
  request_type: number;
  requested_item: string;
  purpose: string;
  priority: number;
  replacement_evidence?: string | null;
}

export interface Update {
  status?: number;
  notes?: string;
  item_name?: string;
  item_brand?: string;
  item_number?: string;
  filename?: string;
  pickup_signing?: string;
  pickup_evidence?: string;
  pickup_bast?: string;
}

export interface FindAll extends QueryPagination {
  sort_by?: string;
  sort?: 'asc' | 'desc';
  request_type?: number;
  division?: string;
  status?: number;
  q?: string;
}
