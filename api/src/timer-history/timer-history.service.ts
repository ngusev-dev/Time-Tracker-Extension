import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PERIOD } from './constants/period.constants';
import {
  addDays,
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';

@Injectable()
export class TimerHistoryService {
  constructor(private prisma: PrismaService) {}

  async getByTimerId(userId: number, timerId: string) {
    return await this.prisma.timerHistory.findMany({
      where: {
        timerId,
        userId,
      },
    });
  }

  async getByPeriod(
    userId: number,
    period: keyof typeof PERIOD,
    offset: number = 0,
  ) {
    const now = new Date();

    switch (period) {
      case 'DAY': {
        const dayDate = subDays(now, offset);
        const startPeriod = startOfDay(dayDate);
        const endPeriod = endOfDay(dayDate);

        return await this.prisma.timerHistory.findMany({
          where: {
            startTimer: {
              gte: startPeriod,
              lte: endPeriod,
            },
            userId,
          },
        });
      }
      case 'WEEK': {
        const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
        const weekStart = subWeeks(thisWeekStart, offset);
        const weekEnd = addDays(weekStart, 6);

        return await this.prisma.timerHistory.findMany({
          where: {
            startTimer: {
              gte: weekStart,
              lte: weekEnd,
            },
            userId,
          },
        });
      }
      case 'MONTH': {
        const monthStart = startOfMonth(subMonths(now, offset));
        const monthEnd = endOfMonth(monthStart);

        return await this.prisma.timerHistory.findMany({
          where: {
            startTimer: {
              gte: monthStart,
              lte: monthEnd,
            },
            userId,
          },
        });
      }
    }
  }
}
