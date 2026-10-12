import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TimerHistoryModel } from 'src/timer-history/models/TimerHistory.model';
import { UserTimerModel } from 'src/user-timer/models/UserTimer.model';
import { CreateTaskTypeDto, UpdateTaskTypeDto } from './dto/task-type.dto';
import { TaskTypeModel } from './models/TaskType.model';
import { TaskTypeService } from './task-type.service';

@UseGuards(AuthGuard)
@Resolver(() => TaskTypeModel)
export class TaskTypeResolver {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @Query(() => [TaskTypeModel])
  async taskTypes() {
    return await this.taskTypeService.getTree();
  }

  @Mutation(() => TaskTypeModel)
  async createTaskType(@Args('input') input: CreateTaskTypeDto) {
    return await this.taskTypeService.create(input);
  }

  @Mutation(() => TaskTypeModel)
  async updateTaskType(
    @Args('id') id: string,
    @Args('input') input: UpdateTaskTypeDto,
  ) {
    return await this.taskTypeService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteTaskType(@Args('id') id: string) {
    return await this.taskTypeService.remove(id);
  }

  @Mutation(() => UserTimerModel)
  async setTimerTaskType(
    @Authorized('id') userId: number,
    @Args('timerId') timerId: string,
    @Args({ name: 'taskTypeId', type: () => String, nullable: true })
    taskTypeId: string | null,
  ) {
    return await this.taskTypeService.setTimerTaskType(
      userId,
      timerId,
      taskTypeId,
    );
  }

  @ResolveField(() => String, { nullable: true })
  async color(@Parent() type: TaskTypeModel) {
    if (type.color || !type.parentId) return type.color;
    if (type.parent) return type.parent.color;
    return (await this.taskTypeService.findById(type.parentId))?.color ?? null;
  }

  @ResolveField(() => [TaskTypeModel])
  async children(@Parent() type: TaskTypeModel) {
    return type.children ?? (await this.taskTypeService.getChildren(type.id));
  }

  @ResolveField(() => TaskTypeModel, { nullable: true })
  async parent(@Parent() type: TaskTypeModel) {
    if (type.parent !== undefined) return type.parent;
    if (!type.parentId) return null;
    return await this.taskTypeService.findById(type.parentId);
  }
}

// Поле taskType на таймере и записях истории: берём уже подгруженное, иначе читаем из БД
@Resolver(() => UserTimerModel)
export class UserTimerTaskTypeResolver {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @ResolveField(() => TaskTypeModel, { nullable: true })
  async taskType(@Parent() timer: UserTimerModel) {
    if (timer.taskType !== undefined) return timer.taskType;
    if (!timer.taskTypeId) return null;
    return await this.taskTypeService.findById(timer.taskTypeId);
  }
}

@Resolver(() => TimerHistoryModel)
export class TimerHistoryTaskTypeResolver {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @ResolveField(() => TaskTypeModel, { nullable: true })
  async taskType(@Parent() record: TimerHistoryModel) {
    if (record.taskType !== undefined) return record.taskType;
    if (!record.taskTypeId) return null;
    return await this.taskTypeService.findById(record.taskTypeId);
  }
}
