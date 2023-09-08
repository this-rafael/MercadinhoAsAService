import { Module } from '@nestjs/common';
import { GenerateModule } from 'strategy_nest';
import { ProductsResolver } from '../Resolvers/ProductsResolver';
import { ProjectsService } from '../../Adapter/Services/ProjectsService';

@Module(
  GenerateModule({
    providers: [ProductsResolver, ProjectsService],
  }),
)
export class ProductModule {}
