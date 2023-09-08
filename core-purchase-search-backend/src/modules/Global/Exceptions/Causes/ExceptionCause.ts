import { StatusCodes } from '../StatusCodes';

export abstract class ExceptionCause {
  clientMessage(statusCode: StatusCodes): {
    result: object;
    message: string;
  } {
    return {
      message: this.getMessage(statusCode),
      result: this.getResult(statusCode),
    };
  }

  protected abstract getMessage(statusCode: StatusCodes): string;

  protected abstract getResult(statusCode: StatusCodes): object;
}
