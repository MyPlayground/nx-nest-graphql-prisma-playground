import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Like, Tweet, TweetCreateInput, User } from '@nx-nest-graphql-prisma-playground/prisma-nestjs-graphql';
import { PrismaService } from 'nestjs-prisma';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Tweet, { nullable: true })
  async tweet(@Args('id', { type: () => Int }) id: number): Promise<Tweet | null> {
    return await this.prisma.tweet.findUnique({ where: { tweet_id: id } });
  }

  @Query(() => [Tweet], { nullable: false })
  async tweets(): Promise<Tweet[]> {
    return await this.prisma.tweet.findMany();
  }

  @Mutation(() => Tweet)
  async createTweet(@Args('input') input: TweetCreateInput): Promise<Tweet> {
    return await this.prisma.tweet.create({
      data: input,
    });
  }

  @ResolveField(() => User)
  async author(@Parent() tweet: Tweet): Promise<User> {
    return await this.prisma.tweet.findUnique({ where: { tweet_id: tweet.tweet_id } }).author();
  }

  @ResolveField(() => [Like])
  async likes(@Parent() tweet: Tweet): Promise<Like[]> {
    return await this.prisma.tweet.findUnique({ where: { tweet_id: tweet.tweet_id } }).likes();
  }
}
