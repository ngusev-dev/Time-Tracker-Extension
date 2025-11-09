import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserTimerService } from './user-timer.service';
import { UserTimerModel } from './models/UserTimer.model';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class UserTimerResolver {
  constructor(private readonly userTimerService: UserTimerService) {}

  @Query(() => UserTimerModel)
  async getTimer(@Authorized('id') userId: number) {
    return await this.userTimerService.getTimer(userId);
  }

  @Mutation(() => UserTimerModel)
  async createUserTimer(@Authorized('id') userId: number) {
    return await this.userTimerService.createTimer(userId);
  }

  @Mutation(() => UserTimerModel)
  async startTimer(
    @Authorized('id') userId: number,
    @Args({ name: 'description', type: () => String, nullable: true })
    description: string | null,
  ) {
    return await this.userTimerService.startTimer(userId, description);
  }

  @Mutation(() => UserTimerModel)
  async pauseTimer(
    @Authorized('id') userId: number,
    @Args({ name: 'description', type: () => String, nullable: true })
    description: string | null,
  ) {
    return await this.userTimerService.pauseTimer(userId, description);
  }

  @Mutation(() => UserTimerModel)
  async stopTimer(
    @Authorized('id') userId: number,
    @Args({ name: 'description', type: () => String, nullable: true })
    description: string | null,
  ) {
    return await this.userTimerService.stopTimer(userId, description);
  }
}
