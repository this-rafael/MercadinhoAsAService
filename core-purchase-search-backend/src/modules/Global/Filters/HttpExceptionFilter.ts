import { ArgumentsHost, Catch } from '@nestjs/common';
import { ExceptionHttp } from '../Exceptions/ExceptionHttp';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(ExceptionHttp)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: ExceptionHttp, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    return exception.mapToGraphqlException(gqlHost);
  }
}
