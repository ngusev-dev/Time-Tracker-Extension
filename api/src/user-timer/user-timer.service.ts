import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { computedIntervalInSeconds } from './helpers/time.helper';

@Injectable()
export class UserTimerService {
  constructor(private prisma: PrismaService) {}

  async createTimer(userId: number) {
    const timer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    if (timer) throw new BadRequestException('Timer is already exists!');

    return await this.prisma.userTimer.create({
      data: {
        status: 'NEW',
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async startTimer(userId: number) {
    const timer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    if (timer?.status === 'WORKING')
      throw new BadRequestException('Timer is already started!');

    return await this.prisma.userTimer.update({
      data: {
        startTimer: new Date(),
        endTimer: null,
        status: 'WORKING',
      },
      where: {
        userId,
      },
    });
  }

  async pauseTimer(userId: number) {
    const timer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    if (timer?.status === 'PAUSE')
      throw new BadRequestException('Timer is already paused!');

    const timeNow = new Date();

    const updatedTimer = await this.prisma.userTimer.update({
      data: {
        totalTimeInSeconds:
          timer!.totalTimeInSeconds +
          computedIntervalInSeconds(timer!.startTimer!, timeNow),
        endTimer: timeNow,
        status: 'PAUSE',
      },
      where: {
        userId,
      },
    });

    await this.saveTimerRecordHistory(userId);

    return updatedTimer;
  }

  async stopTimer(userId: number) {
    const timer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    try {
      if (timer?.status === 'WORKING')
        await this.saveTimerRecordHistory(userId);

      return await this.resetTimer(userId);
    } catch {
      throw new BadRequestException('Error saving the timer');
    }
  }

  private async saveTimerRecordHistory(userId: number) {
    const timer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    if (!timer) throw new NotFoundException('Timer not found');

    if (timer.status === 'NEW')
      throw new NotFoundException('Timer did not start working!');

    const endTimer = timer.endTimer || new Date();

    const totalTimeInSeconds = computedIntervalInSeconds(
      timer.startTimer!,
      endTimer,
    );

    return await this.prisma.timerHistory.create({
      data: {
        startTimer: timer.startTimer!,
        endTimer: endTimer,
        totalTimeInSeconds,
        user: {
          connect: { id: timer.userId },
        },
      },
      include: {
        user: true,
      },
    });
  }

  private async resetTimer(userId: number) {
    return await this.prisma.userTimer.update({
      data: {
        startTimer: null,
        endTimer: null,
        totalTimeInSeconds: 0,
        status: 'NEW',
      },
      where: {
        userId,
      },
    });
  }
}
