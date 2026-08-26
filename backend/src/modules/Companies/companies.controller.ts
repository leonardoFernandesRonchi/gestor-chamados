import { RolesGuard } from '@/auth/roles/roles.guard';
import { Roles } from '@/auth/roles/roles.decorator';
import { CompaniesService } from '@/modules/Companies/companies.service';
import { CreateCompanyDto } from '@/modules/Companies/dto/create-company.dto';
import { UpdateCompanyDto } from '@/modules/Companies/dto/update-company.dto';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

@Controller('companies')
@UseGuards(RolesGuard)
export class CompaniesController {
  constructor(private readonly CompaniesService: CompaniesService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.CompaniesService.create(dto);
  }

  @Put(':id')
  // @Roles('owner', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.CompaniesService.update(id, dto);
  }

  @Delete(':id')
  // @Roles('owner', 'admin')
  delete(@Param('id') id: string) {
    return this.CompaniesService.destroy(id);
  }
}
