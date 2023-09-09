import { CheckIfCategoryExistsProtocol } from '../../Core/Protocols/CheckIfCategoryExistsProtocol';
import { CreateCategoryProtocol } from '../../Core/Protocols/CreateCategoryProtocol';
import { ExistsModel } from '../../../Global/Models/ExistsModel';
import { ProductCategoryModel } from '../../Core/Models/ProductCategoryModel';
import { DatabaseORM } from '../../../Global/Intefaces/IPrisma';
import { validate } from 'uuid';
import { isNumber } from '@nestjs/common/utils/shared.utils';
import { Injectable } from '@nestjs/common';
import { InvalidTypes } from '../../../Global/Exceptions/Causes/InvalidTypesCause';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class CategoriesRepository
  implements CheckIfCategoryExistsProtocol, CreateCategoryProtocol
{
  constructor(private readonly orm: DatabaseORM) {}

  async check(categoryId: string): Promise<ExistsModel> {
    const isInvalidFormat = !validate(categoryId) || !isNumber(categoryId);
    if (isInvalidFormat) {
      throw Exception.status(BA);
    }

    const connection = await this.orm.connection();
    const category = await connection.product_categories.findFirstOrThrow({
      where: {
        id: Number(categoryId),
      },
    });

    return {
      exists: !!category,
      id: category.id,
      eid: category.eid,
    };
  }

  async create(category: string): Promise<ProductCategoryModel> {
    const connection = await this.orm.connection();
    const createdCategory = await connection.product_categories.create({
      data: {
        name: category,
        description: '',
      },
    });
    return ProductCategoryModel.fromPrisma(createdCategory);
  }
}
