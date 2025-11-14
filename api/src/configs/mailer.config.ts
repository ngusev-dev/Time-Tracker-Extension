import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const getMailerConfig = (
  configService: ConfigService,
): MailerOptions => ({
  transport: {
    host: configService.getOrThrow<string>('MAIL_HOST'),
    port: configService.getOrThrow<string>('MAIL_PORT'),
    auth: {
      user: configService.getOrThrow<string>('MAIL_USER'),
      pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: '"Timer-Tracker Dev.Team" <no-reply@notifications.ngusev.dev>',
  },
});
