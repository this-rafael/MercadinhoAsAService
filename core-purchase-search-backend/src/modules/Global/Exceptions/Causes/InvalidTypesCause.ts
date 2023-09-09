import { ExceptionCause } from '../ExceptionCause';
import { StatusCodes } from '../StatusCodes';

export class InvalidTypes extends ExceptionCause {
  constructor(
    private variableName: string,
    private expectedTypes: (string | symbol)[],
    private gotType: string,
  ) {
    super();
  }

  protected getMessage(statusCode: StatusCodes): string {
    return `${statusCode.baseMessage} Invalid types of ${
      this.variableName
    }, expected ${this.expectedTypes.join(', ')} but got ${this.gotType}`;
  }

  protected getResult(statusCode: StatusCodes): object {
    return {
      variableName: this.variableName,
      expectedTypes: this.expectedTypes,
      gotType: this.gotType,
    };
  }
}
