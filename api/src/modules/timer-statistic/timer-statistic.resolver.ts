import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TimerStatisticService } from './timer-statistic.service';
import { TimerStatisticModel } from './models/TimerStatistic.model';
import { Authorized } from '@shared/decorators/authorized.decorator';
import { Protected } from '@shared/decorators/protected.decorator';

@Protected()
@Resolver()
export class TimerStatisticResolver {
  constructor(private readonly timerStatisticService: TimerStatisticService) {}

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
