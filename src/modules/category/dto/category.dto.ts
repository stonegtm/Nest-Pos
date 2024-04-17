
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {
    @ApiProperty({ type: String, example: `xxxxx` })
    @IsString()
    name: string;
    
    @ApiPropertyOptional({ type: String, example: `xxxxx` })
    @IsString()
    @IsOptional()
    description?: string;
}

