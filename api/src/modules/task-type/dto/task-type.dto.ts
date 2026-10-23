import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

@InputType()
export class CreateTaskTypeDto {
  @Field(() => String)
  @IsString()
  @Length(1, 50)
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(HEX_COLOR)
  color?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  parentId?: string | null;
}

@InputType()
export class UpdateTaskTypeDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;

  // Только для корневого типа
  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(HEX_COLOR)
  color?: string;
}
