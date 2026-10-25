import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateManualSessionDto {
  @Field(() => Date)
  @IsDate()
  startTimer: Date;

  @Field(() => Date)
  @IsDate()
  endTimer: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  taskTypeId?: string | null;
}
