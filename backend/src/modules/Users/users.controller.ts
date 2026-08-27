import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { loginDto } from '@/modules/Users/dto/login-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  create(@Body() dto: createUserDto) {
    return this.UsersService.create(dto);
  }

  @Post('login')
  login(@Body() dto: loginDto) {
    return this.UsersService.login(dto.email, dto.password);
  }
}
