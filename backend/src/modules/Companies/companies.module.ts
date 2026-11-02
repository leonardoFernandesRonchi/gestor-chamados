import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesService } from '@/modules/Companies/companies.service';
import { CompaniesController } from '@/modules/Companies/companies.controller';
import { Company } from '@/modules/Companies/entities/company.entity';
import { User } from '@/modules/Users/entities/user.entity';
import { FileUploadModule } from '@/modules/file-upload/file-upload.module';
import { UsersModule } from '@/modules/Users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User]),
    FileUploadModule,
    UsersModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
