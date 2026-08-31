import { Module } from '@nestjs/common';
import { CompanySettingsService } from './company_settings.service';
import { CompanySettingsController } from './company_settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@/modules/Companies/entities/company.entity';
import { CompanySetting } from '@/modules/company_settings/entities/company_setting.entity';
import { FileUploadModule } from '@/modules/file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanySetting, Company]),
    FileUploadModule,
  ],
  controllers: [CompanySettingsController],
  providers: [CompanySettingsService],
})
export class CompanySettingsModule {}
