import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  user_division: string;

  @IsNotEmpty()
  @IsString()
  user_phone_number: string;

  @IsNotEmpty()
  @IsNumber()
  request_type: number;

  @IsNotEmpty()
  @IsString()
  item_name: string;

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @IsNotEmpty()
  @IsNumber()
  priority: number;
}
