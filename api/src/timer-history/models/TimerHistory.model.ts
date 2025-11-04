import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TimerHistory } from 'generated/prisma/client';
import { UserModel } from 'src/user/models/User.model';

@ObjectType()
export class TimerHistoryModel implements TimerHistory {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  timerId: string;

  @Field(() => Date)
  startTimer: Date;

  @Field(() => Date)
  endTimer: Date;

  @Field(() => Number)
  totalTimeInSeconds: number;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  userId: number;

  @Field(() => UserModel)
  user: UserModel;
}

@ObjectType()
export class TimerHistoryGroupModel {
  @Field(() => String)
  timerId: string;

  @Field(() => [TimerHistoryModel])
  records: TimerHistoryModel[];
}
