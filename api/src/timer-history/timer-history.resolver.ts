import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TimerHistoryService } from './timer-history.service';
import {
  TimerHistoryGroupModel,
  TimerHistoryModel,
} from './models/TimerHistory.model';

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
    @Args({ name: 'startPeriod', type: () => Date }) startPeriod: Date,
    @Args({ name: 'endPeriod', type: () => Date }) endPeriod: Date,
  ) {
    return await this.timerHistoryService.getByPeriod(
      userId,
      startPeriod,
      endPeriod,
    );
  }

  @Query(() => [TimerHistoryGroupModel])
  async getTimerHistoryGroupByTimerId(
    @Args({ name: 'userId', type: () => Int }) userId: number,
    @Args({ name: 'startPeriod', type: () => Date }) startPeriod: Date,
    @Args({ name: 'endPeriod', type: () => Date }) endPeriod: Date,
  ) {
    return await this.timerHistoryService.getTimerHistoryGroupByTimerId(
      userId,
      startPeriod,
      endPeriod,
    );
  }
}
