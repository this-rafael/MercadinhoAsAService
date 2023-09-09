import { Injectable } from '@nestjs/common';
import { FullProductObject } from '../../Infra/DTOS/FullProductObject';
import { CreateProductInput } from '../../Infra/DTOS/CreateProductInput';
import { ICreateProducts } from '../../Core/Interfaces/ICreateProducts';

@Injectable()
export class ProjectsService {
  constructor(private readonly createProducts: ICreateProducts) {}

  async createProduct(product: CreateProductInput): Promise<FullProductObject> {
    const props = await this.createProducts.perform(product);
    return new FullProductObject(props);
  }
}
