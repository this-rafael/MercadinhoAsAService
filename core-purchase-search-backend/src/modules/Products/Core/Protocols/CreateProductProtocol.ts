import {
  BaseInputProductProps,
  FullProductModel,
} from '../Models/ProductsModels';

export abstract class CreateProductProtocol {
  abstract create(
    createProduct: BaseInputProductProps,
    sellerId: number,
    categoryId: number,
  ): Promise<FullProductModel>;
}
