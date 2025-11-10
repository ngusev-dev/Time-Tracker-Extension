import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'generated/prisma/client';

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  middleName: string | null;

  @Field(() => String)
  login: string;

  @Field(() => Date)
  createdAt: Date;
}
