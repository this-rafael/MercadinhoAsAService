import { ICreateProducts } from '../Interfaces/ICreateProducts';
import {
  BaseInputProductModel,
  FullProductModel,
} from '../Models/ProductsModels';
import { CheckIfCategoryExistsProtocol } from '../Protocols/CheckIfCategoryExistsProtocol';
import { CheckIfSellerExistsProtocol } from '../Protocols/CheckIfSellerExistsProtocol';
import { CreateCategoryProtocol } from '../Protocols/CreateCategoryProtocol';

import { ExceptionHttp } from '../../../Global/Exceptions/ExceptionHttp';
import { StatusCodes } from '../../../Global/Exceptions/StatusCodes';
import {
  EntitiesNames,
  NotFoundEntity,
} from '../../../Global/Exceptions/Causes/NotFoundEntity';
import { CreateProductProtocol } from '../Protocols/CreateProductProtocol';
import { Catch } from '../../../Global/Util/Catch';

export class CreateProductsUsecase implements ICreateProducts {
  constructor(
    private readonly checkIfCategoryExistsProtocol: CheckIfCategoryExistsProtocol,
    private readonly checkIfSellerExistsProtocol: CheckIfSellerExistsProtocol,
    private readonly createCategoryProtocol: CreateCategoryProtocol,
    private readonly createProductProtocol: CreateProductProtocol,
  ) {}

  async perform(
    createProduct: BaseInputProductModel,
  ): Promise<FullProductModel> {
    try {
      const sellerExists = await this.checkIfSellerExistsProtocol.perform(
        createProduct.sellerEid,
      );

      if (!sellerExists.exists) {
        throw ExceptionHttp.status(StatusCodes.BAD_REQUEST).becauseOf(
          this.getNotFoundEntity(createProduct),
        );
      }

      const categoryExists = await this.checkIfCategoryExistsProtocol.perform(
        createProduct.category,
      );

      let categoryId = Number(categoryExists.id);
      if (!categoryExists.exists) {
        const category = await this.createCategoryProtocol.perform(
          createProduct.category,
          Number(sellerExists.id),
        );
        categoryId = Number(category.id);
      }

      const product = await this.createProductProtocol.perform(
        createProduct,
        Number(sellerExists.id),
        categoryId,
      );
      console.log('Product created !: ' + product);
      return product;
    } catch (e) {}
  }

  private getNotFoundEntity(createProduct: BaseInputProductModel) {
    return new NotFoundEntity(EntitiesNames.Seller, {
      key: 'eid',
      value: createProduct.sellerEid,
    });
  }
}
