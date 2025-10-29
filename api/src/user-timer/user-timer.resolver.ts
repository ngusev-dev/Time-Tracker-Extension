import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserTimerService } from './user-timer.service';
import { UserTimerModel } from './models/UserTimer.model';

@Resolver()
export class UserTimerResolver {
  constructor(private readonly userTimerService: UserTimerService) {}

  @Query(() => UserTimerModel)
  async getTimer(@Args({ name: 'userId', type: () => Int }) userId: number) {
    return await this.userTimerService.getTimer(userId);
  }

  @Mutation(() => UserTimerModel)
  async createUserTimer(
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return await this.userTimerService.createTimer(userId);
  }

  @Mutation(() => UserTimerModel)
  async startTimer(@Args({ name: 'userId', type: () => Int }) userId: number) {
    return await this.userTimerService.startTimer(userId);
  }

  @Mutation(() => UserTimerModel)
  async pauseTimer(@Args({ name: 'userId', type: () => Int }) userId: number) {
    return await this.userTimerService.pauseTimer(userId);
  }

  @Mutation(() => UserTimerModel)
  async stopTimer(@Args({ name: 'userId', type: () => Int }) userId: number) {
    return await this.userTimerService.stopTimer(userId);
  }
}
