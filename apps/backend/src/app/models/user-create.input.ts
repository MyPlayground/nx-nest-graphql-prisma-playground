import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
