import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { CompanySettingsService } from './company_settings.service';
import { CreateCompanySettingDto } from './dto/create-company_setting.dto';
import { CurrentCompany } from '@/Guards/Auth/auth.decorator';
import { AuthGuard } from '@/Guards/Auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { CompanySettingsUploads } from '@/constants/CompanySettingsUploads';
import { MulterConfig } from '@/config/multer.config';

@Controller('company-settings')
@UseGuards(AuthGuard)
export class CompanySettingsController {
  constructor(
    private readonly companySettingsService: CompanySettingsService,
  ) {}
  @Post()
  @UseInterceptors(FileFieldsInterceptor(CompanySettingsUploads, MulterConfig))
  create(
    @Body() dto: CreateCompanySettingDto,
    @CurrentCompany() company,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.companySettingsService.create(dto, company, files);
  }

  @Put()
  @UseInterceptors(FileFieldsInterceptor(CompanySettingsUploads, MulterConfig))
  update(
    @Body() dto: CreateCompanySettingDto,
    @CurrentCompany() company,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.companySettingsService.update(dto, company, files);
  }

  @Get(':id')
  findById(@CurrentCompany() company) {
    return this.companySettingsService.findById(company.id);
  }
}
