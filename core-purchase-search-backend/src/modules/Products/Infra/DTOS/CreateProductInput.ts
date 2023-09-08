import { Field, InputType } from '@nestjs/graphql';
import { BaseInputProductModel } from '../../Core/Models/ProductsModels';

@InputType()
export class CreateProductInput {
  constructor(builder: BaseInputProductModel) {
    Object.assign(this, builder);
  }

  @Field()
  sellerEid: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => String)
  category: string;

  get toModel(): BaseInputProductModel {
    return {
      sellerEid: this.sellerEid,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
    };
  }
}
