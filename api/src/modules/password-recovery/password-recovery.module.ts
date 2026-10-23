import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryResolver } from './password-recovery.resolver';
import { UserService } from '@modules/user/user.service';
import { MailService } from '@shared/lib/mail/mail.service';
import { UuidService } from '@shared/lib/uuid/uuid.service';

@Module({
  providers: [
    PasswordRecoveryResolver,
    PasswordRecoveryService,
    UserService,
    MailService,
    UuidService,
  ],
})
export class PasswordRecoveryModule {}
