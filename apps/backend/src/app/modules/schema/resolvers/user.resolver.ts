import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Like, Tweet, User, UserCreateInput } from '@nx-nest-graphql-prisma-playground/prisma-nestjs-graphql';
import { PrismaService } from 'nestjs-prisma';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { user_id: id } });
  }

  @Query(() => [User], { nullable: false })
  async users(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data: input,
    });
  }

  @ResolveField(() => [Tweet])
  async tweets(@Parent() user: User): Promise<Tweet[]> {
    return await this.prisma.user.findUnique({ where: { user_id: user.user_id } }).tweets();
  }

  @ResolveField(() => [Like])
  async likes(@Parent() user: User): Promise<Like[]> {
    return await this.prisma.user.findUnique({ where: { user_id: user.user_id } }).likes();
  }
}
