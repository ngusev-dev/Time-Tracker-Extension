import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TimerHistoryModel } from 'src/timer-history/models/TimerHistory.model';

@ObjectType()
export class TimerStatisticModel {
  @Field(() => Date)
  startPeriod: Date;

  @Field(() => Date)
  endPeriod: Date;

  @Field(() => [HistoryItemModel])
  history: HistoryItemModel[];

  @Field(() => Int)
  length: number;
}

@ObjectType()
class HistoryItemModel {
  @Field()
  day: string;

  @Field(() => [TimerHistoryModel])
  entries: TimerHistoryModel[];
}
