import { Company } from '@/modules/Companies/entities/company.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);

      const company = await this.companiesRepository.findOne({
        where: {
          id: payload.companyId,
        },
      });

      request['user'] = payload;

      request['company'] = company;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
