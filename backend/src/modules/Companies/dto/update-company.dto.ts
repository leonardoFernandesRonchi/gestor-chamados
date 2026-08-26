import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

import { CompanyStatus } from '@/modules/Companies/enums/company-status.enum';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  @Length(14, 14)
  cnpj!: string;

  @IsString()
  @IsOptional()
  phone!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsOptional()
  @IsString()
  dominio_customizado?: string;

  @IsOptional()
  @IsEnum(CompanyStatus)
  status?: CompanyStatus;
}
