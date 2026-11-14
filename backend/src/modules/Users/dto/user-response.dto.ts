import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { UserStatus } from '@/modules/Users/enums/user.enums';

export class UserResponseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  avatar_url?: string | null;

  @IsNotEmpty()
  @IsEnum(UserStatus)
  status!: string;

  @IsString()
  @IsNotEmpty()
  department_id!: string;
}
