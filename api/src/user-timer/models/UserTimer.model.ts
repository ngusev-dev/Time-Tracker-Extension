import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TimerStatus, UserTimer } from 'generated/prisma/client';
import { UserModel } from 'src/user/models/User.model';

@ObjectType()
export class UserTimerModel implements UserTimer {
  @Field(() => ID)
  id: number;

  @Field(() => Date, { nullable: true })
  startTimer: Date | null;

  @Field(() => Date, { nullable: true })
  endTimer: Date | null;

  @Field(() => Number)
  totalTimeInSeconds: number;

  @Field()
  status: TimerStatus;

  @Field()
  userId: number;

  @Field(() => UserModel)
  user: UserModel;
}
