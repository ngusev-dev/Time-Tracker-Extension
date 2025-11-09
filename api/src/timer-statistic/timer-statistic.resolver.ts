import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TimerStatisticService } from './timer-statistic.service';
import { TimerStatisticModel } from './models/TimerStatistic.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Resolver()
export class TimerStatisticResolver {
  constructor(private readonly timerStatisticService: TimerStatisticService) {}

  @UseGuards(AuthGuard)
  @Query(() => TimerStatisticModel)
  async getWeekStatistic(
    @Authorized('id') userId: number,
    @Args({ name: 'weekOffset', type: () => Int, nullable: true })
    weekOffset: number = 0,
  ) {
    return await this.timerStatisticService.getWeekStatistic(
      userId,
      weekOffset,
    );
  }
}
