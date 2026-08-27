import { Module } from '@nestjs/common';
import { DepartmentsService } from '@/modules/departments/departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '@/modules/departments/entities/department.entity';
import { Company } from '@/modules/Companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Company])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
