import { Field, InputType } from '@nestjs/graphql';
import { BaseInputProductProps } from '../../Core/Models/ProductsModels';

@InputType()
export class CreateProductInput {
  constructor(builder: BaseInputProductProps) {
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

  get toModel(): BaseInputProductProps {
    return {
      sellerEid: this.sellerEid,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
    };
  }
}
