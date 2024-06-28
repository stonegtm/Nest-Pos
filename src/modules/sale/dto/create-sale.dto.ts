import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsNumber()
  totalSumAll: number;

  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product is required' })
  product_detail: Array<string>;
}
