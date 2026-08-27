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
    private readonly DepartmentsRepository: Repository<Department>,

    @InjectRepository(Company)
    private readonly CompaniesRepository: Repository<Company>,
  ) {}

  async create(dto: CreateDepartmentDto) {
    const company = await this.CompaniesRepository.findOne({
      where: {
        id: dto.company_id,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const department = this.DepartmentsRepository.create({
      name: dto.name,
      company: company,
    });

    return this.DepartmentsRepository.save(department);
  }
}
