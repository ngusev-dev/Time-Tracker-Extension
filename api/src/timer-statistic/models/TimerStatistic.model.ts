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
export class GeneralStatisticModel {
  @Field(() => Int)
  totalTimeInSeconds: number;

  @Field(() => String)
  percent: string;
}

@ObjectType()
export class HistoryItemModel {
  @Field(() => String)
  day: string;

  @Field(() => [TimerHistoryModel])
  entries: TimerHistoryModel[];

  @Field(() => GeneralStatisticModel)
  general: GeneralStatisticModel;
}
