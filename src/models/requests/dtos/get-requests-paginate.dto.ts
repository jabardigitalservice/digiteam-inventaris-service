import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class GetRequestsPaginateDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
