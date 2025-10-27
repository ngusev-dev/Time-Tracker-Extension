import { Module } from '@nestjs/common';
import { UserTimerService } from './user-timer.service';
import { UserTimerResolver } from './user-timer.resolver';

@Module({
  providers: [UserTimerResolver, UserTimerService],
})
export class UserTimerModule {}
