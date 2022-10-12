export interface CreateRequestBody {
  division: string;
  phone_number: string;
  request_type: number;
  item_name: string;
  purpose: string;
  priority: number;
}

export interface ChangeStatusBody {
  status: number;
}

export interface UpdateRequestItemBody {
  available_item_name: string;
}
