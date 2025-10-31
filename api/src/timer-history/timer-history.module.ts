import { Module } from '@nestjs/common';
import { TimerHistoryService } from './timer-history.service';
import { TimerHistoryResolver } from './timer-history.resolver';

@Module({
  providers: [TimerHistoryResolver, TimerHistoryService],
})
export class TimerHistoryModule {}
