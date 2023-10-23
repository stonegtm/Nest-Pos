import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';

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
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product is required' })
  product: Array<string>;
}
