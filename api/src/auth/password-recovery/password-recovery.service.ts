import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { randomInt } from 'crypto';
import { Token } from 'generated/prisma/client';
import { TokenType } from 'generated/prisma/enums';
import { TokenModel, UserModel } from 'generated/prisma/models';
import { HashService } from 'src/lib/hash/hash.service';
import { MailService } from 'src/lib/mail/mail.service';
import { UuidService } from 'src/lib/uuid/uuid.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

/** Время жизни кода восстановления */
const RESET_CODE_TTL_MS = 15 * 60 * 1000;
/** Максимальное число попыток ввода кода */
const RESET_CODE_MAX_ATTEMPTS = 5;
/** Минимальный интервал между повторными отправками кода */
const RESET_RESEND_COOLDOWN_MS = 60 * 1000;

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private mailService: MailService,
    private uuidService: UuidService,
    private hashService: HashService,
  ) {}

  async reset(email: string) {
    const existingUser = await this.userService.getUserByEmail(email);

    // Не раскрываем, зарегистрирован ли e-mail
    if (!existingUser) return true;

    const existingToken = await this.findResetToken(email);
    if (existingToken && this.isResendCooldownActive(existingToken))
      return true;

    const passwordResetToken =
      await this.generatePasswordResetToken(existingUser);

    await this.mailService.sendPasswordReset(
      email,
      existingUser.firstName,
      passwordResetToken.code!,
    );

    return true;
  }

  async validateResetCode(code: number, email: string) {
    const tokenPayload = await this.findResetToken(email);

    if (!tokenPayload)
      throw new BadRequestException('Неверный код восстановления');

    if (
      this.isTokenExpired(tokenPayload) ||
      tokenPayload.attempts >= RESET_CODE_MAX_ATTEMPTS
    ) {
      await this.deleteToken(tokenPayload.id);
      throw new BadRequestException(
        'Код восстановления недействителен. Пожалуйста, запросите новый код',
      );
    }

    if (tokenPayload.code !== code) {
      const { attempts } = await this.prismaService.token.update({
        where: { id: tokenPayload.id },
        data: { attempts: { increment: 1 } },
      });

      const attemptsLeft = RESET_CODE_MAX_ATTEMPTS - attempts;

      if (attemptsLeft <= 0) {
        await this.deleteToken(tokenPayload.id);
        throw new BadRequestException(
          'Превышено число попыток. Пожалуйста, запросите новый код',
        );
      }

      throw new BadRequestException(
        `Неверный код восстановления. Осталось попыток: ${attemptsLeft}`,
      );
    }

    return tokenPayload.token;
  }

  async changePassword(email: string, password: string, token: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        token,
        email,
        type: TokenType.RESET_PASSWORD,
      },
    });

    if (!existingToken)
      throw new BadRequestException(
        'Токен восстановления не найден. Повторите попытку позже',
      );

    if (this.isTokenExpired(existingToken)) {
      await this.deleteToken(existingToken.id);
      throw new BadRequestException(
        'Срок действия кода восстановления истек. Пожалуйста, повторите попытку',
      );
    }

    const newPasswordHash = await this.hashService.hash(password);

    try {
      await this.prismaService.$transaction([
        this.prismaService.user.update({
          where: {
            email: existingToken.email,
            id: existingToken.userId,
          },
          data: {
            password: newPasswordHash,
          },
        }),
        // Токен одноразовый
        this.prismaService.token.delete({
          where: { id: existingToken.id },
        }),
        // Завершаем все активные сессии пользователя
        this.prismaService
          .$executeRaw`DELETE FROM "session" WHERE sess->>'userId' = ${existingToken.userId.toString()}`,
      ]);
    } catch {
      throw new InternalServerErrorException(
        'Не удалось обновить пароль. Пожалуйста, повторите попытку позже',
      );
    }

    return true;
  }

  private async findResetToken(email: string) {
    return await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.RESET_PASSWORD,
      },
    });
  }

  private async deleteToken(id: number) {
    await this.prismaService.token.deleteMany({ where: { id } });
  }

  private isTokenExpired(token: TokenModel): boolean {
    const { expiresIn } = token;
    return new Date() > new Date(expiresIn);
  }

  private isResendCooldownActive(token: TokenModel): boolean {
    const createdAt = new Date(token.expiresIn).getTime() - RESET_CODE_TTL_MS;
    return Date.now() - createdAt < RESET_RESEND_COOLDOWN_MS;
  }

  private async generatePasswordResetToken(user: UserModel): Promise<Token> {
    const { id, email } = user;
    const token = this.uuidService.generateUUID_v4();
    const expiresIn = new Date(Date.now() + RESET_CODE_TTL_MS);

    await this.prismaService.token.deleteMany({
      where: {
        userId: id,
        type: TokenType.RESET_PASSWORD,
      },
    });

    return await this.prismaService.token.create({
      data: {
        userId: id,
        email,
        token,
        code: randomInt(100000, 1000000),
        attempts: 0,
        expiresIn,
        type: TokenType.RESET_PASSWORD,
      },
    });
  }
}
