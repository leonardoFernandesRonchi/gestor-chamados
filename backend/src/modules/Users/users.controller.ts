import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  create(@Body() dto: createUserDto) {
    return this.UsersService.create(dto);
  }
}
