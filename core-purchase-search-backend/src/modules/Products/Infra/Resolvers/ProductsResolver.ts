import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from '../DTOS/CreateProductInput';
import { GenericOutput } from '../DTOS/GenericOutput';
import { FullProductObject } from '../DTOS/FullProductObject';
import { ProjectsService } from '../../Adapter/Services/ProjectsService';
import { Catch } from '../../../Global/Util/Catch';

@Resolver()
export class ProductsResolver {
  constructor(private readonly service: ProjectsService) {}

  @Query(() => GenericOutput)
  async products(): Promise<GenericOutput> {
    return new GenericOutput('true', true, new Date());
  }

  @Mutation(() => FullProductObject)
  async createProduct(
    @Args('product') product: CreateProductInput,
  ): Promise<FullProductObject> {
    console.log(product);

    try {
      return await this.service.createProduct(product);
    } catch (e) {
      console.error('Error creating product', e);
      return e;
    }
  }
}
