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

export interface ResponseInterface {
  id: string;
  email: string;
  username: string;
  division: string;
  phone_number: string;
  request_type: number;
  item_name: string;
  purpose: string;
  priority: number;
  status: number;
  created_at: Date;
  updated_at: Date;
}
