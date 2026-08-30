import { Company } from '@/modules/Companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('company_settings')
export class CompanySetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  company_id!: string;

  @OneToOne(() => Company, (company) => company.company_settings)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column({ nullable: true })
  logo_url?: string;

  @Column({ nullable: true })
  favicon_url?: string;

  @Column({ nullable: true })
  cor_primaria?: string;

  @Column({ nullable: true })
  cor_secundaria?: string;
}
