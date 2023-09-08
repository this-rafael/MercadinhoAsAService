import {
  BaseInputProductModel,
  FullProductModel,
} from '../Models/ProductsModels';

export abstract class ICreateProducts {
  abstract perform(
    createProduct: BaseInputProductModel,
  ): Promise<FullProductModel>;
}
