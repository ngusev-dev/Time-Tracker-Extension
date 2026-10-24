import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { getRequest } from '@shared/helpers/request.helper';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@shared/decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const request = getRequest(context);
    const user = request.user;

    if (!user) throw new NotFoundException('Пользователь не найден');

    if (!roles.includes(user.role))
      throw new ForbiddenException('Роль пользователя не разрешена');

    return true;
  }
}
