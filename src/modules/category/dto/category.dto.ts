
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
    @ApiProperty({ type: String, example: `xxxxx` })
    name: string;
    @ApiProperty({ type: String, example: `xxxxx` })
    description?: string;
}

