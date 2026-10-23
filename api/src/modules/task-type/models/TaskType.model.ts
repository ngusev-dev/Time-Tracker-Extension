import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskType } from 'generated/prisma/client';

@ObjectType()
export class TaskTypeModel implements TaskType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  // Резолвится в TaskTypeResolver: у подтипа берётся цвет родителя
  @Field(() => String, { nullable: true })
  color: string | null;

  @Field(() => String, { nullable: true })
  parentId: string | null;

  @Field(() => TaskTypeModel, { nullable: true })
  parent?: TaskTypeModel | null;

  @Field(() => [TaskTypeModel])
  children?: TaskTypeModel[];
}
