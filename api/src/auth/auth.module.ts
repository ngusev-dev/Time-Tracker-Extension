import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { UserTimerModule } from 'src/user-timer/user-timer.module';

@Module({
  imports: [UserModule, UserTimerModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
