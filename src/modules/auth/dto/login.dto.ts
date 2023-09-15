
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ type: String, example: `xxxxx` })
    username: string;
    @ApiProperty({ type: String, example: `xxxxx` })
    password: string;
}

