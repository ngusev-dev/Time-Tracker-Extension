import { Module } from '@nestjs/common';
import { UserTimerService } from './user-timer.service';
import { UserTimerResolver } from './user-timer.resolver';
import { UuidModule } from 'src/uuid/uuid.module';

@Module({
  imports: [UuidModule],
  providers: [UserTimerResolver, UserTimerService],
  exports: [UserTimerService],
})
export class UserTimerModule {}
