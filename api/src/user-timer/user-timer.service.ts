import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { computedIntervalInSeconds } from './helpers/time.helper';
import { UuidService } from 'src/lib/uuid/uuid.service';

@Injectable()
export class UserTimerService {
  constructor(
    private prisma: PrismaService,
    private uuid: UuidService,
  ) {}

  async getTimer(userId: number) {
    const timer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    if (timer?.status === 'WORKING') {
      timer.totalTimeInSeconds += computedIntervalInSeconds(
        timer.startTimer!,
        new Date(),
      );
    }

    return timer;
  }

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

  async startTimer(userId: number, description: string | null) {
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
        description,
      },
      where: {
        userId,
      },
    });
  }

  async pauseTimer(userId: number, description: string | null) {
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
        description,
      },
      where: {
        userId,
      },
    });

    await this.saveTimerRecordHistory(userId, description);

    return updatedTimer;
  }

  async stopTimer(userId: number, description: string | null) {
    const timer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    try {
      if (timer?.status === 'WORKING')
        await this.saveTimerRecordHistory(userId, description);

      return await this.resetTimer(userId);
    } catch {
      throw new BadRequestException('Error saving the timer');
    }
  }

  private async saveTimerRecordHistory(
    userId: number,
    description: string | null,
  ) {
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
        timerId: timer.timerId,
        description,
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
        description: null,
        timerId: this.uuid.generateUUID_v4(),
      },
      where: {
        userId,
      },
    });
  }
}
