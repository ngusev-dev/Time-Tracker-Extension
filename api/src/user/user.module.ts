import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Global()
@Module({
  exports: [UserService],
  providers: [UserResolver, UserService],
})
export class UserModule {}
