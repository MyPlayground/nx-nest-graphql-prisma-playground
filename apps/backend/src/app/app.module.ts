import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'nestjs-prisma';

import * as path from 'path';

import { SchemaModule } from './modules/schema/schema.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: path.join(process.cwd(), 'apps/backend/src/schema.gql'),
      // autoSchemaFile: path.join(__dirname, 'schema.gql'), // 本番用
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    SchemaModule,
  ],
})
export class AppModule {}
