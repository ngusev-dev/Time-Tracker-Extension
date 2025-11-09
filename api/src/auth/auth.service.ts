import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { RegistrationDto } from './dto/registration.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserTimerService } from 'src/user-timer/user-timer.service';
import { User } from 'generated/prisma/client';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  saltOrRounds = 10;

  constructor(
    private userService: UserService,
    private userTimerService: UserTimerService,
  ) {}

  async loginUser(req: Request, dto: LoginDto) {
    const candidate = await this.userService.checkUserExist(
      dto.login,
      dto.login,
    );

    if (!candidate)
      throw new BadRequestException(
        'Неправильные данные. Проверьте введенные данные и повторите попытку',
      );

    const isMatchPassword = await bcrypt.compare(
      dto.password,
      candidate.password,
    );

    if (!isMatchPassword)
      throw new BadRequestException(
        'Неправильные данные. Проверьте введенные данные и повторите попытку',
      );

    return await this.saveSession(req, candidate);
  }

  async registrationUser(req: Request, dto: RegistrationDto) {
    const candidate = await this.userService.checkUserExist(
      dto.email,
      dto.login,
    );
    if (candidate) throw new BadRequestException('Пользователь уже существует');

    dto.password = await bcrypt.hash(dto.password, this.saltOrRounds);

    const createdUser = await this.userService.createUser(dto);
    if (!createdUser)
      throw new BadRequestException(
        'Ошибка при создании пользователя. Проверьте данные и повторите попытку',
      );

    const createdTimer = await this.userTimerService.createTimer(
      createdUser.id,
    );

    if (!createdTimer)
      throw new BadRequestException('Ошибка при создании таймера');

    return await this.saveSession(req, createdUser);
  }

  async saveSession(req: Request, user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id.toString();

      req.session.save((error) => {
        if (error) {
          console.log(error);
          return reject(
            new InternalServerErrorException('Не удалось сохранить сессию.'),
          );
        }

        resolve(user);
      });
    });
  }
}
