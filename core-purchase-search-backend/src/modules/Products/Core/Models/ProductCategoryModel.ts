export interface ProductCategoryProps {
  id: string;
  eid: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductCategoryModel {
  constructor(private readonly props: ProductCategoryProps) {
    Object.freeze(this);
  }

  static fromPrisma(prismaResult: Record<string, any>): ProductCategoryModel {
    return new ProductCategoryModel({
      id: prismaResult.id,
      eid: prismaResult.eid,
      name: prismaResult.name,
      description: prismaResult.description,
      createdAt: prismaResult.created_at,
      updatedAt: prismaResult.updated_at,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get eid(): string {
    return this.props.eid;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
