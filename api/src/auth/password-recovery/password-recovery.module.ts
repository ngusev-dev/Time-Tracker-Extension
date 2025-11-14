import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryResolver } from './password-recovery.resolver';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/lib/mail/mail.service';

@Module({
  providers: [
    PasswordRecoveryResolver,
    PasswordRecoveryService,
    UserService,
    MailService,
  ],
})
export class PasswordRecoveryModule {}
