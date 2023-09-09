export interface BaseInputProductProps {
  sellerEid: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export type EnrichedProductProps = BaseInputProductProps & {
  seller?: object;
  categoryObject?: object;
};

export type FullProductProps = EnrichedProductProps & {
  createdAt: Date;
  updatedAt: Date;
};

export class BaseInputProductModel {
  constructor(private readonly props: BaseInputProductProps) {}

  get sellerEid(): string {
    return this.props.sellerEid;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get price(): number {
    return this.props.price;
  }

  get category(): string {
    return this.props.category;
  }
}

export class EnrichedProductModel {
  constructor(private readonly props: EnrichedProductProps) {}

  get seller(): object {
    return this.props.seller;
  }

  get category(): object {
    return this.props.categoryObject;
  }
}

export class FullProductModel {
  constructor(private readonly props: FullProductProps) {}

  static fromPrisma(builder: Record<string, any>): FullProductModel {
    return new FullProductModel({
      sellerEid: builder.seller.eid,
      name: builder.name,
      description: builder.description,
      price: builder.price,
      createdAt: builder.created_at,
      updatedAt: builder.updated_at,
      category: builder.category,
      seller: builder.seller,
      categoryObject: builder.product_categories,
    });
  }

  get fullProduct(): FullProductProps {
    return this.props;
  }
}
