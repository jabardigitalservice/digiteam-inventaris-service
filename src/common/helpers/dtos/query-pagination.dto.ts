import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class QueryPaginateDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
