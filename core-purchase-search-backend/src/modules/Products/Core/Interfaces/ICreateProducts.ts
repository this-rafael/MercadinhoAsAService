import {
  BaseInputProductProps,
  FullProductModel,
} from '../Models/ProductsModels';

export abstract class ICreateProducts {
  abstract perform(
    createProduct: BaseInputProductProps,
  ): Promise<FullProductModel>;
}
