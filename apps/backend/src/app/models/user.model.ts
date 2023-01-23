import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  name!: string | null;
}
