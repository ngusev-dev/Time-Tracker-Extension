import { Injectable, NotFoundException } from '@nestjs/common';
import { MailService } from 'src/lib/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async reset(email: string) {
    const existingUser = await this.userService.getUserByEmail(email);

    if (!existingUser) {
      throw new NotFoundException(
        'Пользователь не найден. Пожалуйста, проверьте введенный адрес электронной почты и попробуйте снова',
      );
    }

    await this.mailService.sendPasswordReset(email, existingUser.firstName);

    return true;
  }
}
