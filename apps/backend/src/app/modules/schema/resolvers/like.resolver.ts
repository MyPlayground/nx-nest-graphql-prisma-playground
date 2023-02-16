import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Like, LikeCreateInput, Tweet, User } from '@nx-nest-graphql-prisma-playground/prisma-nestjs-graphql';
import { PrismaService } from 'nestjs-prisma';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Like, { nullable: true })
  async like(@Args('id', { type: () => Int }) id: number): Promise<Like | null> {
    return await this.prisma.like.findUnique({ where: { like_id: id } });
  }

  @Query(() => [Like], { nullable: false })
  async likes(): Promise<Like[]> {
    return await this.prisma.like.findMany();
  }

  @Mutation(() => Like)
  async createLike(@Args('input') input: LikeCreateInput): Promise<Like> {
    return await this.prisma.like.create({
      data: input,
    });
  }

  @ResolveField(() => User)
  async user(@Parent() like: Like): Promise<User> {
    return await this.prisma.like.findUnique({ where: { like_id: like.like_id } }).user();
  }

  @ResolveField(() => Tweet)
  async tweet(@Parent() like: Like): Promise<Tweet> {
    return await this.prisma.like.findUnique({ where: { like_id: like.like_id } }).tweet();
  }
}
