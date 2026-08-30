import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { User } from '@/modules/Users/entities/user.entity';
import { CompanyStatus } from '@/modules/Companies/enums/company-status.enum';
import { Department } from '@/modules/departments/entities/department.entity';
import { CompanySetting } from '@/modules/company_settings/entities/company_setting.entity';
@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  cnpj!: string;

  @Column({ nullable: false })
  phone!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: true })
  dominio_customizado!: string;

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    default: CompanyStatus.ACTIVE,
  })
  status!: CompanyStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.company)
  users!: User[];

  @OneToMany(() => Department, (department) => department.company)
  departments!: Department[];

  @OneToOne(() => CompanySetting, (companySetting) => companySetting.company)
  company_settings!: CompanySetting;
}
