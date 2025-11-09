import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  login: string;

  @Field()
  password: string;
}
