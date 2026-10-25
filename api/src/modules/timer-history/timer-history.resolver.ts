import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TimerHistoryService } from './timer-history.service';
import {
  TimerHistoryGroupModel,
  TimerHistoryModel,
} from './models/TimerHistory.model';
import { Authorized } from '@shared/decorators/authorized.decorator';
import { Protected } from '@shared/decorators/protected.decorator';
import { CreateManualSessionDto } from './dto/create-manual-session.dto';

@Protected()
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
  async getRecentTimerGroups(
    @Authorized('id') userId: number,
    @Args({ name: 'limit', type: () => Int, defaultValue: 3 }) limit: number,
  ) {
    return await this.timerHistoryService.getRecentTimerGroups(userId, limit);
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

  @Mutation(() => TimerHistoryModel)
  async createManualSession(
    @Authorized('id') userId: number,
    @Args('input') input: CreateManualSessionDto,
  ) {
    return await this.timerHistoryService.createManualSession(userId, input);
  }
}
