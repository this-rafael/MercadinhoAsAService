import { CheckIfCategoryExistsProtocol } from '../../Core/Protocols/CheckIfCategoryExistsProtocol';
import { CreateCategoryProtocol } from '../../Core/Protocols/CreateCategoryProtocol';
import { ExistsModel } from '../../../Global/Models/ExistsModel';
import { ProductCategoryModel } from '../../Core/Protocols/ProductCategoryModel';
import { DatabaseORM } from '../../../Global/Intefaces/IPrisma';

export class CategoriesRepository
  implements CheckIfCategoryExistsProtocol, CreateCategoryProtocol
{
  constructor(private readonly orm: DatabaseORM) {}

  async check(categoryId: string): Promise<ExistsModel> {
    const connection = await this.orm.connection();
    const category = await connection.product_categories.find();
  }

  create(category: string, sellerId: number): Promise<ProductCategoryModel> {
    return Promise.resolve(undefined);
  }
}
