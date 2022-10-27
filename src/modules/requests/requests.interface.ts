export interface Create {
  division: string;
  phone_number: string;
  request_type: number;
  requested_item: string;
  purpose: string;
  priority: number;
}

export interface UpdateStatus {
  status: number;
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
