import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
