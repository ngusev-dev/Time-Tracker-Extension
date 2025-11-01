import { Module } from '@nestjs/common';
import { TimerStatisticService } from './timer-statistic.service';
import { TimerStatisticResolver } from './timer-statistic.resolver';
import { TimerHistoryService } from 'src/timer-history/timer-history.service';
import { TimerHistoryModule } from 'src/timer-history/timer-history.module';

@Module({
  imports: [TimerHistoryModule],
  providers: [
    TimerStatisticResolver,
    TimerStatisticService,
    TimerHistoryService,
  ],
})
export class TimerStatisticModule {}
