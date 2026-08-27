import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { loginDto } from '@/modules/Users/dto/login-dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/Guards/Auth/auth.guard';
import { RolesGuard } from '@/Guards/roles/roles.guard';
import type { Request } from 'express';
import { Roles } from '@/Guards/roles/roles.decorator';
import { UserStatus } from '@/modules/Users/enums/user.enums';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserStatus.OWNER, UserStatus.ADMIN)
  create(@Body() dto: createUserDto, @Req() request: Request) {
    return this.UsersService.create(dto, request['user']);
  }

  @Post('login')
  login(@Body() dto: loginDto) {
    return this.UsersService.login(dto.email, dto.password);
  }
}
