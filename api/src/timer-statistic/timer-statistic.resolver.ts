import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TimerStatisticService } from './timer-statistic.service';
import { TimerStatisticModel } from './models/TimerStatistic.model';

@Resolver()
export class TimerStatisticResolver {
  constructor(private readonly timerStatisticService: TimerStatisticService) {}

  @Query(() => TimerStatisticModel)
  async getWeekStatistic(
    @Args({ name: 'userId', type: () => Int }) userId: number,
    @Args({ name: 'weekOffset', type: () => Int, nullable: true })
    weekOffset: number = 0,
  ) {
    return await this.timerStatisticService.getWeekStatistic(
      userId,
      weekOffset,
    );
  }
}
