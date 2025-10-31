import { Module } from '@nestjs/common';
import { TimerStatisticService } from './timer-statistic.service';
import { TimerStatisticResolver } from './timer-statistic.resolver';

@Module({
  providers: [TimerStatisticResolver, TimerStatisticService],
})
export class TimerStatisticModule {}
