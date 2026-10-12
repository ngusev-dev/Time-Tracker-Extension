import { Module } from '@nestjs/common';
import {
  TaskTypeResolver,
  TimerHistoryTaskTypeResolver,
  UserTimerTaskTypeResolver,
} from './task-type.resolver';
import { TaskTypeService } from './task-type.service';

@Module({
  providers: [
    TaskTypeResolver,
    UserTimerTaskTypeResolver,
    TimerHistoryTaskTypeResolver,
    TaskTypeService,
  ],
  exports: [TaskTypeService],
})
export class TaskTypeModule {}
