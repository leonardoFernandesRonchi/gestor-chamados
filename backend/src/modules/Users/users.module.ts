import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { UsersController } from '@/modules/Users/users.controller';
import { User } from './entities/user.entity';
import { Company } from '@/modules/Companies/entities/company.entity';
import { Department } from '@/modules/departments/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, Department]),

    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '1h',
    //   },
    // }),
  ],

  controllers: [UsersController],

  providers: [UsersService],

  exports: [UsersService],
})
export class UsersModule {}
