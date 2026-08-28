import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

import type { Request } from 'express';
import { AuthGuard } from '@/Guards/Auth/auth.guard';

@Controller('departments')
@UseGuards(AuthGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Req() request: Request,
  ) {
    return this.departmentsService.create(createDepartmentDto, request['user']);
  }

  // @Get()
  // findAll() {
  //   return this.departmentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.departmentsService.findOne(id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDepartmentDto: UpdateDepartmentDto,
  // ) {
  //   return this.departmentsService.update(+id, updateDepartmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.departmentsService.remove(+id);
  // }
}
