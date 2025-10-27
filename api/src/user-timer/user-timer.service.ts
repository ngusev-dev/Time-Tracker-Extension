import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    if (timer?.status === 'PAUSE') {
      return await this.prisma.userTimer.update({
        data: {
          status: 'WORKING',
        },
        where: {
          userId,
        },
      });
    }

    return await this.prisma.userTimer.update({
      data: {
        startTimer: new Date(),
        status: 'WORKING',
      },
      where: {
        userId,
      },
    });
  }

  async pauseTimer(userId: number) {
    return await this.prisma.userTimer.update({
      data: {
        endTimer: new Date(),
        status: 'PAUSE',
      },
      where: {
        userId,
      },
    });
  }

  async stopTimer(userId: number) {
    const timer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    if (!timer) throw new NotFoundException('Timer not found');

    try {
      const endTimer = new Date();
      await this.prisma.timerHistory.create({
        data: {
          startTimer: timer.startTimer!,
          endTimer,
          userId: timer.userId,
          totalTime:
            (endTimer.getTime() - timer.startTimer!.getTime()) / 1000 / 60 / 60,
        },
      });
    } catch {
      throw new BadRequestException('Error saving the timer');
    }

    return true;
  }
}
