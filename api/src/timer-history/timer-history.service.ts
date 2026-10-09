import { Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { TimerHistoryGroupModel } from './models/TimerHistory.model';

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

  async getByPeriod(userId: number, startPeriod: Date, endPeriod: Date) {
    return await this.prisma.timerHistory.findMany({
      where: {
        startTimer: {
          gte: startOfDay(startPeriod),
          lte: endOfDay(endPeriod),
        },
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async getTimerHistoryGroupByTimerId(
    userId: number,
    startPeriod: Date,
    endPeriod: Date,
  ) {
    const list = await this.prisma.timerHistory.findMany({
      where: {
        startTimer: {
          gte: startOfDay(startPeriod),
          lte: endOfDay(endPeriod),
        },
        userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        startTimer: 'desc',
      },
    });

    return this.groupByTimerId(list);
  }

  async getRecentTimerGroups(userId: number, limit: number) {
    const recent = await this.prisma.timerHistory.groupBy({
      by: ['timerId'],
      where: {
        userId,
      },
      _max: {
        startTimer: true,
      },
      orderBy: {
        _max: {
          startTimer: 'desc',
        },
      },
      take: limit,
    });

    const list = await this.prisma.timerHistory.findMany({
      where: {
        userId,
        timerId: { in: recent.map((x) => x.timerId) },
      },
      include: {
        user: true,
      },
      orderBy: {
        startTimer: 'desc',
      },
    });

    return this.groupByTimerId(list);
  }

  private groupByTimerId(list: TimerHistoryGroupModel['records']) {
    return list.reduce((acc, record) => {
      const index = acc.findIndex((x) => x.groupField === record.timerId);
      if (index === -1) {
        acc.push({
          groupField: record.timerId,
          records: [record],
        });
      } else {
        acc[index].records.push(record);
      }

      return acc;
    }, [] as TimerHistoryGroupModel[]);
  }

  async getTimerHistoryGroupByDate(
    userId: number,
    startPeriod: Date,
    endPeriod: Date,
  ) {
    const list = await this.prisma.timerHistory.findMany({
      where: {
        startTimer: {
          gte: startOfDay(startPeriod),
          lte: endOfDay(endPeriod),
        },
        userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        startTimer: 'desc',
      },
    });

    const groupByDate = list.reduce((acc, record) => {
      const groupDateValue = startOfDay(record.startTimer).getTime();

      const index = acc.findIndex((x) => x.groupField === groupDateValue);

      if (index === -1) {
        acc.push({
          groupField: groupDateValue,
          records: [record],
        });
      } else {
        acc[index].records.push(record);
      }

      return acc;
    }, [] as TimerHistoryGroupModel[]);

    return groupByDate;
  }
}
