import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from '@modules/user/user.module';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserTimerModule } from '@modules/user-timer/user-timer.module';
import { UuidModule } from '@shared/lib/uuid/uuid.module';
import { TimerHistoryModule } from '@modules/timer-history/timer-history.module';
import { TimerStatisticModule } from '@modules/timer-statistic/timer-statistic.module';
import { AuthModule } from '@modules/auth/auth.module';
import { MailModule } from '@shared/lib/mail/mail.module';
import { PasswordRecoveryModule } from '@modules/password-recovery/password-recovery.module';
import { HashModule } from '@shared/lib/hash/hash.module';
import { TaskTypeModule } from '@modules/task-type/task-type.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
      }),
    }),
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    UserTimerModule,
    UuidModule,
    TimerHistoryModule,
    TimerStatisticModule,
    AuthModule,
    MailModule,
    PasswordRecoveryModule,
    HashModule,
    TaskTypeModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
