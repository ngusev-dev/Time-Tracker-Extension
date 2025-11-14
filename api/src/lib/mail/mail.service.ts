import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ResetPasswordTemplate } from './templates/reset-password.template';
import { pretty, render } from '@react-email/components';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendPasswordReset(email: string, firstName: string) {
    const html = await pretty(
      await render(ResetPasswordTemplate({ resetCode: 123456, firstName })),
    );

    return await this.sendMail(email, 'Сброс пароля', html);
  }

  private async sendMail(
    email: string,
    subject: string,
    html: string,
  ): Promise<SentMessageInfo> {
    return await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
