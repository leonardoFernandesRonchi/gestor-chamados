import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { loginDto } from '@/modules/Users/dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}
  async create(dto: createUserDto) {
    const user = this.usersRepository.create(dto);

    return this.usersRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: {
        company: true,
        department: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      companyId: user?.company_id,
      status: user.status,
      departmentId: user?.department?.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
