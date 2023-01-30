import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { PrismaService } from 'nestjs-prisma';
import { User, UserCreateInput } from './models';
import { OffsetPaginationInput } from './models/offset-pagination.input';

@Resolver(User)
export class AppResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  @Query(() => [User])
  async users(@Args('offset') offset: OffsetPaginationInput): Promise<User[]> {
    return await this.prisma.user.findMany({
      take: offset.take,
      skip: offset.skip,
    });
  }

  @Mutation(() => User)
  @ValidateNested()
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }
}
