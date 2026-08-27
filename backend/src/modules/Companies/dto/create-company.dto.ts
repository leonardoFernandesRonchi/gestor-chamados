import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';

import { UserStatus } from '@/modules/Users/enums/user.enums';
import { CompanyStatus } from '@/modules/Companies/enums/company-status.enum';

class CompanyDataDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @Length(14, 14)
  cnpj!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  dominio_customizado?: string;

  @IsOptional()
  @IsEnum(CompanyStatus)
  status?: CompanyStatus;
}

class UserDataDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsStrongPassword()
  password!: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}

class DepartmentDataDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class CreateCompanyDto {
  @ValidateNested()
  @Type(() => CompanyDataDto)
  company!: CompanyDataDto;

  @ValidateNested()
  @Type(() => UserDataDto)
  user!: UserDataDto;

  @ValidateNested()
  @Type(() => DepartmentDataDto)
  department!: DepartmentDataDto;
}
