import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OffsetPaginationInput {
  @Field(() => Int, { nullable: false })
  take!: number;

  @Field(() => Int, { nullable: false })
  skip!: number;
}
