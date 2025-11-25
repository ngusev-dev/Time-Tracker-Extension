import { Injectable, NotFoundException } from '@nestjs/common';
import { Token } from 'generated/prisma/client';
import { TokenType } from 'generated/prisma/enums';
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

    const passwordResetToken = await this.generatePasswordResetToken(
      existingUser.id,
    );

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

  private async generatePasswordResetToken(userId: number): Promise<Token> {
    const token = this.uuidService.generateUUID_v4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        userId,
        type: TokenType.RESET_PASSWORD,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          userId,
          type: TokenType.RESET_PASSWORD,
        },
      });
    }

    const verificationToken = await this.prismaService.token.create({
      data: {
        userId,
        token,
        code: Math.floor(1000 + Math.random() * 9000),
        expiresIn,
        type: TokenType.RESET_PASSWORD,
      },
    });

    return verificationToken;
  }
}
