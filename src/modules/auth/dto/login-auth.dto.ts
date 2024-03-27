import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({ type: String, example: `xxxxx` })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ type: String, example: `xxxxx` })
  @IsNotEmpty()
  @IsString()
  password: string;
}
