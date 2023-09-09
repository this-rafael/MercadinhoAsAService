import { CreateProductProtocol } from '../../Core/Protocols/CreateProductProtocol';
import { Injectable } from '@nestjs/common';
import {
  BaseInputProductProps,
  FullProductModel,
} from '../../Core/Models/ProductsModels';
import { DatabaseORM } from '../../../Global/Intefaces/IPrisma';

@Injectable()
export class ProductsRepository implements CreateProductProtocol {
  constructor(private readonly orm: DatabaseORM) {}

  async create(
    createProduct: BaseInputProductProps,
    sellerId: number,
    categoryId: number,
  ): Promise<FullProductModel> {
    const connection = await this.orm.connection();

    const result = await connection.products.create({
      data: {
        name: createProduct.name,
        description: createProduct.description,
        price: createProduct.price,
        seller_id: sellerId,
        category: categoryId,
      },
      include: {
        product_categories: {
          select: {
            eid: true,
          },
        },
        sellers: {
          select: {
            eid: true,
          },
        },
      },
    });

    return FullProductModel.fromPrisma(result);
  }
}
