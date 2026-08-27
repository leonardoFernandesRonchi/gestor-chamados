import {
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserStatus } from '../enums/user.enums';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  @IsEnum(UserStatus)
  status!: UserStatus;

  @IsString()
  @IsNotEmpty()
  department_id!: string;
}
