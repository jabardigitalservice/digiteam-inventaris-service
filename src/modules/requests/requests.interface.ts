export interface Create {
  division: string;
  phone_number: string;
  request_type: number;
  requested_item: string;
  purpose: string;
  priority: number;
}

export interface FindAll {
  page: number;
  limit: number;
  sort_by: string;
  sort: 'asc' | 'desc';
  request_type: number;
  division: string;
  status: number;
}
export interface UpdateStatus {
  status: number;
  notes: string;
}
export interface UpdateItem {
  item_name: string;
  item_brand: string;
  item_number: string;
  status: number;
}

export interface UpdateFilename {
  filename: string;
  status: number;
}

export interface UpdateNotes {
  status: number;
  notes: string;
}
