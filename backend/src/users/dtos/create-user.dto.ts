import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password ahould ahve one letter lower , upper , number , special character',
  })
  @MinLength(8)
  @MaxLength(96)
  password: string;
}
