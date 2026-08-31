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
import { FileUploadService } from '@/modules/file-upload/file-upload.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly fileUploadService: FileUploadService,

    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,

    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
  ) {}
  async create(dto: createUserDto, user, avatar?: Express.Multer.File) {
    const company = await this.companiesRepository.findOne({
      where: {
        id: user.companyId,
      },
    });

    const department = await this.departmentsRepository.findOne({
      where: {
        id: dto.user.department_id,
      },
    });

    const userAlreadyExists = await this.usersRepository.findOne({
      where: {
        email: dto.user.email,
      },
    });

    const hashedPassword = await bcrypt.hash(dto.user.password, 10);

    if (userAlreadyExists) {
      throw new ConflictException('Email já em uso');
    }

    if (!company) {
      throw new UnauthorizedException('Não autorizado');
    }

    if (!department) {
      throw new NotFoundException('Departamento não encontrado');
    }

    if (avatar) {
      this.fileUploadService.validateFile(avatar);
    }

    const avatarUrl = avatar
      ? this.fileUploadService.getFileUrl(avatar)
      : undefined;

    const userCreated = this.usersRepository.create({
      ...dto.user,
      company_id: company.id,
      department_id: department.id,
      password: hashedPassword,
      avatar_url: avatarUrl,
    });

    return this.usersRepository.save(userCreated);
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
