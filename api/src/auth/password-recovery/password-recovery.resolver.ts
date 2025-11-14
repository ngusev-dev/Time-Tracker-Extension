import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PasswordRecoveryService } from './password-recovery.service';

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
}
