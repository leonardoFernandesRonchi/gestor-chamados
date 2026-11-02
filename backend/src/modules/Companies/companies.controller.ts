import { RolesGuard } from '@/Guards/roles/roles.guard';
import { CompaniesService } from '@/modules/Companies/companies.service';
import { CreateCompanyDto } from '@/modules/Companies/dto/create-company.dto';
import { UpdateCompanyDto } from '@/modules/Companies/dto/update-company.dto';
import { Roles } from '@/Guards/roles/roles.decorator';
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
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CurrentCompany, CurrentUser } from '@/Guards/Auth/auth.decorator';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { AuthenticatedCompany } from '@/Guards/Auth/authenticated.company';
import { MulterConfig } from '@/config/multer.config';
import { UserStatus } from '@/modules/Users/enums/user.enums';
import { AuthGuard } from '@/Guards/Auth/auth.guard';
import type { AuthenticatedUser } from '@/Guards/Auth/authenticated.user';

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
    console.log(dto, avatar);
    return this.companiesService.create(dto, avatar);
  }

  @Put(':id')
  @Roles(UserStatus.ADMIN, UserStatus.OWNER)
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserStatus.ADMIN, UserStatus.OWNER)
  delete(@Param('id') id: string) {
    return this.companiesService.destroy(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors()
  get(
    @CurrentUser() user: AuthenticatedUser,
    @CurrentCompany() company: AuthenticatedCompany,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.companiesService.getCompanyDetails(user, company, page, limit);
  }
}
