import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '@/Guards/Auth/authenticated.user';
import { AuthenticatedCompany } from '@/Guards/Auth/authenticated.company';
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);

export const CurrentCompany = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedCompany => {
    const request = ctx.switchToHttp().getRequest();

    return request.company;
  },
);
