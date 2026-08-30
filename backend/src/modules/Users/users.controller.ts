import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { loginDto } from '@/modules/Users/dto/login-dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/Guards/Auth/auth.guard';
import { RolesGuard } from '@/Guards/roles/roles.guard';
import { Roles } from '@/Guards/roles/roles.decorator';
import { UserStatus } from '@/modules/Users/enums/user.enums';
import { CurrentUser } from '@/Guards/Auth/auth.decorator';
import type { AuthenticatedUser } from '@/Guards/Auth/authenticated.user';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from '@/config/multer.config';
import { Multer } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserStatus.OWNER, UserStatus.ADMIN)
  @UseInterceptors(FileInterceptor('avatar', MulterConfig))
  create(
    @Body() dto: createUserDto,
    @CurrentUser() user: AuthenticatedUser,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.usersService.create(dto, user, avatar);
  }

  @Post('login')
  login(@Body() dto: loginDto) {
    return this.usersService.login(dto.email, dto.password);
  }
}
