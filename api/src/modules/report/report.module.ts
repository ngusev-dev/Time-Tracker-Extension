import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TimerHistoryModule } from '@modules/timer-history/timer-history.module';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [TimerHistoryModule],
})
export class ReportModule {}
