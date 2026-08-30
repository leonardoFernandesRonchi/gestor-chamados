import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanySettingDto } from './create-company_setting.dto';
import { IsOptional, IsString } from 'class-validator';
export class UpdateCompanySettingDto {
  @IsString()
  @IsOptional()
  logo_url;

  @IsString()
  @IsOptional()
  favicon_url;

  @IsString()
  @IsOptional()
  cor_primaria;

  @IsString()
  @IsOptional()
  cor_secundaria;
}
