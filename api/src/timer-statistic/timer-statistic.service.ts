import { Injectable } from '@nestjs/common';
import { addDays, format, startOfDay, startOfWeek, subWeeks } from 'date-fns';
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

    const daysGroup = history.reduce((group, item) => {
      const dayKey = format(item.startTimer, 'EEEE');

      if (!group[dayKey]) group[dayKey] = [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      group[dayKey].push(item);

      return group;
    }, {});

    const weekHistory = Object.entries(daysGroup).map(([day, entries]) => ({
      day,
      entries,
    }));

    return {
      startPeriod,
      endPeriod,
      history: weekHistory,
      length: history.length,
    };
  }
}
