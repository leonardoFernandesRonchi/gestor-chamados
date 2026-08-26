import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/modules/Users/entities/user.entity';
import { Company } from '@/modules/Companies/entities/company.entity';
import { CreateCompanyDto } from '@/modules/Companies/dto/create-company.dto';
import { UpdateCompanyDto } from '@/modules/Companies/dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}
  async create(dto: CreateCompanyDto) {
    return this.companiesRepository.manager.transaction(async (manager) => {
      const company = manager.create(Company, dto['company']);

      const savedCompany = await manager.save(company);

      const user = manager.create(User, {
        ...dto['user'],
        company_id: savedCompany,
      });
      await manager.save(user);

      return savedCompany;
    });
  }

  async update(id: string, dto: UpdateCompanyDto) {
    const company = await this.companiesRepository.findOne({
      where: { id },
    });

    if (!company) return 'User not exists!';

    Object.assign(company, dto);
    return this.companiesRepository.save(company);
  }

  async destroy(id: string) {
    return this.companiesRepository.manager.transaction(async (manager) => {
      const company = await this.companiesRepository.findOne({
        where: { id },
        relations: {
          users: true,
        },
      });

      if (!company) return 'User not exists!';

      await manager.delete(User, {
        company: {
          id: company.id,
        },
      });

      await manager.delete(Company, {
        id: company.id,
      });

      return {
        message: 'Company deleted successfully',
      };
    });
  }
}
