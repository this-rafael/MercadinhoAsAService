import { ICreateProducts } from '../Interfaces/ICreateProducts';
import {
  BaseInputProductProps,
  FullProductModel,
  FullProductProps,
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

export class CreateProductsUsecase implements ICreateProducts {
  constructor(
    private readonly checkIfCategoryExistsProtocol: CheckIfCategoryExistsProtocol,
    private readonly checkIfSellerExistsProtocol: CheckIfSellerExistsProtocol,
    private readonly createCategoryProtocol: CreateCategoryProtocol,
    private readonly createProductProtocol: CreateProductProtocol,
  ) {}

  async perform(
    createProduct: BaseInputProductProps,
  ): Promise<FullProductModel> {
    try {
      const sellerExists = await this.checkIfSellerExistsProtocol.check(
        createProduct.sellerEid,
      );

      if (!sellerExists.exists) {
        throw ExceptionHttp.status(StatusCodes.BAD_REQUEST).becauseOf(
          this.getNotFoundEntity(createProduct),
        );
      }

      const categoryExists = await this.checkIfCategoryExistsProtocol.check(
        createProduct.category,
      );

      let categoryId = Number(categoryExists.id);
      if (!categoryExists.exists) {
        const category = await this.createCategoryProtocol.create(
          createProduct.category,
        );
        categoryId = Number(category.id);
      }

      const product = await this.createProductProtocol.create(
        createProduct,
        Number(sellerExists.id),
        categoryId,
      );
      console.log('Product created !: ' + product);
      return product;
    } catch (e) {}
  }

  private getNotFoundEntity(createProduct: BaseInputProductProps) {
    return new NotFoundEntity(EntitiesNames.Seller, {
      key: 'eid',
      value: createProduct.sellerEid,
    });
  }
}
