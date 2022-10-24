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
  item_name: string;
  item_brand: string;
  item_number: string;
}
