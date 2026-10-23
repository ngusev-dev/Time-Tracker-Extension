import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequest } from '@shared/helpers/request.helper';
import { User } from 'generated/prisma/client';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    const user = request.user as User;

    return data ? user[data] : user;
  },
);
