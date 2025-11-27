import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserTimerModule } from './user-timer/user-timer.module';
import { UuidModule } from './lib/uuid/uuid.module';
import { TimerHistoryModule } from './timer-history/timer-history.module';
import { TimerStatisticModule } from './timer-statistic/timer-statistic.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './lib/mail/mail.module';
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module';
import { HashModule } from './lib/hash/hash.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
