import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from '@/modules/departments/entities/department.entity';
import { Company } from '@/modules/Companies/entities/company.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,

    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async create(dto: CreateDepartmentDto, user) {
    const company = await this.companiesRepository.findOne({
      where: {
        id: user.companyId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const department = this.departmentsRepository.create({
      name: dto.name,
      company: company,
    });

    return this.departmentsRepository.save(department);
  }

  async update(id: string, dto: CreateDepartmentDto, user) {
    const department = await this.departmentsRepository.findOne({
      where: {
        company_id: user.companyId,
        id: id,
      },
    });
    if (!department) {
      throw new NotFoundException('Departamento não encontrado');
    }

    Object.assign(department, dto);
    return this.departmentsRepository.save(department);
  }

  async getAll(user) {
    const departments = await this.departmentsRepository.find({
      where: {
        company_id: user.companyId,
      },
    });
    return departments;
  }

  async findById(id, user) {
    const department = await this.departmentsRepository.find({
      where: {
        company_id: user.companyId,
        id: id,
      },
    });
    return department;
  }
}
