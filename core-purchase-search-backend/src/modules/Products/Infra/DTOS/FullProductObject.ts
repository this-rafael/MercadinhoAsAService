import { Field, Float, ObjectType } from '@nestjs/graphql';
import { FullProductModel } from '../../Core/Models/ProductsModels';

@ObjectType()
export class FullProductObject {
  constructor(builder: FullProductModel) {
    Object.assign(this, builder);
  }

  @Field()
  categoryId: string;

  @Field()
  createdAt: Date;

  @Field()
  description: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field(() => Number, {
    nullable: true,
  })
  category: object;

  @Field(() => Number, {
    nullable: true,
  })
  seller: object;

  @Field()
  sellerEid: string;

  @Field()
  updatedAt: Date;
}
