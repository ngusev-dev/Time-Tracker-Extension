import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TimerHistoryService } from './timer-history.service';
import { TimerHistoryModel } from './models/TimerHistory.model';
import { PERIOD } from './constants/period.constants';

@Resolver()
export class TimerHistoryResolver {
  constructor(private readonly timerHistoryService: TimerHistoryService) {}

  @Query(() => [TimerHistoryModel])
  async getByTimerId(
    @Args({ name: 'userId', type: () => Int }) userId: number,
    @Args({ name: 'timerId', type: () => String }) timerId: string,
  ) {
    return await this.timerHistoryService.getByTimerId(userId, timerId);
  }

  @Query(() => [TimerHistoryModel])
  async getByPeriod(
    @Args({ name: 'userId', type: () => Int }) userId: number,
    @Args({ name: 'period', type: () => PERIOD }) period: keyof typeof PERIOD,
  ) {
    return await this.timerHistoryService.getByPeriod(userId, period);
  }
}
