import { Injectable } from '@nestjs/common';
import { addDays, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import { TimerHistoryService } from 'src/timer-history/timer-history.service';

@Injectable()
export class TimerStatisticService {
  constructor(private timerHistoryService: TimerHistoryService) {}

  async getWeekStatistic(userId: number, weekOffset: number = 0) {
    const now = new Date();
    const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const startPeriod = startOfDay(subWeeks(thisWeekStart, weekOffset));
    const endPeriod = addDays(startPeriod, 6);

    const history = await this.timerHistoryService.getByPeriod(
      userId,
      startPeriod,
      endPeriod,
    );

    return {
      startPeriod,
      endPeriod,
      history,
      length: history.length,
    };
  }
}
