import { Args, Query, Resolver } from '@nestjs/graphql';
import { TimerHistoryService } from './timer-history.service';
import {
  TimerHistoryGroupModel,
  TimerHistoryModel,
} from './models/TimerHistory.model';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class TimerHistoryResolver {
  constructor(private readonly timerHistoryService: TimerHistoryService) {}

  @Query(() => [TimerHistoryModel])
  async getByTimerId(
    @Authorized('id') userId: number,
    @Args({ name: 'timerId', type: () => String }) timerId: string,
  ) {
    return await this.timerHistoryService.getByTimerId(userId, timerId);
  }

  @Query(() => [TimerHistoryModel])
  async getByPeriod(
    @Authorized('id') userId: number,
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
    @Authorized('id') userId: number,
    @Args({ name: 'startPeriod', type: () => Date }) startPeriod: Date,
    @Args({ name: 'endPeriod', type: () => Date }) endPeriod: Date,
  ) {
    return await this.timerHistoryService.getTimerHistoryGroupByTimerId(
      userId,
      startPeriod,
      endPeriod,
    );
  }

  @Query(() => [TimerHistoryGroupModel])
  async getTimerHistoryGroupByDate(
    @Authorized('id') userId: number,
    @Args({ name: 'startPeriod', type: () => Date }) startPeriod: Date,
    @Args({ name: 'endPeriod', type: () => Date }) endPeriod: Date,
  ) {
    return await this.timerHistoryService.getTimerHistoryGroupByDate(
      userId,
      startPeriod,
      endPeriod,
    );
  }
}
