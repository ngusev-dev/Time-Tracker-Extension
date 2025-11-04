import { Injectable } from '@nestjs/common';
import { addDays, format, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import { TimerHistoryService } from 'src/timer-history/timer-history.service';
import { HistoryItemModel } from './models/TimerStatistic.model';
import { TimerHistoryModel } from 'src/timer-history/models/TimerHistory.model';

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

    const computedTotalTimeInSeconds = (entries: TimerHistoryModel[]) => {
      return entries.reduce((acc, item) => (acc += item.totalTimeInSeconds), 0);
    };

    const weekHistory: HistoryItemModel[] = Object.entries(daysGroup).map(
      ([day, entries]: [day: string, entries: TimerHistoryModel[]]) => ({
        day,
        entries,
        general: {
          totalTimeInSeconds: computedTotalTimeInSeconds(entries),
          percent: (
            (computedTotalTimeInSeconds(entries) * 100) /
            (24 * 60 * 60)
          ).toFixed(2),
        },
      }),
    );

    return {
      startPeriod,
      endPeriod,
      history: weekHistory,
      length: history.length,
    };
  }
}
