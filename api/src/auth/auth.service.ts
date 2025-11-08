import { BadRequestException, Injectable } from '@nestjs/common';

import { RegistrationDto } from './dto/registration.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserTimerService } from 'src/user-timer/user-timer.service';

@Injectable()
export class AuthService {
  saltOrRounds = 10;

  constructor(
    private userService: UserService,
    private userTimerService: UserTimerService,
  ) {}

  loginUser() {}

  async registrationUser(dto: RegistrationDto) {
    const candidate = await this.userService.checkUserExist(
      dto.email,
      dto.login,
    );
    if (candidate) throw new BadRequestException('User already exist');

    dto.password = await bcrypt.hash(dto.password, this.saltOrRounds);

    const createdUser = await this.userService.createUser(dto);
    if (!createdUser)
      throw new BadRequestException('Error when creating a user');

    const createdTimer = await this.userTimerService.createTimer(
      createdUser.id,
    );

    if (!createdTimer)
      throw new BadRequestException('Error when creating a user timer!');

    return createdUser;
  }
}
