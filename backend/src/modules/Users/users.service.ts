import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Company } from '@/modules/Companies/entities/company.entity';
import { Department } from '@/modules/departments/entities/department.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly jwtService: JwtService,

    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,

    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
  ) {}
  async create(dto: createUserDto, user) {
    const company = await this.companiesRepository.findOne({
      where: {
        id: user.companyId,
      },
    });

    const department = await this.departmentsRepository.findOne({
      where: {
        id: dto.department_id,
      },
    });

    const userAlreadyExists = await this.usersRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (userAlreadyExists) {
      throw new ConflictException('Email já em uso');
    }

    if (!company) {
      throw new UnauthorizedException('Não autorizado');
    }

    if (!department) {
      throw new NotFoundException('Departamento não encontrado');
    }
    const userCreated = this.usersRepository.create({
      ...dto,
      company_id: company.id,
      department_id: department.id,
    });

    return this.usersRepository.save(userCreated);
  }

  async login(email: string, password: string) {
    console.log('chegou aqui');
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
