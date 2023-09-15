import { ApiProperty } from '@nestjs/swagger';
import {
    CreateDateColumn
} from 'typeorm';

export class UserDto {
    @ApiProperty({ type: String, example: `xxxxx` })
    username: string;
    @ApiProperty({ type: String, example: `xxxxx` })
    password: string;
    @ApiProperty({ type: String, example: `xxxxx` })
    email?: string;
    @CreateDateColumn() created_at?: Date;
}

