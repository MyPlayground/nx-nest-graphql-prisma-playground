import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { User, UserCreateInput } from './models';

@Resolver(User)
export class AppResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }
}
