import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { CompanyStatus } from '@/modules/Companies/enums/company-status.enum';

export class CreateCompanyDto {
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
