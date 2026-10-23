import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { getRequest } from '@shared/helpers/request.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = getRequest(context);

    if (typeof request.session.userId === 'undefined')
      throw new UnauthorizedException('Пользователь не авторизован');

    const user = await this.userService.getUserById(+request.session.userId);
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    request.user = user;

    return true;
  }
}
