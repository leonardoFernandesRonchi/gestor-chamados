import { plainToInstance, Transform } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class CompanySettingDto {
  @IsString()
  @IsOptional()
  cor_primaria;

  @IsString()
  @IsOptional()
  cor_secundaria;
}

export class CreateCompanySettingDto {
  @Transform(({ value }) =>
    plainToInstance(
      CompanySettingDto,
      typeof value === 'string' ? JSON.parse(value) : value,
    ),
  )
  @ValidateNested()
  company_setting!: CompanySettingDto;
}
