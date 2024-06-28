import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTopSalesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  start_date?:string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  end_date?: string;
}
