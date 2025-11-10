import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field(() => String)
  login: string;

  @Field(() => String)
  password: string;
}
