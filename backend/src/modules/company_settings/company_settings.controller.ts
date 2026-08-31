import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { CompanySettingsService } from './company_settings.service';
import { CreateCompanySettingDto } from './dto/create-company_setting.dto';
import { UpdateCompanySettingDto } from './dto/update-company_setting.dto';
import { CurrentCompany, CurrentUser } from '@/Guards/Auth/auth.decorator';
import type { AuthenticatedCompany } from '@/Guards/Auth/authenticated.company';
import type { AuthenticatedUser } from '@/Guards/Auth/authenticated.user';
import { AuthGuard } from '@/Guards/Auth/auth.guard';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

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
}
