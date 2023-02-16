import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  User,
  UserCreateInput,
} from '@nx-nest-graphql-prisma-playground/prisma-nestjs-graphql';
import { PrismaService } from 'nestjs-prisma';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { user_id: id } });
  }

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // ユーザーを作成する
  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: input,
    });
  }
}
