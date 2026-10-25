import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { TASK_TYPE_INCLUDE } from '@modules/task-type/task-type.service';
import { TimerHistoryGroupModel } from './models/TimerHistory.model';
import { CreateManualSessionDto } from './dto/create-manual-session.dto';
import { computedIntervalInSeconds } from '@shared/helpers/time.helper';
import { UuidService } from '@shared/lib/uuid/uuid.service';

const MAX_MANUAL_SESSION_SECONDS = 24 * 60 * 60;

@Injectable()
export class TimerHistoryService {
  constructor(
    private prisma: PrismaService,
    private uuid: UuidService,
  ) {}

  async createManualSession(userId: number, dto: CreateManualSessionDto) {
    if (dto.endTimer <= dto.startTimer) {
      throw new BadRequestException('Время окончания должно быть позже начала');
    }

    if (dto.endTimer > new Date()) {
      throw new BadRequestException('Нельзя внести сессию на будущее');
    }

    const totalTimeInSeconds = computedIntervalInSeconds(
      dto.startTimer,
      dto.endTimer,
    );
    if (totalTimeInSeconds > MAX_MANUAL_SESSION_SECONDS)
      throw new BadRequestException('Сессия не может быть длиннее 24 часов');

    if (dto.taskTypeId) {
      const type = await this.prisma.taskType.findUnique({
        where: { id: dto.taskTypeId },
      });
      if (!type) throw new NotFoundException('Тип задачи не найден');
    }

    const existingRecord = await this.prisma.timerHistory.findFirst({
      where: {
        userId,
        startTimer: {
          lt: dto.endTimer,
        },
        endTimer: {
          gt: dto.startTimer,
        },
      },
    });

    if (existingRecord) {
      throw new BadRequestException(
        'Сессия пересекается с уже существующей записью',
      );
    }

    const userTimer = await this.prisma.userTimer.findFirst({
      where: {
        userId,
      },
    });

    if (userTimer?.status === 'WORKING' && userTimer.startTimer! < dto.endTimer)
      throw new BadRequestException(
        'Сессия пересекается с запущенным таймером',
      );

    try {
      return await this.prisma.timerHistory.create({
        data: {
          startTimer: dto.startTimer,
          endTimer: dto.endTimer,
          totalTimeInSeconds,
          timerId: this.uuid.generateUUID_v4(),
          description: dto.description,
          taskTypeId: dto.taskTypeId,
          userId,
        },
        include: {
          user: true,
        },
      });
    } catch {
      throw new BadRequestException('Не удалось сохранить запись');
    }
  }

  async getHistoryToReport(
    startPeriod: Date,
    endPeriod: Date,
    taskTypeIds: string[],
  ) {
    const history = await this.prisma.timerHistory.groupBy({
      by: ['timerId', 'userId', 'taskTypeId'],
      where: {
        taskTypeId: {
          in: taskTypeIds,
        },
        startTimer: {
          gte: startOfDay(startPeriod),
          lte: endOfDay(endPeriod),
        },
      },
      _sum: { totalTimeInSeconds: true },
      _min: { startTimer: true },
      _max: { endTimer: true },
      _count: { _all: true },
      orderBy: { _min: { startTimer: 'asc' } },
    });

    const userIds = new Set(history.map((h) => h.userId));
    const typeIds = [
      ...new Set(history.map((h) => h.taskTypeId).filter((id) => id !== null)),
    ];

    const timerIds = [...new Set(history.map((h) => h.timerId))];

    const [users, taskTypes, descriptions] = await Promise.all([
      this.prisma.user.findMany({
        where: { id: { in: [...userIds] } },
        select: { id: true, firstName: true, lastName: true, email: true },
      }),
      this.prisma.taskType.findMany({
        where: { id: { in: typeIds } },
        include: { parent: true },
      }),

      this.prisma.timerHistory.findMany({
        where: {
          timerId: { in: timerIds },
          AND: [{ description: { not: null } }, { description: { not: '' } }],
        },
        distinct: ['timerId'],
        orderBy: [{ timerId: 'asc' }, { startTimer: 'desc' }],
        select: { timerId: true, description: true },
      }),
    ]);

    const usersMap = new Map(users.map((u) => [u.id, u]));
    const taskTypesMap = new Map(taskTypes.map((t) => [t.id, t]));
    const descriptionsMap = new Map(
      descriptions.map((d) => [d.timerId, d.description]),
    );

    return history.map((h) => ({
      ...h,
      description: descriptionsMap.get(h.timerId) ?? null,
      user: usersMap.get(h.userId),
      taskType: h.taskTypeId ? taskTypesMap.get(h.taskTypeId) : undefined,
    }));
  }

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
        ...TASK_TYPE_INCLUDE,
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
        ...TASK_TYPE_INCLUDE,
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
        ...TASK_TYPE_INCLUDE,
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
        ...TASK_TYPE_INCLUDE,
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
