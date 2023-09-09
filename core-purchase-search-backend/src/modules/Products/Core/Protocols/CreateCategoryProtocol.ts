import { ProductCategoryModel } from '../Models/ProductCategoryModel';

export abstract class CreateCategoryProtocol {
  abstract create(category: string): Promise<ProductCategoryModel>;
}
