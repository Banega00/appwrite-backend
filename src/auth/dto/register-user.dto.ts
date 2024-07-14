import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'test@gmail.com', type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', type: String })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe', type: String })
  @IsString()
  name: string;
}
