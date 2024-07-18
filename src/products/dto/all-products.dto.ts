import { IsNumber, IsString } from 'class-validator';

export class ALLProductsDto {
  @IsString()
  search?: string;

  @IsNumber()
  limit?: number;

  @IsNumber()
  page?: number;
}
