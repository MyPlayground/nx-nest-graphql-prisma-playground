/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'apollo-server-express';
import { PrismaService } from 'nestjs-prisma';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  // バリデーションエラー時の詳細出力
  // https://zenn.dev/yuyuyu_6/articles/98dc86448ea633
  app.useGlobalPipes(
    new ValidationPipe({
      // バリデーションエラーの型を整形する
      exceptionFactory: (errors): ValidationError[] => {
        const messages = errors.flatMap((e) => {
          const res: { key: string; messages: string[] }[] = [];
          const cons = e.constraints ?? {};
          const mes: string[] = [];
          Object.keys(cons).forEach((key) => {
            mes.push(cons[key]);
          });
          res.push({ key: e.property, messages: mes });

          return res;
        });
        throw new BadRequestException(messages);
      },
    })
  );

  // Enable ShutdownHooks
  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
