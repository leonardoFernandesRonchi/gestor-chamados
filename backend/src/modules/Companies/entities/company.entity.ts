import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CompanyStatus } from '@/modules/Companies/enums/company-status.enum';

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
}
