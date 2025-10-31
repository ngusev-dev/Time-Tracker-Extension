import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PERIOD } from './constants/period.constants';

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

  async getByPeriod(userId: number, period: keyof typeof PERIOD) {
    const endPeriod = new Date();
    let startPeriod;

    switch (period) {
      case 'DAY':
        startPeriod = new Date(Date.now() - 1000 * 60 * 60 * 24);
        return await this.prisma.timerHistory.findMany({
          where: {
            startTimer: {
              gte: startPeriod,
              lte: endPeriod,
            },
            userId,
          },
        });
      case 'WEEK':
        startPeriod = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
        return await this.prisma.timerHistory.findMany({
          where: {
            startTimer: {
              gte: startPeriod,
              lte: endPeriod,
            },
            userId,
          },
        });
      case 'MONTH':
        startPeriod = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
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
  }
}
