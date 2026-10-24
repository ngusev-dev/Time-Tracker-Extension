import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User, UserRole } from 'generated/prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles',
});

@ObjectType()
export class UserModel implements Omit<User, 'password'> {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  email: string;

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

  @Field(() => UserRole)
  role: UserRole;
}
