import { ExistsModel } from '../../../Global/Models/ExistsModel';

export abstract class CheckIfCategoryExistsProtocol {
  abstract check(categoryId: string): Promise<ExistsModel>;
}
