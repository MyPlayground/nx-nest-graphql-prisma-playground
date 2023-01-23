import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './models';

@Resolver()
export class AppResolver {
  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return {
      id,
      email: 'test@example.com',
      name: 'Test User',
    };
  }
}
