import { StatusCodes } from './StatusCodes';
import { ExceptionCause } from './Causes/ExceptionCause';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { GqlArgumentsHost } from '@nestjs/graphql';

class ExceptionHttpBuilderFromHttpStatusCode {
  constructor(private statusCode: StatusCodes) {}

  becauseOf(exceptionCause: ExceptionCause) {
    return new ExceptionHttp(this.statusCode, exceptionCause);
  }
}

class ExceptionHttpBuilderFromCause {
  constructor(private exceptionCause: ExceptionCause) {}

  withStatus(statusCode: StatusCodes) {
    return new ExceptionHttp(statusCode, this.exceptionCause);
  }
}

export class ExceptionHttp extends Error {
  constructor(
    private readonly statusCode: StatusCodes,
    private readonly exceptionCause: ExceptionCause,
  ) {
    super();
  }

  static status(
    statusCode: StatusCodes,
  ): ExceptionHttpBuilderFromHttpStatusCode {
    return new ExceptionHttpBuilderFromHttpStatusCode(statusCode);
  }

  static cause(exceptionCause: ExceptionCause): ExceptionHttpBuilderFromCause {
    return new ExceptionHttpBuilderFromCause(exceptionCause);
  }

  mapToGraphqlException(gqlHost: GqlArgumentsHost): HttpException {
    const { result, message } = this.exceptionCause.clientMessage(
      this.statusCode,
    );

    return new HttpException(result, this.statusCode.statusCode, {
      description: message,
      cause: this,
    });
  }
}
