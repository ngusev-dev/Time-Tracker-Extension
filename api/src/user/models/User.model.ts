import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'generated/prisma/client';

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => String, { nullable: true })
  middleName: string | null;

  @Field()
  login: string;

  @Field()
  createdAt: Date;
}
