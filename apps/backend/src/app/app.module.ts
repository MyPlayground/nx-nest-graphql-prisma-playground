import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import * as path from 'path';

import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: path.join(process.cwd(), 'apps/backend/src/schema.gql'),
      // autoSchemaFile: path.join(__dirname, 'schema.gql'), // 本番用
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
