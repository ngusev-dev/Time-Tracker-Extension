/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (typeof request.session.userId === 'undefined')
      throw new UnauthorizedException('Пользователь не авторизован');

    const user = await this.userService.getUserById(+request.session.userId);
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    request.user = user;

    return true;
  }
}
