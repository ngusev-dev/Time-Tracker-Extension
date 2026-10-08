import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import session from 'express-session';
import pgSimpleSession from 'connect-pg-simple';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.set('trust proxy', 1);

  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const pgSession = pgSimpleSession(session);
  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: config.get<string>('COOKIE_SECURE') === 'true',
        sameSite: 'lax',
      },
      store: new pgSession({
        conString: config.getOrThrow<string>('DATABASE_URL'),
        createTableIfMissing: true,
      }),
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
