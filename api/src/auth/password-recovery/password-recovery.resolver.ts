import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PasswordRecoveryService } from './password-recovery.service';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class PasswordRecoveryResolver {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Mutation(() => Boolean)
  async resetPassword(
    @Args({ name: 'email', type: () => String }) email: string,
  ) {
    return await this.passwordRecoveryService.reset(email);
  }

  @Mutation(() => String)
  async validateResetCode(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'code', type: () => Int }) code: number,
  ) {
    return await this.passwordRecoveryService.validateResetCode(code, email);
  }

  @Mutation(() => String)
  async changePassword(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context() context: any,
  ) {
    const token = (context.req as Request).query.token;

    if (!token)
      throw new BadRequestException('Отсутсвует токен восстановления');

    return await this.passwordRecoveryService.changePassword(
      email,
      password,
      token as string,
    );
  }
}
