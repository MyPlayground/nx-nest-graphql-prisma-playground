import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

// NestJSのカスタムエラーを作成する
// Bulkインサートが行われた際の複数のエラーを受け取る
// エラーの内容は、エラーとなったレコードのインデックスとエラー内容を持つ
export class CustomException extends HttpException {
  constructor(errors: { index: number; error: string }[]) {
    super({ errors }, HttpStatus.BAD_REQUEST);
  }
}

// NestJSのカスタムエラーフィルターを作成
// CustomExceptionを受け取った際に、ApolloErrorを返す
// ApolloErrorは、GraphQLのエラーを表すクラス
// GraphQLのエラーを表すクラスを返すことで、GraphQLのエラーとして返すことができる
// GraphQLのエラーとして返すことで、GraphQLのエラーを受け取るクライアント側でエラーを処理することができる
// GraphQLのエラーを受け取るクライアント側でエラーを処理することができる
@Catch(CustomException)
export class CustomExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    console.log(exception);
    const { errors } = exception.getResponse() as { errors: { index: number; error: string }[] };
    const apolloErrors = errors.map(({ index, error }) => new ApolloError(error, 'BAD_REQUEST', { index }));
    console.log(apolloErrors);
    return new ApolloError('Bulk insert failed', 'BAD_REQUEST', { apolloErrors });
  }
}
