import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanySettingDto } from './dto/create-company_setting.dto';
import { Company } from '@/modules/Companies/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanySetting } from '@/modules/company_settings/entities/company_setting.entity';
import { FileUploadService } from '@/modules/file-upload/file-upload.service';

@Injectable()
export class CompanySettingsService {
  constructor(
    @InjectRepository(CompanySetting)
    private readonly companiesSettingsRepository: Repository<CompanySetting>,

    private readonly fileUploadService: FileUploadService,

    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async create(
    dto: CreateCompanySettingDto,
    company: Company,
    files?: Express.Multer.File[],
  ) {
    console.log(files);
    const logo = files?.['logo'][0];
    const favicon = files?.['favicon'][0];

    if (favicon) this.fileUploadService.validateFile(favicon);
    if (logo) this.fileUploadService.validateFile(logo);

    const faviconUrl = favicon
      ? this.fileUploadService.getFileUrl(favicon)
      : undefined;

    const logoUrl = logo ? this.fileUploadService.getFileUrl(logo) : undefined;

    const companyFound = await this.companiesRepository.find({
      where: {
        id: company.id,
      },
    });

    if (!companyFound) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const companySettings = await this.companiesSettingsRepository.create({
      company_id: company.id,
      cor_primaria: dto.company_setting.cor_primaria,
      cor_secundaria: dto.company_setting.cor_secundaria,
      logo_url: logoUrl,
      favicon_url: faviconUrl,
    });

    await this.companiesSettingsRepository.save(companySettings);

    return companySettings;
  }
}
