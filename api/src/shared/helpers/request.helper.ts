import { ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export function getRequest(context: ExecutionContext): Request {
  const contextType = context.getType<GqlContextType>();
  if (contextType === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  return context.switchToHttp().getRequest<Request>();
}
