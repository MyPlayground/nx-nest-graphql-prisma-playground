import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user/user.resolver';

@Module({
  providers: [UserResolver],
})
export class SchemaModule {}
