/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'generated/prisma/browser';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const request = gqlCtx.getContext().req;

    const user = request.user as User;

    return data ? user[data] : user;
  },
);
