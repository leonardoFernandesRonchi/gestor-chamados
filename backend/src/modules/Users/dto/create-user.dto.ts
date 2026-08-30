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

class UserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
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

export class createUserDto {
  @Transform(({ value }) => plainToInstance(UserDto, JSON.parse(value)))
  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;
}
