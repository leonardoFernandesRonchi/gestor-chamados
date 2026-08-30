import { RolesGuard } from '@/Guards/roles/roles.guard';
import { CompaniesService } from '@/modules/Companies/companies.service';
import { CreateCompanyDto } from '@/modules/Companies/dto/create-company.dto';
import { UpdateCompanyDto } from '@/modules/Companies/dto/update-company.dto';

import { Multer } from 'multer';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MulterConfig } from '@/config/multer.config';

@Controller('companies')
@UseGuards(RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar', MulterConfig))
  create(
    @Body() dto: CreateCompanyDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.companiesService.create(dto, avatar);
  }

  @Put(':id')
  // @Roles('owner', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.update(id, dto);
  }

  @Delete(':id')
  // @Roles('owner', 'admin')
  delete(@Param('id') id: string) {
    return this.companiesService.destroy(id);
  }
}
