import { Resolver } from '@nestjs/graphql';
import { TimerStatisticService } from './timer-statistic.service';

@Resolver()
export class TimerStatisticResolver {
  constructor(private readonly timerStatisticService: TimerStatisticService) {}
}
