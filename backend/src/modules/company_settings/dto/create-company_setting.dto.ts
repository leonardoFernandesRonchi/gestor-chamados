import { IsOptional, IsString } from 'class-validator';

export class CreateCompanySettingDto {
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
