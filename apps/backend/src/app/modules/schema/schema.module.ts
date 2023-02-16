import { Module } from '@nestjs/common';
import { LikeResolver } from './resolvers/like.resolver';
import { TweetResolver } from './resolvers/tweet.resolver';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  providers: [UserResolver, TweetResolver, LikeResolver],
})
export class SchemaModule {}
