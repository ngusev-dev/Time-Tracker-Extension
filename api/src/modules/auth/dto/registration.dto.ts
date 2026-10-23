import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

@InputType()
export class RegistrationDto {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MinLength(4)
  login: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  middleName?: string;
}
