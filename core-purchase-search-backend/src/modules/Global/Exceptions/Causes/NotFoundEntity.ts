import { StatusCodes } from '../StatusCodes';
import { ExceptionCause } from '../ExceptionCause';
export const enum EntitiesNames {
  Seller = 'Seller',
  Product = 'Product',
  Category = 'Category',
  Client = 'Client',
}
export class NotFoundEntity extends ExceptionCause {
  constructor(
    private readonly entityName: EntitiesNames,
    private readonly criteria: { key: string; value: any },
  ) {
    super();
  }

  protected getMessage(statusCode: StatusCodes): string {
    return `${statusCode.baseMessage}Entity ${this.entityName} with ${this.criteria.key} ${this.criteria.value} not found`;
  }

  protected getResult(statusCode: StatusCodes): object {
    return {
      entityName: this.entityName,
      criteria: this.criteria,
    };
  }
}
