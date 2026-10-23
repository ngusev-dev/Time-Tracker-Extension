import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskTypeDto, UpdateTaskTypeDto } from './dto/task-type.dto';

export const TASK_TYPE_INCLUDE = { taskType: { include: { parent: true } } };

@Injectable()
export class TaskTypeService {
  constructor(private prisma: PrismaService) {}

  async getTree() {
    return await this.prisma.taskType.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { name: 'asc' } } },
      orderBy: { name: 'asc' },
    });
  }

  async getChildren(parentId: string) {
    return await this.prisma.taskType.findMany({
      where: { parentId },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return await this.prisma.taskType.findUnique({
      where: { id },
      include: { parent: true },
    });
  }

  async create(dto: CreateTaskTypeDto) {
    const parentId = dto.parentId ?? null;

    if (parentId) {
      const parent = await this.prisma.taskType.findUnique({
        where: { id: parentId },
      });
      if (!parent) throw new NotFoundException('Parent task type not found');
      if (parent.parentId)
        throw new BadRequestException('Subtype cannot have its own subtypes');
      if (dto.color)
        throw new BadRequestException('Subtype inherits the parent color');
    } else if (!dto.color) {
      throw new BadRequestException('Color is required for a task type');
    }

    await this.assertNameIsFree(dto.name, parentId);

    return await this.prisma.taskType.create({
      data: { name: dto.name, color: dto.color ?? null, parentId },
      include: { children: true, parent: true },
    });
  }

  async update(id: string, dto: UpdateTaskTypeDto) {
    const type = await this.getOrThrow(id);

    if (dto.color && type.parentId)
      throw new BadRequestException('Subtype inherits the parent color');

    if (dto.name && dto.name !== type.name)
      await this.assertNameIsFree(dto.name, type.parentId, id);

    return await this.prisma.taskType.update({
      where: { id },
      data: { name: dto.name, color: dto.color },
      include: { children: true, parent: true },
    });
  }

  async remove(id: string) {
    const type = await this.getOrThrow(id);

    await this.prisma.$transaction(async (tx) => {
      // Задачи удаляемого подтипа остаются с типом родителя, а не теряют тип целиком
      if (type.parentId) {
        const data = { taskTypeId: type.parentId };
        const where = { taskTypeId: id };
        await tx.userTimer.updateMany({ where, data });
        await tx.timerHistory.updateMany({ where, data });
      }

      await tx.taskType.delete({ where: { id } });
    });

    return true;
  }

  async setTimerTaskType(
    userId: number,
    timerId: string,
    taskTypeId: string | null,
  ) {
    if (taskTypeId) {
      const type = await this.prisma.taskType.findUnique({
        where: { id: taskTypeId },
      });
      if (!type) throw new NotFoundException('Task type not found');
    }

    const where = { timerId, userId };
    const data = { taskTypeId };

    const [timer, history] = await this.prisma.$transaction([
      this.prisma.userTimer.updateMany({ where, data }),
      this.prisma.timerHistory.updateMany({ where, data }),
    ]);

    if (!timer.count && !history.count)
      throw new NotFoundException('Task not found');

    return await this.prisma.userTimer.findUnique({
      where: { userId },
      include: TASK_TYPE_INCLUDE,
    });
  }

  private async getOrThrow(id: string) {
    const type = await this.prisma.taskType.findUnique({ where: { id } });
    if (!type) throw new NotFoundException('Task type not found');
    return type;
  }

  private async assertNameIsFree(
    name: string,
    parentId: string | null,
    exceptId?: string,
  ) {
    const exists = await this.prisma.taskType.findFirst({
      where: { name, parentId, ...(exceptId && { id: { not: exceptId } }) },
    });
    if (exists) throw new BadRequestException('Task type already exists');
  }
}
