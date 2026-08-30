import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { AuthGuard } from '@/Guards/Auth/auth.guard';
import { UpdateDepartmentDto } from '@/modules/departments/dto/update-department.dto';
import type { AuthenticatedUser } from '@/Guards/Auth/authenticated.user';
import { CurrentUser } from '@/Guards/Auth/auth.decorator';
import { RolesGuard } from '@/Guards/roles/roles.guard';
import { UserStatus } from '@/modules/Users/enums/user.enums';
import { Roles } from '@/Guards/roles/roles.decorator';

@Controller('departments')
@UseGuards(AuthGuard, RolesGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Roles(UserStatus.ADMIN, UserStatus.OWNER)
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @CurrentUser() user: AuthenticatedUser,
    @Request() request: any,
  ) {
    return this.departmentsService.create(createDepartmentDto, user);
  }

  @Put(':id')
  @Roles(UserStatus.ADMIN, UserStatus.OWNER)
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.departmentsService.getAll(user);
  }

  @Get(':id')
  find(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.departmentsService.findById(id, user);
  }

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
