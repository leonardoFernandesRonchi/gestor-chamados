import { RolesGuard } from '@/Guards/roles/roles.guard';
import { CompaniesService } from '@/modules/Companies/companies.service';
import { CreateCompanyDto } from '@/modules/Companies/dto/create-company.dto';
import { UpdateCompanyDto } from '@/modules/Companies/dto/update-company.dto';

import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

@Controller('companies')
@UseGuards(RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
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
