import {
  BaseInputProductModel,
  FullProductModel,
} from '../Models/ProductsModels';

export abstract class CreateProductProtocol {
  abstract perform(
    createProduct: BaseInputProductModel,
    sellerId: number,
    categoryId: number,
  ): Promise<FullProductModel>;
}
