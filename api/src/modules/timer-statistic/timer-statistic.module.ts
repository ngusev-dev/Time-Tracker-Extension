import { Module } from '@nestjs/common';
import { TimerStatisticService } from './timer-statistic.service';
import { TimerStatisticResolver } from './timer-statistic.resolver';
import { TimerHistoryService } from '@modules/timer-history/timer-history.service';
import { TimerHistoryModule } from '@modules/timer-history/timer-history.module';

@Module({
  imports: [TimerHistoryModule],
  providers: [
    TimerStatisticResolver,
    TimerStatisticService,
    TimerHistoryService,
  ],
})
export class TimerStatisticModule {}
