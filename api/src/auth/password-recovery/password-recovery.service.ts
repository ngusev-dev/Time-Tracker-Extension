import { Injectable, NotFoundException } from '@nestjs/common';
import { Token } from 'generated/prisma/client';
import { TokenType } from 'generated/prisma/enums';
import { UserModel } from 'generated/prisma/models';
import { MailService } from 'src/lib/mail/mail.service';
import { UuidService } from 'src/lib/uuid/uuid.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private mailService: MailService,
    private uuidService: UuidService,
  ) {}

  async reset(email: string) {
    const existingUser = await this.userService.getUserByEmail(email);

    if (!existingUser) {
      throw new NotFoundException(
        'Пользователь не найден. Пожалуйста, проверьте введенный адрес электронной почты и попробуйте снова',
      );
    }

    const passwordResetToken =
      await this.generatePasswordResetToken(existingUser);

    if (!passwordResetToken.code)
      throw new NotFoundException(
        'Не удалось создать код для восстановления. Пожалуйста, попробуйте позже',
      );

    await this.mailService.sendPasswordReset(
      email,
      existingUser.firstName,
      passwordResetToken.code,
    );

    return true;
  }

  async validateResetCode(code: number, email: string) {
    const tokenPayload = await this.prismaService.token.findFirst({
      where: {
        email,
        code,
      },
    });

    if (!tokenPayload)
      throw new NotFoundException('Неверный код восстановления');

    return tokenPayload.token;
  }

  private async generatePasswordResetToken(user: UserModel): Promise<Token> {
    const { id, email } = user;
    const token = this.uuidService.generateUUID_v4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        userId: id,
        email,
        type: TokenType.RESET_PASSWORD,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          userId: id,
          type: TokenType.RESET_PASSWORD,
        },
      });
    }

    const verificationToken = await this.prismaService.token.create({
      data: {
        userId: id,
        email,
        token,
        code: Math.floor(1000 + Math.random() * 9000),
        expiresIn,
        type: TokenType.RESET_PASSWORD,
      },
    });

    return verificationToken;
  }
}
