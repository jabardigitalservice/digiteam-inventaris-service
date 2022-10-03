import { Request } from '../entities/request.entity';

export interface ResponseInterface {
  id: string;
  username: string;
  division: string;
  phone_number: string;
  request_type: number;
  item_name: string;
  purpose: string;
  priority: number;
  status: number;
}

export const mapEntitytoInterface = (request: Request) => {
  const responseInterface: ResponseInterface = {
    id: request.id,
    username: request.username,
    division: request.division,
    phone_number: request.phoneNumber,
    request_type: request.requestType,
    item_name: request.itemName,
    purpose: request.purpose,
    priority: request.priority,
    status: request.status,
  };

  return responseInterface;
};