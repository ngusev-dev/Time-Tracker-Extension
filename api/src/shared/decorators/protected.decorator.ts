import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@shared/guards/auth.guard';
import { UserRole } from 'generated/prisma/client';
import { Roles } from './roles.decorator';
import { RoleGuard } from '@shared/guards/role.guard';

export const Protected = (...roles: UserRole[]) => {
  if (!roles.length) return applyDecorators(UseGuards(AuthGuard));

  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
};
