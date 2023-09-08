import { ProductCategoryModel } from './ProductCategoryModel';

export abstract class CreateCategoryProtocol {
  abstract create(
    category: string,
    sellerId: number,
  ): Promise<ProductCategoryModel>;
}
