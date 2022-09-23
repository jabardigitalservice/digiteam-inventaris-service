import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
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
